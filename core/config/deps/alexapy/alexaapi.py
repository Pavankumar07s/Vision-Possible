"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

API access.

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

import asyncio
import contextlib
import json
import logging
import math
import random
import time
import urllib.parse
from json.decoder import JSONDecodeError
from types import NoneType
from typing import Any, ClassVar

import backoff
from aiohttp import ClientConnectionError, ClientResponse
from yarl import URL

from .alexalogin import AlexaLogin
from .const import (
    ALEXA_API_BASE,
    API_USER_AGENT,
    CALL_VERSION,
    DEFAULT_ACCEPT_LANGUAGE,
    DEFAULT_LOCALE,
    GQL_SMARTHOME_QUERY,
)
from .errors import (
    AlexapyConnectionError,
    AlexapyLoginCloseRequested,
    AlexapyLoginError,
    AlexapyTooManyRequestsError,
)
from .helpers import _catch_all_exceptions, get_json_value, hide_email, hide_serial

_LOGGER = logging.getLogger(__name__)


def _min_expo_wait(min_wait: float):
    """Exponential backoff with a specified minimum wait time."""

    def f(*args, **kwargs):
        gen = backoff.expo(*args, **kwargs)
        while True:
            v = next(gen, None)
            # _LOGGER.debug("_min_expo_wait: next(gen) was %s", v)
            v = min_wait if v is None else max(min_wait, v)
            # _LOGGER.debug("_min_expo_wait: returning %s",v)
            yield v

    return f


class AlexaAPI:
    """Class for accessing a specific Alexa device using rest API.

    Args:
    device (AlexaClient): Instance of an AlexaClient to access
    login (AlexaLogin): Successfully logged in AlexaLogin

    """

    devices: ClassVar[dict[str, Any]] = {}
    wake_words: ClassVar[dict[str, Any]] = {}
    _sequence_queue: ClassVar[dict[Any, list[dict[Any, Any]]]] = {}
    _sequence_lock: ClassVar[dict[Any, asyncio.Lock]] = {}

    def __init__(self, device, login: AlexaLogin):
        """Initialize Alexa device."""
        self._device = device
        self._login = login
        self._session = login.session
        self._url: str = "https://alexa." + login.url
        self._login._headers["Referer"] = f"{self._url}/spa/index.html"
        AlexaAPI._sequence_queue[self._login.email] = []
        AlexaAPI._sequence_lock[self._login.email] = asyncio.Lock()
        try:
            csrf = self._login._get_cookies_from_session()["csrf"]
            self._login._headers["csrf"] = csrf.value
        except KeyError as ex:
            _LOGGER.warning(
                (
                    "AlexaLogin session is missing required token: %s "
                    "This may result in authorization errors, please report if unable to login"  # noqa: E501
                ),
                ex,
            )

    def update_login(self, login: AlexaLogin) -> bool:
        """Update Login if it has changed.

        Args
            login (AlexaLogin): AlexaLogin to check

        Returns
            bool: True if change detected

        """
        if login != self._login or login.session != self._session:
            _LOGGER.debug(
                "%s: New Login %s detected; replacing %s",
                hide_email(login.email),
                login,
                self._login,
            )
            self._login = login
            self._session = login.session
            self._url: str = "https://alexa." + login.url
            self._login._headers["Referer"] = f"{self._url}/spa/index.html"
            try:
                csrf = self._login._get_cookies_from_session()["csrf"]
                self._login._headers["csrf"] = csrf.value
            except KeyError as ex:
                if login.status and login.status.get("login_successful"):
                    _LOGGER.warning(
                        (
                            "AlexaLogin session is missing required token: %s "
                            "This may result in authorization errors, please report"
                        ),
                        ex,
                    )
            return True
        return False

    @staticmethod
    async def _get_alexa_api_base(login: AlexaLogin) -> str:
        """Return the base URL for the Alexa REST API (e.g. https://na-api-alexa.amazon.com)."""
        # Cached?
        cached = getattr(login, "_alexa_api_url", None)
        if cached:
            _LOGGER.debug(
                "%s: Returning cached url: %s",
                hide_email(login.email),
                cached
            )
            return cached

        session = login.session
        if session.closed:
            raise AlexapyLoginError("Session is closed")

        # Try /api/endpoints on the web host, e.g. https://alexa.amazon.ca/api/endpoints
        # login.url is usually 'amazon.ca' or 'amazon.com'
        endpoints_url = URL(f"https://alexa.{login.url}/api/endpoints")

        headers = getattr(login, "_headers", {}) or {}
        # Make sure we have some UA + Accept to look like a real client
        local_headers = headers.copy()
        local_headers.setdefault("User-Agent", API_USER_AGENT)
        local_headers.setdefault("Accept", "application/json")

        try:
            resp = await session.get(
                endpoints_url,
                headers=local_headers,
                ssl=login._ssl
            )
            text = await resp.text()
            _LOGGER.debug(
                "%s: /api/endpoints GET %s returned %s:%s:%s",
                hide_email(login.email),
                endpoints_url,
                resp.status,
                resp.reason,
                resp.content_type,
            )
            _LOGGER.debug("%s: Response text: %s", hide_email(login.email), text)
            if resp.status == 200:
                try:
                    data = json.loads(text)
                    api_url = (
                         data.get("websiteApiUrl", "")
                        .rstrip("/")
                    )
                    if api_url:
                        login._alexa_api_url = api_url
                        _LOGGER.debug(
                            "%s: Using websiteApiUrl from /api/endpoints: %s",
                            hide_email(login.email),
                            api_url,
                        )
                        return api_url
                    else:
                        _LOGGER.debug(
                            "%s: Unable to extract websiteApiUrl from /api/endpoints",
                            hide_email(login.email)
                        )
                except ValueError:
                    _LOGGER.debug(
                        "%s: /api/endpoints invalid JSON: %s",
                        hide_email(login.email),
                        hide_serial(text),
                    )
        except ClientConnectionError as exc:
            _LOGGER.debug(
                "%s: /api/endpoints connection error: %s",
                hide_email(login.email),
                exc,
            )

        # Fallback: use region-based default, then web host as last resort
        domain = getattr(login, "url", "")  # e.g. 'amazon.ca'
        suffix = ""
        for sfx in ALEXA_API_BASE:
            if domain.endswith(sfx[1:]):  # strip leading dot
                suffix = sfx
                break

        api_base = ALEXA_API_BASE.get(suffix)
        if not api_base:
            api_base = f"https://alexa.{domain}"

        login._alexa_api_url = api_base.rstrip("/")
        _LOGGER.debug(
            "%s: Falling back to default alexa API base: %s",
            hide_email(login.email),
            login._alexa_api_url,
        )
        return login._alexa_api_url

    @classmethod
    async def _process_response(
        cls, response: ClientResponse, login: AlexaLogin
    ) -> ClientResponse | None:
        """Process a response from _request or static_request.

        Args:
            ClientResponse (response): Response from _request

        Returns:
            None | ClientResponse: Response from server
        """
        if login.stats:
            login.stats["api_calls"] += 1
            _LOGGER.debug("api_calls: %s", login.stats["api_calls"])
        if response.status == 401:
            if login.status:
                login.status["login_successful"] = False
            raise AlexapyLoginError(response.reason)
        if response.status == 429:
            raise AlexapyTooManyRequestsError(response.reason)
        if response.status >= 400:
            _LOGGER.debug("Returning None due to status: %s", response.status)
            return None
        return response

    @backoff.on_exception(
        _min_expo_wait(random.uniform(0.5, 1.5)),
        (AlexapyTooManyRequestsError, AlexapyConnectionError, ClientConnectionError),
        max_time=90,
        max_tries=10,
        jitter=None,
        # factor = 2,
        logger=__name__,
    )
    async def _request(
        self,
        method: str,
        uri: str,
        data: dict[str, str] | None = None,
        query: dict[str, str | int] | None = None,
    ) -> ClientResponse | None:
        async with self._login._oauth_lock:
            if self._login.expires_in and (self._login.expires_in - time.time() < 0):
                _LOGGER.debug(
                    "%s: Detected access token expiration; refreshing",
                    hide_email(self._login.email),
                )
                if (
                    # await self._login.get_tokens()
                    # and
                    await self._login.refresh_access_token()
                    and await self._login.exchange_token_for_cookies()
                    and await self._login.get_csrf()
                ):
                    await self._login.finalize_login()
                else:
                    _LOGGER.debug(
                        "%s: Unable to refresh oauth",
                        hide_email(self._login.email),
                    )
                    self._login.access_token = None
                    self._login.refresh_token = None
                    self._login.expires_in = None
        if method == "get":
            if query and not query.get("_"):
                query["_"] = math.floor(time.time() * 1000)
            elif query is None:
                query = {"_": math.floor(time.time() * 1000)}
        url: URL = URL(self._url + uri).update_query(query)
        _LOGGER.debug(
            "%s: Trying %s: %s : with uri: %s data %s query %s",
            hide_email(self._login.email),
            method,
            url,
            uri,
            data,
            query,
        )
        if self._login.close_requested:
            _LOGGER.debug(
                "%s: Login object has been asked to close; ignoring %s request to %s with %s %s",  # noqa: E501
                hide_email(self._login.email),
                method,
                uri,
                data,
                query,
            )
            raise AlexapyLoginCloseRequested()
        if self._login.status and not self._login.status.get("login_successful"):
            _LOGGER.debug(
                "%s:Login error detected; ignoring %s request to %s with %s %s",
                hide_email(self._login.email),
                method,
                uri,
                data,
                query,
            )
            raise AlexapyLoginError("Login error detected; not contacting API")
        if self._session and self._session.closed:
            raise AlexapyLoginError("Session is closed")
        response = await getattr(self._session, method)(
            url,
            json=data,
            # cookies=self._login._cookies,
            headers=self._login._headers,
            ssl=self._login._ssl,
        )
        _LOGGER.debug(
            "%s: %s: %s returned %s:%s:%s",
            hide_email(self._login.email),
            response.request_info.method,
            response.request_info.url,
            response.status,
            response.reason,
            response.content_type,
        )
        return await self._process_response(response, self._login)

    async def _post_request(
        self,
        uri: str,
        data: dict[str, Any] | None = None,
        query: dict[str, Any] | None = None,
    ) -> ClientResponse | None:
        return await self._request("post", uri, data, query)

    async def _put_request(
        self,
        uri: str,
        data: dict[str, Any] | None = None,
        query: dict[str, Any] | None = None,
    ) -> ClientResponse | None:
        return await self._request("put", uri, data, query)

    async def _get_request(
        self,
        uri: str,
        data: dict[str, Any] | None = None,
        query: dict[str, Any] | None = None,
    ) -> ClientResponse | None:
        return await self._request("get", uri, data, query)

    async def _del_request(
        self,
        uri: str,
        data: dict[str, Any] | None = None,
        query: dict[str, Any] | None = None,
    ) -> ClientResponse | None:
        return await self._request("delete", uri, data, query)

    @staticmethod
    @backoff.on_exception(
        _min_expo_wait(random.uniform(0.8, 1.8)),
        (AlexapyTooManyRequestsError, AlexapyConnectionError, ClientConnectionError),
        max_time=120,
        max_tries=10,
        jitter=None,
        # factor = 2,
        logger=__name__,
    )
    async def _static_request(
        method: str,
        login: AlexaLogin,
        uri: str,
        data: dict[str, str | dict] | None = None,
        additional_headers: dict[str, str] | None = None,
        query: dict[str, str | int] | None = None,
        sub_domain: str = "alexa",
    ) -> ClientResponse | None:
        async with login._oauth_lock:
            if login.expires_in and (login.expires_in - time.time() < 0):
                _LOGGER.debug(
                    "%s: Detected access token expiration; refreshing",
                    hide_email(login.email),
                )
                if (
                    # await login.get_tokens()
                    # and
                    await login.refresh_access_token()
                    and await login.exchange_token_for_cookies()
                    and await login.get_csrf()
                ):
                    await login.finalize_login()
                else:
                    _LOGGER.debug(
                        "%s: Unable to refresh oauth",
                        hide_email(login.email),
                    )
                    login.access_token = None
                    login.refresh_token = None
                    login.expires_in = None
        session = login.session
        url: URL = URL("https://" + sub_domain + "." + login.url + uri).update_query(
            query
        )
        # _LOGGER.debug("%s: %s: Trying static %s: %s : with uri: %s data %s query %s",
        #                hide_email(login.email)
        #                method,
        #                url,
        #                uri,
        #                data,
        #                query,
        #            )
        if login.close_requested:
            _LOGGER.debug(
                "%s: Login object has been asked to close; ignoring %s request to %s with %s %s",  # noqa: E501
                hide_email(login.email),
                method,
                uri,
                data,
                query,
            )
            raise AlexapyLoginCloseRequested()
        if login.status and not login.status.get("login_successful"):
            _LOGGER.debug(
                "%s: Login error detected; ignoring %s request to %s with %s %s",
                hide_email(login.email),
                method,
                uri,
                data,
                query,
            )
            raise AlexapyLoginError("Login error detected; not contacting API")
        if session and session.closed:
            raise AlexapyLoginError("Session is closed")
        headers = login._headers.copy()
        if additional_headers:
            headers.update(additional_headers)
        response = await getattr(session, method)(
            url,
            json=data,
            headers=headers,
            ssl=login._ssl,
        )
        _LOGGER.debug(
            "%s: static %s %s returned %s:%s:%s",
            hide_email(login.email),
            response.request_info.method,
            response.request_info.url,
            response.status,
            response.reason,
            response.content_type,
        )

        # (401 retry handling stays as-is here)
        if response.status == 401 and await login.test_loggedin():
            response = await getattr(session, method)(
                url,
                json=data,
                # cookies=login._cookies,
                headers=login._headers,
                ssl=login._ssl,
            )
            _LOGGER.debug(
                "Error 401, retried once request: %s: static %s: %s returned %s:%s:%s",
                hide_email(login.email),
                response.request_info.method,
                response.request_info.url,
                response.status,
                response.reason,
                response.content_type,
            )

        # ★★★ Error body logger + basic throttling retry ★★★
        if response.status >= 400:
            try:
                body = await response.text()
            except Exception:
                body = "<unable to read body>"

            _LOGGER.debug(
                "HTTP static %s %s returned %s:%s; content_type=%s, body: %s",
                hide_email(login.email),
                response.request_info.url,
                response.status,
                response.reason,
                response.content_type,
                hide_serial(body),
            )

            # Simple, alexa-remote-style throttle handling
            if (
                response.status in (400, 429)
                and isinstance(body, str)
                and any(
                    marker in body
                    for marker in (
                        "Rate exceeded",
                        "ThrottlingException",
                        "Too many requests"
                    )
                )
                and not getattr(login, "_rate_retry_inflight", False)
            ):
                # Choose a delay similar to alexa-remote.js
                delay = random.uniform(10.0, 13.0)
                if "Too many requests" in body:
                    delay += 20.0 + random.uniform(0.0, 30.0)

                _LOGGER.debug(
                    "%s: Throttled (%s); retrying static %s %s once in %.1fs",
                    hide_email(login.email),
                    body,
                    method,
                    url,
                    delay,
                )

                # Prevent concurrent mass retries on the same login
                login._rate_retry_inflight = True
                try:
                    await asyncio.sleep(delay)
                    return await AlexaAPI._static_request(
                        method,
                        login,
                        uri,
                        data=data,
                        additional_headers=additional_headers,
                        query=query,
                        sub_domain=sub_domain,
                    )
                finally:
                    login._rate_retry_inflight = False

        return await AlexaAPI._process_response(response, login)

    @_catch_all_exceptions
    async def run_behavior(
        self,
        node_data,
        queue_delay: float = 1.5,
    ) -> None:
        """Queue node_data for running a behavior in sequence.

        Amazon sequences and routines are based on node_data.

        Args:
            node_data (dict, list of dicts): The node_data to run.
            queue_delay (float, optional): The number of seconds to wait
                                          for commands to queue together.
                                          Defaults to 1.5.
                                          Must be positive.

        """
        sequence_json: dict[Any, Any] = {
            "@type": "com.amazon.alexa.behaviors.model.Sequence",
            "startNode": node_data,
        }
        if queue_delay is None:
            queue_delay = 1.5
        if queue_delay > 0:
            sequence_json["startNode"] = {
                "@type": "com.amazon.alexa.behaviors.model.SerialNode",
                "nodesToExecute": [],
            }
            async with AlexaAPI._sequence_lock[self._login.email]:
                if AlexaAPI._sequence_queue[self._login.email]:
                    last_node = AlexaAPI._sequence_queue[self._login.email][-1]
                    new_node = node_data
                    if node_data and isinstance(node_data, list):
                        new_node = node_data[0]
                    if (
                        last_node.get("operationPayload", {}).get("deviceSerialNumber")
                        and new_node.get("operationPayload", {}).get(
                            "deviceSerialNumber"
                        )
                    ) and last_node.get("operationPayload", {}).get(
                        "deviceSerialNumber"
                    ) != new_node.get("operationPayload", {}).get("deviceSerialNumber"):
                        _LOGGER.debug(
                            "%s: Creating Parallel node",
                            hide_email(self._login.email),
                        )
                        sequence_json["startNode"]["@type"] = (
                            "com.amazon.alexa.behaviors.model.ParallelNode"
                        )
                if isinstance(node_data, list):
                    AlexaAPI._sequence_queue[self._login.email].extend(node_data)
                else:
                    AlexaAPI._sequence_queue[self._login.email].append(node_data)
                items = len(AlexaAPI._sequence_queue[self._login.email])
                old_sequence: list[dict[Any, Any]] = AlexaAPI._sequence_queue[
                    self._login.email
                ]
            await asyncio.sleep(queue_delay)
            async with AlexaAPI._sequence_lock[self._login.email]:
                if (
                    items == len(AlexaAPI._sequence_queue[self._login.email])
                    and old_sequence == AlexaAPI._sequence_queue[self._login.email]
                ):
                    sequence_json["startNode"]["nodesToExecute"].extend(
                        AlexaAPI._sequence_queue[self._login.email]
                    )
                    AlexaAPI._sequence_queue[self._login.email] = []
                    _LOGGER.debug(
                        "%s: Creating sequence for %s items",
                        hide_email(self._login.email),
                        items,
                    )
                else:
                    _LOGGER.debug(
                        "%s: Queue changed while waiting %s seconds",
                        hide_email(self._login.email),
                        queue_delay,
                    )
                    return
        data = {
            "behaviorId": "PREVIEW",
            "sequenceJson": json.dumps(sequence_json),
            "status": "ENABLED",
        }
        _LOGGER.debug(
            "%s: Running behavior with data: %s",
            hide_email(self._login.email),
            json.dumps(data),
        )
        await self._post_request("/api/behaviors/preview", data=data)

    @_catch_all_exceptions
    async def send_sequence(
        self,
        sequence: str,
        customer_id: str | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
        **kwargs,
    ) -> None:
        """Send sequence command.

        This allows some programmatic control of Echo device using the behaviors
        API and is the basis of play_music, send_announcement, and send_tts.

        Args:
        sequence (string): The Alexa sequence.  Supported list below.
        customer_id (string): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
        queue_delay (float, optional): The number of seconds to wait
                                    for commands to queue together.
                                    Defaults to 1.5.
                                    Must be positive.
        extra (Dict): Extra dictionary array; functionality undetermined
        **kwargs : Each named variable must match a recognized Amazon variable
                   within the operationPayload. Please see examples in
                   play_music, send_announcement, and send_tts.
                   Variables with value None are removed from the operationPayload.
                   Variables prefixed with "root_" will be added to the root node instead.

        Supported sequences:
        Alexa.Weather.Play
        Alexa.Traffic.Play
        Alexa.FlashBriefing.Play
        Alexa.GoodMorning.Play
        Alexa.GoodNight.Play
        Alexa.SingASong.Play
        Alexa.TellStory.Play
        Alexa.FunFact.Play
        Alexa.Joke.Play
        Alexa.CleanUp.Play
        Alexa.Music.PlaySearchPhrase
        Alexa.Calendar.PlayTomorrow
        Alexa.Calendar.PlayToday
        Alexa.Calendar.PlayNext
        https://github.com/custom-components/alexa_media_player/wiki#sequence-commands-versions--100

        """  # noqa: E501
        extra = extra or {}
        operation_payload = {
            "deviceType": self._device._device_type,
            "deviceSerialNumber": self._device.device_serial_number,
            "locale": (
                self._device._locale if self._device._locale else DEFAULT_LOCALE
            ),
            "customerId": (
                self._login.customer_id if customer_id is None else customer_id
            ),
        }
        root_node = {}
        if kwargs is not None:
            operation_payload.update(kwargs)
            for key, value in kwargs.items():
                if value is None:  # remove null keys
                    operation_payload.pop(key)
                elif isinstance(value, str) and value.startswith("root_"):
                    operation_payload.pop(key)
                    root_node[key] = value[5:]
            if kwargs.get("devices"):
                operation_payload.pop("deviceType")
                operation_payload.pop("deviceSerialNumber")
        node_data = {
            "@type": "com.amazon.alexa.behaviors.model.OpaquePayloadOperationNode",
            "type": sequence,
            "operationPayload": operation_payload,
        }
        node_data.update(root_node)
        await self.run_behavior(node_data, queue_delay=queue_delay)

    @_catch_all_exceptions
    async def run_skill(
        self,
        skill_id: str,
        customer_id: str | None = None,
        queue_delay: float = 0,
    ) -> None:
        """Run Alexa skill.

        This allows running of defined Alexa skill.

        Args:
            skill_id (string): The full skill id.
            customer_id (string): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
            queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.

        """
        operation_payload = {
            "targetDevice": {
                "deviceType": self._device._device_type,
                "deviceSerialNumber": self._device.device_serial_number,
            },
            "locale": (
                self._device._locale if self._device._locale else DEFAULT_LOCALE
            ),
            "customerId": (
                self._login.customer_id if customer_id is None else customer_id
            ),
            "connectionRequest": {
                "uri": "connection://AMAZON.Launch/" + skill_id,
                "input": {},
            },
        }
        node_data = {
            "@type": "com.amazon.alexa.behaviors.model.OpaquePayloadOperationNode",
            "type": "Alexa.Operation.SkillConnections.Launch",
            "operationPayload": operation_payload,
        }
        await self.run_behavior(node_data, queue_delay=queue_delay)

    @_catch_all_exceptions
    async def run_custom(
        self,
        text: str,
        customer_id: str | None = None,
        queue_delay: float = 0,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Run Alexa skill.

        This allows running exactly what you can say to alexa.

        Args:
            text (string): The full text you want alexa to execute.
            customer_id (string): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
            queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.
            extra (Dict): Extra dictionary array; functionality undetermined

        """
        extra = extra or {}
        await self.send_sequence(
            "Alexa.TextCommand",
            skillId="amzn1.ask.1p.tellalexa",
            text=text,
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def run_routine(
        self,
        utterance: str,
        customer_id: str | None = None,
        queue_delay: float = 1.5,
    ) -> None:
        """Run Alexa automation routine.

        This allows running of defined Alexa automation routines.

        Args:
            utterance (string):
                The Alexa routine name or its voice utterance to run the routine.
            customer_id (string):
                CustomerId to use for authorization.
                When none specified this defaults to the logged in user.
                Used with households where others may have their own music.
            queue_delay (float, optional):
                The number of seconds to wait for commands to queue together.
                Defaults to 1.5.
                Must be positive.

        """

        def _populate_device_info(node) -> None:
            """Walk node structure and replace ALEXA_CURRENT_* placeholders."""
            if node is None:
                return

            if isinstance(node, list):
                for item in node:
                    _populate_device_info(item)
                return

            if not isinstance(node, dict):
                return

            if node.get("deviceType") == "ALEXA_CURRENT_DEVICE_TYPE":
                node["deviceType"] = self._device._device_type
            if node.get("deviceSerialNumber") == "ALEXA_CURRENT_DSN":
                node["deviceSerialNumber"] = self._device.device_serial_number
            if node.get("locale") == "ALEXA_CURRENT_LOCALE":
                node["locale"] = self._device._locale or DEFAULT_LOCALE

            for v in node.values():
                if isinstance(v, (dict, list)):
                    _populate_device_info(v)

        # Fetch automations (routines)
        if not (automations := await AlexaAPI.get_automations(self._login)):
            return

        utterance_cf = utterance.casefold()
        automation_id = None
        sequence = None

        for automation in automations:
            if not isinstance(automation, dict):
                continue

            # 1) Name match first (covers device-trigger routines)
            if (
                isinstance(name := automation.get("name"), str)
                and name.casefold() == utterance_cf
            ):
                automation_id = automation.get("automationId")
                seq = automation.get("sequence")
                sequence = seq if isinstance(seq, dict) else None
                break

            # 2) Fallback: spoken utterance match (CustomUtterance only)
            if not (
                isinstance(triggers := automation.get("triggers"), list)
                and triggers
                and isinstance(triggers[0], dict)
                and triggers[0].get("type") == "CustomUtterance"
                and isinstance(payload := triggers[0].get("payload"), dict)
            ):
                continue

            if (
                isinstance(u := payload.get("utterance"), str)
                and u.casefold() == utterance_cf
            ) or (
                isinstance(utterances := payload.get("utterances"), list)
                and any(
                    isinstance(x, str) and x.casefold() == utterance_cf
                    for x in utterances
                )
            ):
                automation_id = automation.get("automationId")
                seq = automation.get("sequence")
                sequence = seq if isinstance(seq, dict) else None
                break

        if automation_id is None or sequence is None:
            _LOGGER.debug(
                "%s: No routine found for %s",
                hide_email(self._login.email),
                utterance,
            )
            return

        if not isinstance(start_node := sequence.get("startNode"), dict):
            _LOGGER.debug(
                "%s: Routine %s found for %s, but sequence.startNode is "
                "missing/invalid",
                hide_email(self._login.email),
                automation_id,
                utterance,
            )
            return

        _populate_device_info(start_node)

        nodes = start_node.get("nodesToExecute")
        await self.run_behavior(
            nodes if isinstance(nodes, list) else start_node,
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def play_music(
        self,
        provider_id: str,
        search_phrase: str,
        customer_id: str | None = None,
        timer: int | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Play music based on search.

        Args:
            provider_id (str): Amazon music provider.
            search_phrase (str): Phrase to be searched for
            customer_id (Optional[str], optional): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
            timer (Optional[int]): Number of seconds to play before stopping.
            queue_delay (float, optional): The number of seconds to wait
                                   for commands to queue together.
                                   Must be positive. Defaults to 1.5.
            extra (Dict): Extra dictionary array; functionality undetermined

        """  # noqa: E501
        extra = extra or {}
        customer_id = self._login.customer_id if customer_id is None else customer_id
        if timer:
            await self.send_sequence(
                "Alexa.Music.PlaySearchPhrase",
                customer_id=customer_id,
                searchPhrase=search_phrase,
                sanitizedSearchPhrase=search_phrase,
                musicProviderId=provider_id,
                waitTimeInSeconds=timer,
                queue_delay=queue_delay,
            )
        else:
            await self.send_sequence(
                "Alexa.Music.PlaySearchPhrase",
                customer_id=customer_id,
                searchPhrase=search_phrase,
                sanitizedSearchPhrase=search_phrase,
                musicProviderId=provider_id,
                queue_delay=queue_delay,
            )

    @_catch_all_exceptions
    async def play_sound(
        self,
        sound_string_id: str,
        customer_id: str | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Play Alexa sound."""
        extra = extra or {}
        await self.send_sequence(
            "Alexa.Sound",
            customer_id=self._login.customer_id if customer_id is None else customer_id,
            soundStringId=sound_string_id,
            skillId="amzn1.ask.1p.sound",
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def stop(
        self,
        customer_id: str | None = None,
        queue_delay: float = 1.5,
        all_devices: bool = False,
    ) -> None:
        """Stop device playback.

        Keyword Arguments:
            customer_id {str} -- CustomerId issuing command (default: {None})
            queue_delay {float} -- The number of seconds to wait
                                   for commands to queue together.
                                   Must be positive.
                                   (default: {1.5})
            all_devices {bool} -- Whether all devices should be stopped (default: {False})

        """  # noqa: E501
        kwargs = {}

        if all_devices:
            kwargs["devices"] = (
                {
                    "deviceType": "ALEXA_ALL_DEVICE_TYPE",
                    "deviceSerialNumber": "ALEXA_ALL_DSN",
                },
            )
        else:
            kwargs["devices"] = [
                {
                    "deviceSerialNumber": self._device.device_serial_number,
                    "deviceType": self._device._device_type,
                },
            ]

        await self.send_sequence(
            "Alexa.DeviceControls.Stop",
            skillId="amzn1.ask.1p.alexadevicecontrols",
            customer_id=self._login.customer_id if customer_id is None else customer_id,
            queue_delay=queue_delay,
            **kwargs,
        )

    def process_targets(self, targets: list[str] | None = None) -> list[dict[str, str]]:
        """Process targets list to generate list of devices.

        Keyword Arguments
            targets {Optional[List[str]]} -- List of serial numbers
                (default: {[]})

        Returns
            List[Dict[str, str] -- List of device dicts

        """
        targets = targets or []
        devices = []
        if self._device._device_family == "WHA":
            # Build group of devices based off _cluster_members
            for dev in AlexaAPI.devices[self._login.email]:
                if dev["serialNumber"] in self._device._cluster_members:
                    devices.append(
                        {
                            "deviceSerialNumber": dev["serialNumber"],
                            "deviceTypeId": dev["deviceType"],
                        }
                    )
        elif targets and isinstance(targets, list):
            for dev in AlexaAPI.devices[self._login.email]:
                if dev["serialNumber"] in targets or dev["accountName"] in targets:
                    devices.append(
                        {
                            "deviceSerialNumber": dev["serialNumber"],
                            "deviceTypeId": dev["deviceType"],
                        }
                    )
        else:
            devices.append(
                {
                    "deviceSerialNumber": self._device.device_serial_number,
                    "deviceTypeId": self._device._device_type,
                }
            )
        return devices

    @_catch_all_exceptions
    async def send_tts(
        self,
        message: str,
        customer_id: str | None = None,
        targets: list[str] | None = None,
        queue_delay: float = 1.5,
    ) -> None:
        """Send message for TTS at speaker.

        This is the old method which used Alexa Simon Says which did not work
        for WHA. This will not beep prior to sending. send_announcement
        should be used instead.

        Args:
        message (string): The message to speak. For canned messages, the message
                            must start with `alexa.cannedtts.speak` as discovered
                            in the routines.
        customer_id (string): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
        targets (list(string)): WARNING: This is currently non functional due
                                to Alexa's API and is only included for future
                                proofing.
                                List of serialNumber or accountName to send the
                                tts to. Only those in this AlexaAPI
                                account will be searched. If None, announce
                                will be self.
        queue_delay (float, optional): The number of seconds to wait
                                          for commands to queue together.
                                          Defaults to 1.5.
                                          Must be positive.

        """
        if message.startswith("alexa.cannedtts.speak"):
            await self.send_sequence(
                "Alexa.CannedTts.Speak",
                customer_id=(
                    self._login.customer_id if customer_id is None else customer_id
                ),
                cannedTtsStringId=message,
                skillId="amzn1.ask.1p.saysomething",
                queue_delay=queue_delay,
            )
        else:
            target = {
                "customerId": (
                    self._login.customer_id if customer_id is None else customer_id
                ),
                "devices": self.process_targets(targets),
            }
            await self.send_sequence(
                "Alexa.Speak",
                customer_id=(
                    self._login.customer_id if customer_id is None else customer_id
                ),
                textToSpeak=message,
                target=target,
                skillId="amzn1.ask.1p.saysomething",
                queue_delay=queue_delay,
            )

    @_catch_all_exceptions
    async def send_announcement(
        self,
        message: str,
        method: str = "all",
        title: str = "Announcement",
        customer_id: str | None = None,
        targets: list[str] | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Send announcement to Alexa devices.

        This uses the AlexaAnnouncement and allows visual display on the Show.
        It will beep prior to speaking.

        Args:
        message (string): The message to speak or display.
        method (string): speak, show, or all
        title (string): title to display on Echo show
        customer_id (string): CustomerId to use for authorization. When none
                             specified this defaults to the logged in user. Used
                             with households where others may have their own
                             music.
        targets (list(string)): List of serialNumber or accountName to send the
                                announcement to. Only those in this AlexaAPI
                                account will be searched. If None, announce
                                will be self.
        queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.
        extra (Dict): Extra dictionary array; functionality undetermined

        """
        extra = extra or {}
        display = (
            {"title": "", "body": ""}
            if method.lower() == "speak"
            else {"title": title, "body": message}
        )
        speak = (
            {"type": "text", "value": ""}
            if method.lower() == "show"
            else {"type": "text", "value": message}
        )
        content = [
            {
                "locale": (
                    self._device._locale if self._device._locale else DEFAULT_LOCALE
                ),
                "display": display,
                "speak": speak,
            }
        ]
        target = {
            "customerId": (
                self._login.customer_id if customer_id is None else customer_id
            ),
            "devices": self.process_targets(targets),
        }
        await self.send_sequence(
            "AlexaAnnouncement",
            customer_id=self._login.customer_id if customer_id is None else customer_id,
            expireAfter="PT5S",
            content=content,
            target=target,
            skillId="amzn1.ask.1p.routines.messaging",
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def send_mobilepush(
        self,
        message: str,
        title: str = "AlexaAPI Message",
        customer_id: str | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Send mobile push to Alexa app.

        Push a message to mobile devices with the Alexa App. This probably
        should be a static method.

        Args:
        message (string): The message to push to the mobile device.
        title (string): Title for push notification
        customer_id (string): CustomerId to use for sending. When none
                              specified this defaults to the logged in user.
        queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.
        extra (Dict): Extra dictionary array; functionality undetermined

        """
        extra = extra or {}
        await self.send_sequence(
            "Alexa.Notifications.SendMobilePush",
            customer_id=(
                self._login.customer_id if customer_id is None else customer_id
            ),
            notificationMessage=message,
            alexaUrl="#v2/behaviors",
            title=title,
            skillId="amzn1.ask.1p.routines.messaging",
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def send_dropin_notification(
        self,
        message: str,
        title: str = "AlexaAPI Dropin Notification",
        customer_id: str | None = None,
        queue_delay: float = 1.5,
        extra: dict[Any, Any] | None = None,
    ) -> None:
        """Send dropin notification to Alexa app for Alexa device.

        Push a message to mobile devices with the Alexa App. This can spawn a
        notification to drop in on a specific device.

        Args:
        message (string): The message to push to the mobile device.
        title (string): Title for push notification
        customer_id (string): CustomerId to use for sending. When none
                              specified this defaults to the logged in user.
        queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.
        extra (Dict): Extra dictionary array; functionality undetermined

        """
        extra = extra or {}
        await self.send_sequence(
            "Alexa.Notifications.DropIn",
            customer_id=(
                self._login.customer_id if customer_id is None else customer_id
            ),
            notificationMessage=message,
            alexaUrl="#v2/comms/conversation-list?showDropInDialog=true",
            title=title,
            skillId="root_amzn1.ask.1p.action.dropin",
            queue_delay=queue_delay,
            deviceType=None,
            deviceSerialNumber=None,
            locale=None,
        )

    async def set_media(self, data: dict[str, Any]) -> None:
        """Select the media player."""
        await self._post_request(
            "/api/np/command",
            data=data,
            query={
                "deviceSerialNumber": self._device.device_serial_number,
                "deviceType": self._device._device_type,
            },
        )

    @_catch_all_exceptions
    async def previous(self) -> None:
        """Play previous."""
        await self.set_media({"type": "PreviousCommand"})

    @_catch_all_exceptions
    async def next(self) -> None:
        """Play next."""
        await self.set_media({"type": "NextCommand"})

    @_catch_all_exceptions
    async def pause(self) -> None:
        """Pause."""
        await self.set_media({"type": "PauseCommand"})

    @_catch_all_exceptions
    async def play(self) -> None:
        """Play."""
        await self.set_media({"type": "PlayCommand"})

    @_catch_all_exceptions
    async def forward(self) -> None:
        """Fastforward."""
        await self.set_media({"type": "ForwardCommand"})

    @_catch_all_exceptions
    async def rewind(self) -> None:
        """Rewind."""
        await self.set_media({"type": "RewindCommand"})

    @_catch_all_exceptions
    async def set_volume(
        self,
        volume: float,
        customer_id: str | None = None,
        queue_delay: float = 1.5,
    ) -> None:
        """Set volume.

        Args:
        volume (float): The volume between 0 and 1.
        customer_id (string): CustomerId to use for sending. When none
                              specified this defaults to the logged in user.
        queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.

        """
        await self.send_sequence(
            "Alexa.DeviceControls.Volume",
            customer_id=(
                self._login.customer_id if customer_id is None else customer_id
            ),
            value=volume * 100,
            queue_delay=queue_delay,
        )

    @_catch_all_exceptions
    async def shuffle(self, setting: bool) -> None:
        """Shuffle.

        setting (string) : true or false
        """
        await self.set_media({"type": "ShuffleCommand", "shuffle": setting})

    @_catch_all_exceptions
    async def repeat(self, setting: bool) -> None:
        """Repeat.

        setting (string) : true or false
        """
        await self.set_media({"type": "RepeatCommand", "repeat": setting})

    @_catch_all_exceptions
    async def get_state(self) -> dict[str, Any] | None:
        """Get playing state."""
        response = await self._get_request(
            "/api/np/player",
            query={
                "deviceSerialNumber": self._device.device_serial_number,
                "deviceType": self._device._device_type,
                "screenWidth": 2560,
            },
        )
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @_catch_all_exceptions
    async def get_wifi_details(self) -> dict[str, Any] | None:
        """Get wifi details."""
        response = await self._get_request(
            "/api/device-wifi-details",
            query={
                "deviceSerialNumber": self._device.device_serial_number,
                "deviceType": self._device._device_type,
            },
        )
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @_catch_all_exceptions
    async def set_dnd_state(self, state: bool) -> None:
        """Set Do Not Disturb state.

        Args:
        state (boolean): true or false

        Returns json

        """
        data = {
            "deviceSerialNumber": self._device.device_serial_number,
            "deviceType": self._device._device_type,
            "enabled": state,
        }
        _LOGGER.debug(
            "%s: Setting DND state: %s data: %s",
            hide_email(self._login.email),
            state,
            json.dumps(data),
        )
        response = await self._put_request("/api/dnd/status", data=data)
        response_json, *_ = await get_json_value(response, None, dict)
        success = data == response_json
        _LOGGER.debug(
            "%s: Success: %s Response: %s",
            hide_email(self._login.email),
            success,
            response_json,
        )
        return success

    @staticmethod
    @_catch_all_exceptions
    async def get_bluetooth(login) -> dict[str, Any] | None:
        """Get paired bluetooth devices."""
        response = await AlexaAPI._static_request(
            "get", login, "/api/bluetooth", query={"cached": "false"}
        )
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @_catch_all_exceptions
    async def set_bluetooth(self, mac: str) -> None:
        """Pair with bluetooth device with mac address."""
        await self._post_request(
            "/api/bluetooth/pair-sink/"
            + self._device._device_type
            + "/"
            + self._device.device_serial_number,
            data={"bluetoothDeviceAddress": mac},
        )

    @_catch_all_exceptions
    async def disconnect_bluetooth(self) -> None:
        """Disconnect all bluetooth devices."""
        await self._post_request(
            "/api/bluetooth/disconnect-sink/"
            + self._device._device_type
            + "/"
            + self._device.device_serial_number,
            data=None,
        )

    @staticmethod
    @_catch_all_exceptions
    async def get_devices(login: AlexaLogin) -> list[dict[str, Any]] | None:
        """Identify all Alexa devices."""
        response = await AlexaAPI._static_request(
            "get", login, "/api/devices-v2/device", query=None
        )
        devices, *_ = await get_json_value(response, "devices", list)
        AlexaAPI.devices[login.email] = (
            devices if devices else AlexaAPI.devices[login.email]
        )
        return AlexaAPI.devices[login.email]

    @staticmethod
    @_catch_all_exceptions
    async def get_wake_words(login: AlexaLogin) -> list[dict[str, Any]] | None:
        """Get the wake words for the devices."""
        response = await AlexaAPI._static_request(
            "get", login, "/api/wake-word", query={"cached": "true"}
        )

        wake_words, valid = await get_json_value(response, "wakeWords", list)

        if not valid or not wake_words:
            # Lightweight diagnostics without leaking payload contents
            try:
                body = await response.json(content_type=None)
                if isinstance(body, dict):
                    _LOGGER.debug(
                        "Wake-word API returned no usable wakeWords. "
                        "Top-level keys: %s",
                        list(body.keys()),
                    )
                else:
                    _LOGGER.debug(
                        "Wake-word API returned unexpected JSON type: %s",
                        type(body).__name__,
                    )
            except Exception as exc:
                _LOGGER.debug(
                    "Wake-word API JSON inspection failed: %s",
                    exc,
                )

            # Safe fallback: return cached value or empty list
            return AlexaAPI.wake_words.get(login.email, [])

        AlexaAPI.wake_words[login.email] = wake_words
        return wake_words

    @staticmethod
    @_catch_all_exceptions
    async def find_wake_word(login: AlexaLogin, serial: str) -> str | None:
        """Find the wake word associated to a device."""
        wake_words = (
            AlexaAPI.wake_words[login.email]
            if login.email in AlexaAPI.wake_words
            else await AlexaAPI.get_wake_words(login)
        )
        if wake_words:
            found = next(
                filter(
                    lambda wake_word: serial == wake_word["deviceSerialNumber"],
                    wake_words,
                ),
                None,
            )
            if found is not None:
                return found["wakeWord"].lower()
        return None

    @staticmethod
    @_catch_all_exceptions
    async def get_authentication(login: AlexaLogin) -> dict[str, Any] | None:
        """Get authentication json."""
        response = await AlexaAPI._static_request(
            "get",
            login,
            f"/api/users/me?platform=ios&version={CALL_VERSION}",
            query=None,
        )
        json_resp, *_ = await get_json_value(response, None, dict)
        if json_resp:
            return {
                "authenticated": True,
                "canAccessPrimeMusicContent": json_resp.get(
                    "canAccessPrimeMusicContent", True
                ),
                "customerEmail": json_resp.get("email"),
                "customerId": json_resp.get("id"),
                "customerName": json_resp.get("fullName"),
            }
        return None

    @staticmethod
    @_catch_all_exceptions
    async def get_customer_history_records(
        login: AlexaLogin,
        start_time: int | None = None,
        end_time: int | None = None,
        max_record_size: int | None = 1,
    ) -> list[dict[str, Any]] | None:
        """Get customer history records."""
        start_time = (
            int((time.time() - 24 * 3600) * 1000) if start_time is None else start_time
        )
        end_time = (
            int((time.time() + 24 * 3600) * 1000) if end_time is None else end_time
        )
        extra_headers = {
            "referer": f"https://www.{login.url}",
            "anti-csrftoken-a2z": login.csrf_token,
        }
        # The anti-csrf token expires after 24 hours
        if login.csrf_token is None or (
            int(time.time()) - login.csrf_token_created_at > 60 * 60 * 24
        ):
            extra_headers["anti-csrftoken-a2z"] = await login.get_csrf_token()

        response = await AlexaAPI._static_request(
            "post",
            login,
            "/alexa-privacy/apd/rvh/customer-history-records-v2",
            data={"previousRequestToken": None},
            additional_headers=extra_headers,
            query={
                "startTime": start_time,
                "endTime": end_time,
                "recordType": "VOICE_HISTORY",
                "maxRecordSize": max_record_size,
            },
            sub_domain="www",
        )
        ret: list[dict[str, Any]] = []
        customerHistoryRecords, valid = await get_json_value(
            response, "customerHistoryRecords", (list, NoneType)
        )
        if customerHistoryRecords is None:
            return ret if valid else None

        for record in customerHistoryRecords:
            o: dict[str, Any] = {}
            conv_parts: dict[str, list[dict[str, Any]]] = {}

            for item in record.get("voiceHistoryRecordItems") or []:
                conv_parts.setdefault(item.get("recordItemType", ""), []).append(item)

            if conv_parts:
                o["conversionDetails"] = conv_parts

            record_key = (record.get("recordKey") or "").split("#")
            o["deviceType"] = (
                record_key[2]
                if len(record_key) > 2 and record_key[2]
                else None
            )
            o["creationTimestamp"] = record.get("timestamp")
            o["deviceSerialNumber"] = record_key[3] if len(record_key) > 3 else None
            o["utteranceType"] = record.get("utteranceType")

            wake_word = (
                await AlexaAPI.find_wake_word(login, o["deviceSerialNumber"])
                if o.get("deviceSerialNumber")
                else None
            )
            lw = wake_word.lower() if wake_word else None

            # -------- Summary (what the user said) --------
            summary_parts: list[str] = []
            for key in ("CUSTOMER_TRANSCRIPT", "ASR_REPLACEMENT_TEXT"):
                for trans in conv_parts.get(key, []):
                    text = (trans.get("transcriptText") or "").strip()
                    if not text:
                        continue

                    text_l = text.lower()
                    if lw and text_l.startswith(lw):
                        # strip original-length wake_word, then punctuation/space
                        text = text[len(wake_word) :].lstrip(" ,:").strip()
                    elif text_l.startswith("alexa"):
                        text = text[5:].lstrip(" ,:").strip()

                    if text:
                        summary_parts.append(text)

            o["description"] = {"summary": ", ".join(summary_parts)}

            # -------- Alexa response (what Alexa said / TTS) --------
            response_parts: list[str] = []
            for key in ("ALEXA_RESPONSE", "TTS_REPLACEMENT_TEXT"):
                for trans in conv_parts.get(key, []):
                    text = (trans.get("transcriptText") or "").strip()
                    if text:
                        response_parts.append(text)

            o["alexaResponse"] = ", ".join(response_parts)

            ret.append(o)

        return ret

    @staticmethod
    @_catch_all_exceptions
    async def get_activities(
        login: AlexaLogin, items: int = 10
    ) -> dict[str, Any] | None:
        """Get activities json."""
        response = await AlexaAPI._static_request(
            "get",
            login,
            "/api/activities",
            query={"startTime": "", "size": items, "offset": 1},
        )
        result, *_ = await get_json_value(response, "activities", dict)
        return result

    @staticmethod
    @_catch_all_exceptions
    async def get_device_preferences(login: AlexaLogin) -> dict[str, Any] | None:
        """Identify all Alexa device preferences."""
        response = await AlexaAPI._static_request(
            "get", login, "/api/device-preferences", query={}
        )
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def get_automations(
        login: AlexaLogin, items: int = 1000
    ) -> list[dict[str, Any]] | None:
        """Identify all Alexa automations."""
        response = await AlexaAPI._static_request(
            "get", login, "/api/behaviors/v2/automations", query={"limit": items}
        )
        response_json, *_ = await get_json_value(response, None, list)
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def get_last_device_serial(
        login: AlexaLogin, items: int = 10
    ) -> dict[str, Any] | None:
        """Identify the last device's serial number and last summary.

        This will search the [last items] activity records and find the latest
        entry where Echo successfully responded.
        """
        response = await AlexaAPI.get_customer_history_records(
            login, max_record_size=items
        )
        if response is not None:
            for last_activity in response:
                summary = ""
                # Ignore empty description and summary
                # Ignore utterance type DEVICE_ARBITRATION
                if (
                    last_activity["description"]
                    and last_activity["description"]["summary"]
                    and last_activity["utteranceType"] != "DEVICE_ARBITRATION"
                ):
                    with contextlib.suppress(AttributeError, JSONDecodeError):
                        summary = last_activity["description"]["summary"]
                    return {
                        "serialNumber": (last_activity["deviceSerialNumber"]),
                        "timestamp": last_activity["creationTimestamp"],
                        "summary": summary,
                    }

        return None

    @_catch_all_exceptions
    async def set_guard_state(
        self, entity_id: str, state: str, queue_delay: float = 1.5
    ) -> None:
        """Set Guard state.

        Args:
        entity_id (str): numeric ending of applianceId of RedRock Panel
        state (str): AWAY, HOME
        queue_delay (float, optional): The number of seconds to wait
                                        for commands to queue together.
                                        Defaults to 1.5.
                                        Must be positive.
        Returns json

        """
        _LOGGER.debug(
            "%s: Setting Guard state: %s ", hide_email(self._login.email), state
        )

        await self.send_sequence(
            "controlGuardState",
            target=entity_id,
            operationId="controlGuardState",
            state=state,
            skillId="amzn1.ask.skill.f71a9b50-e99a-4669-a226-d50ebb5e0830",
            queue_delay=queue_delay,
        )

    @staticmethod
    @_catch_all_exceptions
    async def get_guard_state(
        login: AlexaLogin, entity_id: str
    ) -> dict[str, Any] | None:
        """Get state of Alexa guard.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin
        entity_id (str): applianceId of RedRock Panel

        Returns json

        """
        return await AlexaAPI.get_entity_state(login, appliance_ids=[entity_id])

    @staticmethod
    @_catch_all_exceptions
    async def get_entity_state(
        login: AlexaLogin,
        entity_ids: list[str] | None = None,
        appliance_ids: list[str] | None = None,
    ) -> dict[str, Any] | None:
        """Get the current state of multiple appliances.

        Note that this can take both entity_ids and appliance_ids.
        If you have both pieces of data available, prefer the entity id. A single entity might have multiple
        appliance ids. Its easier to ensure you don't miss data by just providing entity id instead.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin
        entity_ids (List[str]): The list of entities you want information about.
        appliance_ids: (List[str]): The list of appliances you want information about.

        Returns json

        """  # noqa: E501
        state_requests = []
        if entity_ids is not None:
            for entity_id in entity_ids:
                state_requests.append({"entityId": entity_id, "entityType": "ENTITY"})
        if appliance_ids is not None:
            for appliance_id in appliance_ids:
                state_requests.append(
                    {"entityId": appliance_id, "entityType": "APPLIANCE"}
                )
        data = {"stateRequests": state_requests}
        response = await AlexaAPI._static_request(
            "post", login, "/api/phoenix/state", data=data
        )
        response_json, *_ = await get_json_value(response, None, dict)
        _LOGGER.debug(
            "%s: get_entity_state response: %s", hide_email(login.email), response_json
        )
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def static_set_guard_state(
        login: AlexaLogin, entity_id: str, state: str
    ) -> dict[str, Any] | None:
        """Set state of Alexa guard.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin
        entity_id (str): entityId of RedRock Panel
        state (str): ARMED_AWAY, ARMED_STAY

        Returns json

        """
        parameters = {"action": "controlSecurityPanel", "armState": state}
        data = {
            "controlRequests": [
                {
                    "entityId": entity_id,
                    "entityType": "APPLIANCE",
                    "parameters": parameters,
                }
            ]
        }
        response = await AlexaAPI._static_request(
            "put", login, "/api/phoenix/state", data=data
        )
        response_json, *_ = await get_json_value(response, None, dict)
        _LOGGER.debug(
            "%s: set_guard_state response: %s for data: %s ",
            hide_email(login.email),
            response_json,
            json.dumps(data),
        )
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def set_light_state(
        login: AlexaLogin,
        entity_id: str,
        power_on: bool = True,
        brightness: int | None = None,
        color_name: str | None = None,
        color_temperature_name: str | None = None,
    ) -> dict[str, Any] | None:
        """Set state of a light.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin
        entity_id (str): Entity ID of The light. Not the Application ID.
        power_on (bool): Should the light be on or off.
        brightness (Optional[int]): 0-100 or None to leave as is
        color_name (Optional[str]): The name of a color that Alexa supports in snake case.
        color_temperature_name (Optional[str]): The name of a color temperature name that Alexa supports in snake case.

        Returns json

        """  # noqa: E501
        control_requests = [
            {
                "entityId": entity_id,
                "entityType": "ENTITY",
                "parameters": {"action": "turnOn" if power_on else "turnOff"},
            }
        ]

        if brightness is not None and 0 <= brightness <= 100:
            control_requests.append(
                {
                    "entityId": entity_id,
                    "entityType": "ENTITY",
                    "parameters": {
                        "action": "setBrightness",
                        "brightness": str(brightness),
                    },
                }
            )

        if color_name is not None:
            control_requests.append(
                {
                    "entityId": entity_id,
                    "entityType": "ENTITY",
                    "parameters": {"action": "setColor", "colorName": color_name},
                }
            )

        if color_temperature_name is not None:
            control_requests.append(
                {
                    "entityId": entity_id,
                    "entityType": "ENTITY",
                    "parameters": {
                        "action": "setColorTemperature",
                        "colorTemperatureName": color_temperature_name,
                    },
                }
            )

        data = {"controlRequests": control_requests}

        response = await AlexaAPI._static_request(
            "put", login, "/api/phoenix/state", data=data
        )
        response_json, *_ = await get_json_value(response, None, dict)
        _LOGGER.debug(
            "%s: set_light_state response: %s for data: %s ",
            hide_email(login.email),
            response_json,
            json.dumps(data),
        )
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def get_devices_gql(login: AlexaLogin) -> list[dict[str, Any]] | None:
        """Get devices of the Alexa network.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin

        Returns json

        """
        response = await AlexaAPI._static_request(
            "post", login, "/nexus/v1/graphql", data={"query": GQL_SMARTHOME_QUERY}
        )
        # _LOGGER.debug("%s: Response: %s", hide_email(login.email),
        #               await response.json(content_type=None))
        result, *_ = await get_json_value(response, "data.endpoints.items", list)
        return result

    @staticmethod
    @_catch_all_exceptions
    async def get_network_details(login: AlexaLogin) -> list[dict[str, Any]] | None:
        """Get the network of devices that Alexa is aware of.

        Args:
            login: (AlexaLogin): Successfully logged in AlexaLogin

        Returns:
            List of legacy appliance dicts, or None if no legacy appliances
            are present or the response is missing.
        """
        network_detail = await AlexaAPI.get_devices_gql(login)
        email = hide_email(login.email)
        if network_detail is None:
            _LOGGER.warning("%s: get_devices_gql returned None", email)
            return None

        details: list[dict[str, Any]] = []
        for el in network_detail:
            legacy = el.get("legacyAppliance")
            if isinstance(legacy, dict):
                details.append(legacy)
            else:
                _LOGGER.debug("%s: get_devices_gql skipped element: %s", email, el)

        _LOGGER.debug("%s: get_devices_gql raw response: %s", email, network_detail)
        return details or None

    @staticmethod
    def _should_skip_notifications(email: str, now: float) -> bool:
        """Return True if we should skip notifications due to cooldown."""
        if not hasattr(AlexaAPI, "_notif_last_call"):
            AlexaAPI._notif_last_call = {}

        last = AlexaAPI._notif_last_call.get(email, 0.0)
        cooldown = 10
        if now - last < cooldown:
            _LOGGER.debug(
                "%s: Skipping alexapy get_notifications; last %.1fs ago (cooldown %ss)",
                hide_email(email),
                now - last,
                cooldown,
            )
            return True

        AlexaAPI._notif_last_call[email] = now
        return False

    @staticmethod
    def _build_notifications_headers(login: AlexaLogin) -> dict[str, str]:
        """Build headers for the notifications request."""
        base_headers = getattr(login, "_headers", {}) or {}
        cookie = base_headers.get("Cookie") or base_headers.get("cookie")
        csrf = (
            base_headers.get("anti-csrftoken-a2z")
            or base_headers.get("csrf")
            or base_headers.get("x-amzn-csrf")
        )

        headers: dict[str, str] = {}
        if cookie:
            headers["Cookie"] = cookie
        if csrf:
            if "anti-csrftoken-a2z" in base_headers:
                headers["anti-csrftoken-a2z"] = csrf
            else:
                headers["csrf"] = csrf

        headers["User-Agent"] = API_USER_AGENT
        headers["Accept-Language"] = DEFAULT_ACCEPT_LANGUAGE
        headers["Accept"] = "application/json"
        headers["Connection"] = "keep-alive"

        referer = base_headers.get("Referer") or base_headers.get("referer")
        if referer:
            headers["Referer"] = referer

        return headers

    @staticmethod
    @_catch_all_exceptions
    async def get_notifications(login: AlexaLogin) -> list[dict[str, Any]] | None:
        """Get Alexa notifications using discovered API base."""
        email = login.email
        now = time.time()

        if AlexaAPI._should_skip_notifications(email, now):
            return None

        session = login.session
        if session.closed:
            raise AlexapyLoginError("Session is closed")

        # 🔹 Use discovered base instead of hard-coded NA
        api_base = await AlexaAPI._get_alexa_api_base(login)
        ts = int(time.time() * 1000)
        url = URL(api_base).with_path("/api/notifications").update_query(
            {"cached": "true", "_": str(ts)}
        )

        headers = AlexaAPI._build_notifications_headers(login)

        try:
            resp = await session.get(url, headers=headers, ssl=login._ssl)
        except ClientConnectionError as exc:
            raise AlexapyConnectionError(str(exc)) from exc

        body = await resp.text()
        _LOGGER.debug(
            "%s: notifications GET %s returned %s:%s:%s",
            hide_email(email),
            url,
            resp.status,
            resp.reason,
            resp.content_type,
        )
        try:
            parsed = json.loads(body)
            count = len(parsed.get("notifications", []))
            summary = f"{count} notifications"
        except Exception:
            summary = "<non-JSON body>"

        _LOGGER.debug(
            "%s: notifications GET JSON summary: %s",
            hide_email(email),
            summary,
        )

        if resp.status == 400 and "Rate exceeded" in body:
            _LOGGER.debug(
                "%s: notifications throttled (%s); not retrying this call",
                hide_email(email),
                hide_serial(body),
            )
            return None

        if resp.status == 401:
            login.status["login_successful"] = False
            raise AlexapyLoginError(resp.reason)

        if resp.status >= 400:
            _LOGGER.debug(
                "%s: notifications returning None due to status %s; body: %s",
                hide_email(email),
                resp.status,
                hide_serial(body),
            )
            return None

        try:
            data = json.loads(body)
        except ValueError:
            _LOGGER.debug(
                "%s: notifications invalid JSON body: %s",
                hide_email(email),
                hide_serial(body),
            )
            return None

        return data.get("notifications")

    @staticmethod
    @_catch_all_exceptions
    async def set_notifications(login: AlexaLogin, data) -> dict[str, Any] | None:
        """Update Alexa notification.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin
        data : Data to pass to notifications

        Returns json

        """
        response = await AlexaAPI._static_request(
            "put", login, "/api/notifications", data=data
        )
        # _LOGGER.debug("%s: Response: %s", hide_email(login.email),
        #               response.json(content_type=None))
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def get_dnd_state(login: AlexaLogin) -> dict[str, Any] | None:
        """Get Alexa DND states.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin

        Returns json

        """
        response = await AlexaAPI._static_request(
            "get",
            login,
            "/api/dnd/device-status-list",
        )
        response_json, *_ = await get_json_value(response, None, dict)
        return response_json

    @staticmethod
    @_catch_all_exceptions
    async def clear_history(login: AlexaLogin, items: int = 50) -> bool:
        """Clear entries in history."""
        email = login.email
        response = await AlexaAPI._static_request(
            "get", login, "/api/activities", query={"size": items, "offset": -1}
        )

        completed = True
        activities, *_ = await get_json_value(response, "activities", (list, NoneType))
        if not activities:
            _LOGGER.debug("%s: No history to delete.", hide_email(email))
            return True
        _LOGGER.debug(
            "%s:Attempting to delete %s items from history",
            hide_email(email),
            len(activities),
        )
        for activity in activities:
            if not isinstance(activity, dict) or not activity.get("id"):
                continue
            response = await AlexaAPI._static_request(
                "delete",
                login,
                f"/api/activities/{urllib.parse.quote_plus(activity['id'])}",
            )
            if response is None:
                _LOGGER.debug(
                    ("%s:Unable to connect to Alexa to delete %s"),
                    hide_email(email),
                    activity["id"],
                )
            elif response.status == 404:
                _LOGGER.warning(
                    (
                        "%s:Unable to delete %s: %s: \n"
                        "There is no voice recording to delete. "
                        "Please manually delete the entry in the Alexa app."
                    ),
                    hide_email(email),
                    activity["id"],
                    response.reason,
                )
                completed = False
            elif response.status == 200:
                _LOGGER.debug(
                    "%s: Successfully deleted %s",
                    hide_email(email),
                    activity["id"],
                )
        return completed

    @_catch_all_exceptions
    async def set_background(self, url: str) -> bool:
        """Set background for Echo Show.

        Sets the background to Alexa App Photo with the specific https url.

        Args
        url (URL): valid https url for the image

        Returns
        Whether the command was successful.

        """
        data = {
            "deviceSerialNumber": self._device.device_serial_number,
            "deviceType": self._device._device_type,
            "backgroundImageID": "JqIFZhtBTx25wLGTJGdNGQ",
            "backgroundImageType": "PERSONAL_PHOTOS",
            "backgroundImageURL": url,
        }
        _LOGGER.debug(
            "%s: Setting background of %s to: %s",
            hide_email(self._login.email),
            self._device,
            url,
        )
        if url.startswith("http://"):
            _LOGGER.warning("Background URL should be a valid https image")
        response = await self._post_request("/api/background-image", data=data)
        response_json, *_ = await get_json_value(response, None, dict)
        success = bool(response and response.status == 200)
        _LOGGER.debug(
            "%s: Success: %s Response: %s",
            hide_email(self._login.email),
            success,
            response_json,
        )
        return success

    @staticmethod
    @_catch_all_exceptions
    async def force_logout() -> None:
        """Force logout.

        Raises
            AlexapyLoginError: Raise AlexapyLoginError

        """
        raise AlexapyLoginError("Forced Logout")

    @staticmethod
    @_catch_all_exceptions
    async def ping(login: AlexaLogin) -> dict[str, Any] | None:
        """Ping.

        Args:
        login (AlexaLogin): Successfully logged in AlexaLogin

        Returns json

        """
        response = await AlexaAPI._static_request(
            "get",
            login,
            "/api/ping",
        )
        return await response.json(content_type=None) if response else None
