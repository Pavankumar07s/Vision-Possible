"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

Websocket library.

This library is based on MIT code from https://github.com/Apollon77/alexa-remote.

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

import asyncio
import contextlib
import datetime
import json
import logging
import ssl
from collections.abc import Callable, Coroutine
from typing import Any

import certifi
import httpx

from alexapy.const import HTTP2_AUTHORITY, HTTP2_DEFAULT
from alexapy.errors import AlexapyLoginError

from .alexalogin import AlexaLogin


def _create_ssl_context():
    """Create SSL context."""
    context = ssl.create_default_context(
        purpose=ssl.Purpose.SERVER_AUTH, cafile=certifi.where()
    )
    return context


_SSL_CONTEXT = _create_ssl_context()
_LOGGER = logging.getLogger(__name__)


class HTTP2EchoClient:
    """HTTP2 Client Class for Echo Devices.

    Based on code from openHAB:
    https://github.com/Apollon77/alexa-remote/blob/bc687b9e36da7c2318c56b4e1bec677c7198dbd4/alexa-http2push.js
    """

    def __init__(
        self,
        login: AlexaLogin,
        msg_callback: Callable[[Any], Coroutine[Any, Any, None]],
        open_callback: Callable[[], Coroutine[Any, Any, None]],
        close_callback: Callable[[], Coroutine[Any, Any, None]],
        error_callback: Callable[[str], Coroutine[Any, Any, None]],
        loop: asyncio.AbstractEventLoop | None = None,
    ) -> None:
        """Init for threading and HTTP2 Push Connection."""
        assert login.session is not None
        self._options = {
            "method": "GET",
            "path": "/v20160207/directives",
            "authority": HTTP2_AUTHORITY.get(
                login.url.replace("amazon", ""), HTTP2_DEFAULT
            ),
            "scheme": "https",
            "authorization": f"Bearer {login.access_token}",
        }
        self.open_callback: Callable[[], Coroutine[Any, Any, None]] = open_callback
        self.msg_callback: Callable[[Any], Coroutine[Any, Any, None]] = msg_callback
        self.close_callback: Callable[[], Coroutine[Any, Any, None]] = close_callback
        self.error_callback: Callable[[str], Coroutine[Any, Any, None]] = error_callback
        self._http2url: str = (
            f"https://{self._options['authority']}{self._options['path']}"
        )
        self.client = httpx.AsyncClient(http2=True, verify=_SSL_CONTEXT)
        self.boundary: str = ""
        self._login = login
        self._loop: asyncio.AbstractEventLoop = (
            loop if loop else asyncio.get_event_loop()
        )
        self._last_ping = datetime.datetime(1, 1, 1)
        self._tasks = set()

    async def async_run(self) -> None:
        """Start Async WebSocket Listener."""
        task = self._loop.create_task(self.process_messages())
        task.add_done_callback(self.on_close)
        self._tasks.add(task)
        task = self._loop.create_task(self.manage_pings())
        task.add_done_callback(self.on_close)
        self._tasks.add(task)
        # task = self._loop.create_task(self.test_close(raise_exception=True))
        # task.add_done_callback(self.on_close)
        # self._tasks.add(task)
        await self.async_on_open()

    async def process_messages(self) -> None:
        """Start Async WebSocket Listener."""
        _LOGGER.debug("Starting message parsing loop.")
        _LOGGER.debug("Connecting to %s with %s", self._http2url, self._options)
        try:
            async with self.client.stream(
                self._options["method"],
                self._http2url,
                headers={
                    "authorization": self._options["authorization"],
                },
                timeout=httpx.Timeout(None),
            ) as response:
                async for data in response.aiter_text():
                    await self.on_message(data)
        except httpx.RemoteProtocolError as exception_:
            self.on_close(f"Disconnect detected: {exception_}")

    async def on_message(self, message: str) -> None:
        """Handle New Message."""
        reauth_required = "Unable to authenticate the request. Please provide a valid authorization token."  # noqa: E501
        _LOGGER.debug("Received raw message: %s", message)
        for line in message.splitlines():
            if line.startswith("------"):
                if not self.boundary:  # set boundary character
                    self.boundary = line
            elif line.startswith(reauth_required):
                _LOGGER.debug("HTTP2 login error: %s", message)
                await self.handle_login_error("HTTP2 Message Parsing reauth")
            elif line.startswith("Content-Type:"):
                continue
            elif line and not line.startswith(self.boundary):
                with contextlib.suppress(json.decoder.JSONDecodeError):
                    asyncio.run_coroutine_threadsafe(
                        self.msg_callback(json.loads(line)), self._loop
                    )

    def on_error(self, error: str = "Unspecified") -> None:
        """Handle HTTP2 Error."""
        _LOGGER.debug("HTTP2 Error: %s", error)
        asyncio.run_coroutine_threadsafe(self.error_callback(error), self._loop)

    def on_close(self, future="") -> None:
        """Handle HTTP2 Close."""
        _LOGGER.debug("HTTP2 Connection Closed.")
        asyncio.gather(*self._tasks, return_exceptions=True)
        try:
            for task in self._tasks:
                if task.done():
                    exc = task.exception()
                    if exc:
                        self.on_error(exc)
                else:
                    task.remove_done_callback(self.on_close)
                    task.cancel()
        except BaseException:
            pass
        asyncio.run_coroutine_threadsafe(self.close_callback(), self._loop)

    async def async_on_open(self) -> None:
        """Handle Async WebSocket Open."""
        await self.open_callback()

    async def manage_pings(self) -> None:
        """Manage Pings."""
        while True:
            await self.ping()
            await asyncio.sleep(299)

    async def ping(self) -> None:
        """Ping."""
        url = f"https://{self._options['authority']}/ping"
        _LOGGER.debug("Preparing ping to %s", url)
        response = await self.client.get(
            url,
            headers={
                "authorization": self._options["authorization"],
            },
        )
        self._last_ping = datetime.datetime.now()
        _LOGGER.debug(
            "Received response: %s:%s",
            response.status_code,
            response.text,
        )
        if response.status_code in [403]:
            _LOGGER.debug("Detected ping 403")
            await self.handle_login_error(response.text)

    async def handle_login_error(self, message: str = "") -> None:
        """Handle login error.

        Attempt to relogin otherwise raise login error.
        """
        if not await self._login.test_loggedin():
            raise AlexapyLoginError(message)

    async def test_close(self, delay: int = 30, raise_exception: bool = False) -> None:
        """Test close."""
        await asyncio.sleep(delay)
        if raise_exception:
            raise AlexapyLoginError(f"Raised exception after {delay}")
