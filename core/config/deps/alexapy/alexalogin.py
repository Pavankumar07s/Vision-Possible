"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

Login class.

This file could not have been written without referencing MIT code from https://github.com/Apollon77/alexa-remote.

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

import asyncio
import base64
import datetime
import hashlib
import http.cookiejar
import logging
import os
import pickle
import re
import secrets
import ssl
from binascii import Error
from collections import defaultdict
from collections.abc import Callable
from http.cookies import BaseCookie, Morsel, SimpleCookie
from json import JSONDecodeError, dumps
from typing import Any
from urllib.parse import urlencode, urlparse
from uuid import uuid4

import aiofiles
import aiohttp
import certifi
import pyotp
from aiofiles import os as aioos
from aiohttp.client_exceptions import ContentTypeError
from bs4 import BeautifulSoup
from requests.cookies import RequestsCookieJar
from simplejson import JSONDecodeError as SimpleJSONDecodeError
from yarl import URL

from .const import APP_NAME, CALL_VERSION, EXCEPTION_TEMPLATE, LOCALE_KEY, USER_AGENT
from .errors import AlexapyPyotpInvalidKey
from .helpers import (
    _catch_all_exceptions,
    delete_cookie,
    hide_email,
    hide_serial,
    obfuscate,
)

_LOGGER = logging.getLogger(__name__)

"""Ensure cookies.Morsel contains "partitioned"
   See: https://github.com/python/cpython/issues/112713
"""
partitioned = {"partitioned": "Partitioned"}
Morsel._reserved.update(partitioned)
Morsel._flags.add("partitioned")
_LOGGER.debug(
    "http.cookies patch: Morsel._reserved: %s; Morsel._flags: %s",
    partitioned,
    Morsel._flags,
)


def create_alexa_context() -> ssl.SSLContext:
    """Create an SSL context for Alexa."""
    context = ssl.create_default_context(
        purpose=ssl.Purpose.SERVER_AUTH, cafile=certifi.where()
    )
    return context


_SSL_CONTEXT = create_alexa_context()


class AlexaLogin:
    """Class to handle login connection to Alexa. This class will not reconnect.

    Args:
    url (string): Localized Amazon domain (e.g., amazon.com)
    email (string): Amazon login account
    password (string): Password for Amazon login account
    outputpath (function): Local path with write access for storing files
    debug (boolean): Enable additional debugging including debug file creation
    otp_secret (string): TOTP Secret key for automatic 2FA filling
    uuid: (string): Unique 32 char hex to serve as app serial number for registration

    """

    def __init__(
        self,
        url: str,
        email: str,
        password: str,
        outputpath: Callable[[str], str],
        debug: bool = False,
        otp_secret: str = "",
        oauth: dict[Any, Any] | None = None,
        uuid: str | None = None,
        oauth_login: bool = True,
    ) -> None:
        """Set up initial connection and log in."""
        oauth = oauth or {}

        self._hass_domain: str = "alexa_media"
        self._prefix: str = "https://alexa."
        self._url: str = url
        self._email: str = email
        self._password: str = password
        self._session: aiohttp.ClientSession | None = None
        self._ssl = _SSL_CONTEXT
        self._headers: dict[str, str] = {}
        self._data: dict[str, str] | None = None
        self.status: dict[str, str | bool] | None = {}
        self.stats: dict[str, str | int | datetime.datetime] | None = {
            "login_timestamp": datetime.datetime(1, 1, 1),
            "api_calls": 0,
        }
        self._outputpath = outputpath
        self._cookiefile: list[str] = [
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f"{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.txt"),
        ]
        self._debugpost: str = outputpath(f"{self._hass_domain}{email}post.html")
        self._debugget: str = outputpath(f"{self._hass_domain}{email}get.html")
        self._lastreq: aiohttp.ClientResponse | None = None
        self._debug: bool = debug
        self._links: dict[str, tuple[str, str]] | None = {}
        self._options: dict[str, str] | None = {}
        self._site: str | None = None
        self._close_requested = False
        self._customer_id: str | None = None
        self._totp: pyotp.TOTP | None = None
        self.set_totp(otp_secret.replace(" ", ""))
        self.access_token: str | None = oauth.get("access_token")
        self.refresh_token: str | None = oauth.get("refresh_token")
        self.mac_dms: str | None = oauth.get("mac_dms")
        self.expires_in: float | None = oauth.get("expires_in")
        self._oauth_lock: asyncio.Lock = asyncio.Lock()
        self.uuid = (
            uuid if uuid else uuid4().hex.upper()
        )  # needed to be unique but repeateable for device registration
        self.deviceid: str = (
            self.uuid.encode() + b"23413249564c5635564d32573831"
        ).hex()
        self.code_verifier: str = oauth.get(
            "code_verifier",
            base64.urlsafe_b64encode(secrets.token_bytes(32)).rstrip(b"=").decode(),
        )
        self.code_challenge: str = oauth.get(
            "code_challenge",
            base64.urlsafe_b64encode(
                hashlib.sha256(self.code_verifier.encode()).digest()
            )
            .rstrip(b"=")
            .decode(),
        )
        self.authorization_code: str | None = oauth.get("authorization_code")
        self.oauth_login: bool = oauth_login
        self.csrf_token: str | None = None
        self.csrf_token_created_at: int | None = None
        self.proxy_url: str = ""
        _LOGGER.debug(
            "Login created for %s - %s",
            hide_email(self.email),
            self.url,
        )
        self._create_session()

    @property
    def email(self) -> str:
        """Return email or mobile account for this Login."""
        return self._email

    @email.setter
    def email(self, value: str | None) -> None:
        """Set email."""
        self._email = value

    @property
    def password(self) -> str:
        """Return password for this Login."""
        return self._password

    @password.setter
    def password(self, value: str | None) -> None:
        """Set password."""
        self._password = value

    @property
    def customer_id(self) -> str | None:
        """Return customer_id for this Login."""
        return self._customer_id

    @customer_id.setter
    def customer_id(self, value: str | None) -> None:
        self._customer_id = value

    @property
    def session(self) -> aiohttp.ClientSession | None:
        """Return session for this Login."""
        return self._session

    @property
    def url(self) -> str:
        """Return url for this Login."""
        return self._url

    @property
    def start_url(self) -> URL:
        """Return start url for this Login."""
        if self.oauth_login:
            site: URL = URL("https://www.amazon.com/ap/register")
            query = {
                "openid.return_to": "https://www.amazon.com/ap/maplanding",
                "openid.assoc_handle": "amzn_dp_project_dee_ios",
                "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
                "pageId": "amzn_dp_project_dee_ios",
                "accountStatusPolicy": "P1",
                "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
                "openid.mode": "checkid_setup",
                "openid.ns.oa2": "http://www.amazon.com/ap/ext/oauth/2",
                "openid.oa2.client_id": f"device:{self.deviceid}",
                "openid.ns.pape": "http://specs.openid.net/extensions/pape/1.0",
                "openid.oa2.response_type": "code",
                "openid.ns": "http://specs.openid.net/auth/2.0",
                "openid.pape.max_auth_age": "0",
                "openid.oa2.scope": "device_auth_access offline_access",
                "openid.oa2.code_challenge_method": "S256",
                "openid.oa2.code_challenge": self.code_challenge,
                "language": (
                    LOCALE_KEY.get(self.url.replace("amazon", ""))
                    if LOCALE_KEY.get(self.url.replace("amazon", ""))
                    else "en_US"
                ),
            }
            site = site.update_query(query)
            _LOGGER.debug("Attempting oauth login to %s", site)
        else:
            site: URL = URL(self._prefix + self.url)
            self._headers["authority"] = f"www.{self._url}"
        return site

    @property
    def lastreq(self) -> aiohttp.ClientResponse | None:
        """Return last response for last request for this Login."""
        return self._lastreq

    @property
    def close_requested(self) -> bool:
        """Return whether this Login has been asked to close."""
        return self._close_requested

    @property
    def links(self) -> str:
        """Return string list of links from last page for this Login."""
        result = ""
        assert self._links is not None
        for key, value in self._links.items():
            result += f"link{key}:{value[0]}\n"
        return result

    def set_totp(self, otp_secret: str) -> pyotp.TOTP | None:
        """Enable a TOTP generator for the login.

        Args
            otp_secret (Text): Secret. If blank, it will remove the TOTP entry.

        Returns
            Optional[pyotp.TOTP]: The pyotp TOTP object

        """
        if otp_secret:
            _LOGGER.debug(
                "Creating TOTP with authenticator app key %s",
                hide_serial(otp_secret),
            )
            try:
                self._totp = pyotp.TOTP(otp_secret)
                self.get_totp_token()
            except Error as ex:
                self._totp = None
                _LOGGER.warning(
                    "Error creating TOTP; %s likely invalid", hide_serial(otp_secret)
                )
                raise AlexapyPyotpInvalidKey(ex) from ex
            except AttributeError:
                self._totp = None
                _LOGGER.warning(
                    "Error creating TOTP; pyotp version likely outdated",
                )
        else:
            self._totp = None
        return self._totp

    def get_totp_token(self) -> str:
        """Generate Timed based OTP token.

        Returns
            Text: OTP for current time.

        """
        if self._totp:
            token: str = self._totp.now()
            _LOGGER.debug(
                "Generated OTP: %s",
                token[:2] + "**" + token[4:],
             )
            return token
        _LOGGER.debug("Unable to generate OTP; 2FA app key not configured")
        return ""

    async def load_cookie(self, cookies_txt: str = "") -> dict[str, str] | None:  # noqa: PLR0915
        """Load cookie from disk."""
        cookies: RequestsCookieJar | http.cookiejar.MozillaCookieJar | None = None
        return_cookies = {}
        numcookies: int = 0
        loaded: bool = False
        if self._cookiefile:
            if cookies_txt:
                _LOGGER.debug(
                    "Saving passed in cookie to %s\n%s",
                    self._cookiefile[0].replace(self.email, hide_email(self.email)),
                    repr(cookies_txt),
                )
                async with aiofiles.open(self._cookiefile[0], mode="w") as localfile:
                    try:
                        await localfile.write(cookies_txt)
                    except (OSError, EOFError, TypeError, AttributeError) as ex:
                        _LOGGER.debug(
                            "Error saving passed in cookie to %s: %s",
                            self._cookiefile[0].replace(
                                self.email,
                                hide_email(self.email),
                            ),
                            EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                        )
            for cookiefile in self._cookiefile:
                _LOGGER.debug(
                    "Searching for cookies from %s",
                     cookiefile.replace(self.email, hide_email(self.email)),
                )
                if loaded:
                    break
                numcookies = 0
                if not os.path.exists(cookiefile):
                    continue
                if loaded and cookiefile != self._cookiefile[0]:
                    await delete_cookie(cookiefile)
                _LOGGER.debug(
                    "Trying to load cookie from file %s",
                    cookiefile.replace(self.email, hide_email(self.email)),
                )
                try:
                    async with aiofiles.open(cookiefile, "rb") as myfile:
                        cookies = pickle.loads(await myfile.read())
                        if self._debug:
                            _LOGGER.debug(
                                "Pickled cookie loaded: %s %s", type(cookies), cookies
                            )
                except pickle.UnpicklingError:
                    try:
                        cookies = http.cookiejar.MozillaCookieJar(cookiefile)
                        cookies.load(ignore_discard=True, ignore_expires=True)
                        if self._debug:
                            _LOGGER.debug(
                                "Mozilla cookie loaded: %s %s", type(cookies), cookies
                            )
                    except (ValueError, http.cookiejar.LoadError) as ex:
                        _LOGGER.debug(
                            "Cookie %s is truncated: %s",
                            cookiefile.replace(self.email, hide_email(self.email)),
                            EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                        )
                        continue
                except (OSError, EOFError) as ex:
                    _LOGGER.debug(
                        "Error loading cookie from %s: %s",
                        cookiefile.replace(self.email, hide_email(self.email)),
                        EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                    )
                    continue
                if isinstance(cookies, RequestsCookieJar):
                    _LOGGER.debug("Loading RequestsCookieJar")
                    cookies = cookies.get_dict()
                    assert cookies is not None
                    for key, value in cookies.items():
                        if self._debug:
                            _LOGGER.debug('Key: "%s", Value: "%s"', key, value)
                        # skip "partitioned" key so python 3.12 http/cookies.py doesn't throw error # noqa: E501
                        if key != "partitioned":
                            # escape extra quote marks from Requests cookie
                            return_cookies[str(key)] = value.strip('"')
                    numcookies = len(return_cookies)
                elif isinstance(cookies, defaultdict):
                    _LOGGER.debug("Trying to load aiohttpCookieJar to session")
                    cookie_jar: aiohttp.CookieJar = self._session.cookie_jar
                    loop = asyncio.get_event_loop()
                    try:
                        cookie_jar = await loop.run_in_executor(
                            None, cookie_jar.load, cookiefile
                        )
                        return_cookies = self._get_cookies_from_session()
                        numcookies = len(return_cookies)
                    except (
                        OSError,
                        EOFError,
                        TypeError,
                        AttributeError,
                        ValueError,
                    ) as ex:
                        _LOGGER.debug(
                            "Error loading aiohttpcookie from %s: %s",
                            cookiefile,
                            EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                        )
                        # a cookie_jar.load error can corrupt the session
                        # so we must recreate it
                        self._create_session(True)
                elif isinstance(cookies, dict):
                    _LOGGER.debug("Found dict cookie")
                    return_cookies = cookies
                    numcookies = len(return_cookies)
                elif isinstance(cookies, http.cookiejar.MozillaCookieJar):
                    _LOGGER.debug("Found Mozillacookiejar")
                    for cookie in cookies:
                        if self._debug:
                            _LOGGER.debug(
                                "Processing cookie %s expires: %s",
                                cookie,
                                cookie.expires,
                            )
                        # escape extra quote marks from MozillaCookieJar cookie
                        return_cookies[cookie.name] = cookie.value.strip('"')
                    numcookies = len(return_cookies)
                else:
                    _LOGGER.debug("Ignoring unknown file %s", type(cookies))
                if numcookies:
                    _LOGGER.debug("Loaded %s cookies", numcookies)
                    loaded = True
                    if cookiefile != self._cookiefile[0]:
                        _LOGGER.debug(
                            "Migrating old cookiefile to %s ",
                            self._cookiefile[0].replace(
                                self.email,
                                hide_email(self.email),
                            ),
                        )
                        try:
                            await aioos.rename(cookiefile, self._cookiefile[0])
                        except (OSError, EOFError, TypeError, AttributeError) as ex:
                            _LOGGER.debug(
                                "Error moving cookie from %s to %s: %s",
                                cookiefile.replace(self.email, hide_email(self.email)),
                                self._cookiefile[0].replace(
                                    self.email,
                                    hide_email(self.email),
                                ),
                                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                            )
        return return_cookies

    async def close(self) -> None:
        """Close connection for login."""
        self._close_requested = True
        if self._session and not self._session.closed:
            if self._session._connector_owner:
                assert self._session._connector is not None
                await self._session._connector.close()
            self._session._connector = None

    async def reset(self) -> None:
        """Remove data related to existing login."""
        _LOGGER.debug("Resetting Login for %s - %s", hide_email(self.email), self.url)
        await self.close()
        self._session = None
        self._data = None
        self._lastreq = None
        self.status = {}
        self._links = {}
        self._options = {}
        self._site = None
        self._create_session()
        self._close_requested = False

        for cookiefile in self._cookiefile:
            if (cookiefile) and os.path.exists(cookiefile):
                await delete_cookie(cookiefile)

    @classmethod
    def get_inputs(cls, soup: BeautifulSoup, searchfield=None) -> dict[str, str]:
        """Parse soup for form with searchfield."""
        searchfield = searchfield or {"name": "signIn"}
        data = {}
        form = soup.find("form", searchfield)
        if not form:
            form = soup.find("form")
        for field in form.find_all("input"):
            try:
                data[field["name"]] = ""
                if field["type"] and field["type"] == "hidden":
                    data[field["name"]] = field["value"]
            except BaseException:
                pass
        return data

    async def test_loggedin(self, cookies: dict[str, str] | None = None) -> bool:
        """Function that will test the connection is logged in.

        Tests:
        - Attempts to get authentication and compares to expected login email
        Returns false if unsuccessful getting json or the emails don't match
        Returns false if no csrf found; necessary to issue commands
        """
        if self._debug:
            _LOGGER.debug("Testing whether logged in to alexa.%s", self._url)
            _LOGGER.debug("Cookies: %s", cookies)
            _LOGGER.debug("Session Cookies:\n%s", self._print_session_cookies())
            _LOGGER.debug("Header: %s", dumps(self._headers))
        if not self._session:
            self._create_session()
        await self.get_tokens()
        await self.register_capabilities()
        await self.exchange_token_for_cookies()
        await self.get_csrf()
        path = (
            self._prefix
            + "amazon.com"
            + f"/api/users/me?platform=ios&version={CALL_VERSION}"
        )
        self._log_cookies_for_url(path)
        get_resp = await self._session.get(
            path,
            cookies=cookies,
            ssl=self._ssl,
        )
        email = None
        json = None
        await self._process_resp(get_resp)
        try:
            json = await get_resp.json()
            email = json.get("email")
        except (JSONDecodeError, SimpleJSONDecodeError, ContentTypeError) as ex:
            _LOGGER.debug(
                "Not logged in: %s",
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            if self.url.lower() == "amazon.com":
                return False
        # Convert from amazon.com domain to native domain
        if self.url.lower() != "amazon.com":
            self._headers["authority"] = f"www.{self._url}"
            path = (
                self._prefix
                + self._url
                + f"/api/users/me?platform=ios&version={CALL_VERSION}"
            )
            self._log_cookies_for_url(path)
            get_resp = await self._session.get(path)
            await self._process_resp(get_resp)
            try:
                json = await get_resp.json()
                email = json.get("email")
            except (JSONDecodeError, SimpleJSONDecodeError, ContentTypeError) as ex:
                _LOGGER.debug(
                    "Not logged in: %s",
                    EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                )
                return False
        self.customer_id = json.get("id")
        if (email and email.lower() == self.email.lower()) or "@" not in self.email:
            if "@" in self.email:
                _LOGGER.debug(
                    "Logged in as %s to %s with id: %s",
                    hide_email(email),
                    self.url,
                    self.customer_id,
                )
            else:
                _LOGGER.debug(
                    "Logged in as to %s mobile account %s with %s",
                    hide_email(email),
                    self.url,
                    self.customer_id,
                )
            self.stats["login_timestamp"] = datetime.datetime.now()
            self.stats["api_calls"] = 0
            await self.check_domain()
            await self.finalize_login()
            return True
        _LOGGER.debug(
            "Not logged in due to email mismatch to stored %s", hide_email(email)
        )
        await self.reset()
        return False

    async def get_csrf_token(self) -> str | None:
        """Get an anti-CSRF token from an Amazon webpage."""
        _LOGGER.debug("Getting CSRF token for %s", self._url)
        resp = await self._session.get(
            f"https://www.{self._url}/alexa-privacy/apd/rvh",
            headers=self._headers,
            ssl=self._ssl,
        )
        t = await resp.text()
        bso = BeautifulSoup(t, "html.parser")
        meta_tag = bso.find("meta", attrs={"name": "csrf-token"})
        if meta_tag and "content" in meta_tag.attrs:
            token = meta_tag["content"]
            _LOGGER.debug("CSRF token found for %s: %s", self._url, token)
            self.csrf_token = token
            self.csrf_token_created_at = int(datetime.datetime.now().timestamp())
            return token
        _LOGGER.debug("No CSRF token found for %s", self._url)
        return None

    def _create_session(self, force=False) -> None:
        if not self._session or force:
            #  define session headers
            if self.oauth_login:
                self._headers = {
                    "User-Agent": USER_AGENT,
                    # "User-Agent": (
                    #     "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 PitanguiBridge/2.2.345247.0-[HARDWARE=iPhone10_4][SOFTWARE=13.5.1]" # noqa: E501
                    # ),
                    "Accept": ("*/*"),
                    "Accept-Language": "*",
                    "DNT": "1",
                    "Upgrade-Insecure-Requests": "1",
                    # "authority": "www.amazon.com",
                }
            else:
                self._headers = {
                    "User-Agent": (
                        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 PitanguiBridge/2.2.345247.0-[HARDWARE=iPhone10_4][SOFTWARE=13.5.1]"  # noqa: E501
                    ),
                    "Accept": ("*/*"),
                    "Accept-Language": "*",
                    "DNT": "1",
                    "Upgrade-Insecure-Requests": "1",
                }
            #  initiate session
            self._session = aiohttp.ClientSession(headers=self._headers)

    def _get_cookies_from_session(self, site: str = "") -> "BaseCookie[str]":
        """Return cookies from aiohttp session."""
        assert self._session
        if not site:
            site = self.url
        cookies = {}
        cookie_jar = self._session.cookie_jar
        cookies = cookie_jar.filter_cookies(URL(f"https://{site}"))
        return cookies

    def _print_session_cookies(self) -> str:
        result: str = ""
        if not self._session or not self._session.cookie_jar:
            result = "Session cookie jar is empty."
        else:
            for cookie in self._session.cookie_jar:
                result += f"{cookie}\n"
        return result

    @_catch_all_exceptions
    async def login(  # noqa: PLR0915
        self,
        cookies: dict[str, str] | None = None,
        data: dict[str, str | None] | None = None,
    ) -> None:
        """Login to Amazon."""
        data = data or {}
        if cookies:
            _LOGGER.debug("Using cookies to log in")
            if await self.test_loggedin(cookies):
                return
            await self.reset()
        _LOGGER.debug("Using credentials to log in")
        if not self._site:
            site: URL = self.start_url
        else:
            site = self._site
        if not self._session:
            self._create_session()
        #  This will process links which is used for debug only to force going
        #  to other links.  Warning, chrome will cache any link parameters
        #  breaking the configuration flow until refresh on browser.
        digit = None
        for datum, value in data.items():
            if (
                value
                and str(value).startswith("link")
                and len(value) > 4
                and value[4:].isdigit()
            ):
                digit = str(value[4:])
                _LOGGER.debug("Found link selection %s in %s ", digit, datum)
                assert self._links is not None
                if self._links.get(digit):
                    (text, site) = self._links[digit]
                    data[datum] = None
                    _LOGGER.debug("Going to link with text: %s href: %s ", text, site)
                    _LOGGER.debug("%s reset to %s ", datum, data[datum])
        if not digit and self._lastreq is not None:
            assert self._lastreq is not None
            site = str(self._lastreq.url)
            _LOGGER.debug("Loaded last request to %s ", site)
            resp = self._lastreq
        else:
            resp = await self._session.get(
                site, headers=self._headers, ssl=self._ssl, params=self._data
            )
            self._lastreq = resp
            site = await self._process_resp(resp)
        html: str = await resp.text()
        if self._debug:
            async with aiofiles.open(self._debugget, mode="wb") as localfile:
                await localfile.write(await resp.read())
        # This commented block can be used to read a file directly to process.
        # async with aiofiles.open(
        #     "/config/anti-automation-js.html", "rb"
        #     "/config/Amazon-Password-Assistance.html", "rb"
        #     "/config/password_reset_required.html", "rb"
        # ) as myfile:
        #     html = await myfile.read()
        site = await self._process_page(html, site)
        if site is None:
            return
        if not self.status.get("ap_error"):
            missing_params = self._populate_data(site, data)
            if self._debug:
                if missing_params:
                    _LOGGER.debug(
                        "WARNING: Detected missing params: %s",
                        [k for (k, v) in self._data.items() if v == ""],
                    )
                _LOGGER.debug("Session Cookies:\n%s", self._print_session_cookies())
                _LOGGER.debug("Submit Form Data: %s", dumps(obfuscate(self._data)))
                _LOGGER.debug("Header: %s", dumps(self._headers))

            # submit post request with username/password and other needed info
            post_resp = None
            if self.status.get("force_get"):
                if not self.status.get("approval") and not self.status.get(
                    "action_required"
                ):
                    post_resp = await self._session.get(
                        site,
                        params=self._data,
                        headers=self._headers,
                        ssl=self._ssl,
                    )
            else:
                post_resp = await self._session.post(
                    site,
                    data=self._data,
                    headers=self._headers,
                    ssl=self._ssl,
                )

            # headers need to be submitted to have the referer
            if post_resp:
                if self._debug:
                    async with aiofiles.open(self._debugpost, mode="wb") as localfile:
                        await localfile.write(await post_resp.read())
                self._lastreq = post_resp
                site = await self._process_resp(post_resp)
                self._site = await self._process_page(await post_resp.text(), site)

    async def save_cookiefile(self) -> None:
        """Save login session cookies to file."""
        self._cookiefile = [
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f"{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.txt"),
        ]
        for cookiefile in self._cookiefile:
            if cookiefile == self._cookiefile[0]:
                cookie_jar = self._session.cookie_jar
                assert isinstance(cookie_jar, aiohttp.CookieJar)
                if self._debug:
                    _LOGGER.debug("Saving cookie to %s", cookiefile)
                loop = asyncio.get_event_loop()
                try:
                    await loop.run_in_executor(
                        None, cookie_jar.save, self._cookiefile[0]
                    )
                except (OSError, EOFError, TypeError, AttributeError) as ex:
                    _LOGGER.debug(
                        "Error saving pickled cookie to %s: %s",
                        self._cookiefile[0].replace(self.email, hide_email(self.email)),
                        EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                    )
            elif (cookiefile) and os.path.exists(cookiefile):
                _LOGGER.debug(
                    "Removing outdated cookiefile %s",
                    cookiefile.replace(self.email, hide_email(self.email)),
                )
                await delete_cookie(cookiefile)
        if self._debug:
            _LOGGER.debug("Session Cookies:\n%s", self._print_session_cookies())

    async def delete_cookiefile(self) -> None:
        """Delete cookiefile."""
        self._cookiefile = [
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f"{self._hass_domain}.{self.email}.pickle"),
            self._outputpath(f".storage/{self._hass_domain}.{self.email}.txt"),
        ]
        for cookiefile in self._cookiefile:
            if cookiefile == self._cookiefile[0]:
                try:
                    await delete_cookie(cookiefile)
                except (OSError, EOFError, TypeError, AttributeError) as ex:
                    _LOGGER.debug(
                        "Error deleting cookiefile %s: %s",
                        self._cookiefile[0].replace(self.email, hide_email(self.email)),
                        EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
                    )
        if self._debug:
            _LOGGER.debug(
                "Deleted:\n%s",
                self._cookiefile.replace(self.email, hide_email(self.email))
            )

    async def get_tokens(self) -> bool:
        """Get access and refresh tokens after registering device using cookies.

        Returns:
            bool: True if successful.
        """
        frc = base64.b64encode(secrets.token_bytes(313)).decode("ascii").rstrip("=")
        map_md_raw = {
            "device_user_dictionary": [],
            "device_registration_data": {"software_version": "1"},
            "app_identifier": {
                "app_version": CALL_VERSION,
                "bundle_id": "com.amazon.echo",
            },
        }
        map_md = base64.b64encode(dumps(map_md_raw).encode()).decode().rstrip("=")

        if self.url.lower() != "amazon.com":
            urls = [self.url, "amazon.com"]
        else:
            urls = [self.url]
        registered = False
        for url in urls:
            cookies = self._get_cookies_from_session(f"https://{url}")
            cookies["frc"] = frc
            cookies["map-md"] = map_md
            headers = {
                "Content-Type": "application/json",
            }
            cookies_list = []
            data = {
                "requested_extensions": ["device_info", "customer_info"],
                "cookies": {"website_cookies": cookies_list, "domain": f".{url}"},
                "registration_data": {
                    "domain": "Device",
                    "app_version": CALL_VERSION,
                    "device_type": "A2IVLV5VM2W81",
                    "device_name": f"%FIRST_NAME%\u0027s%DUPE_STRATEGY_1ST%{APP_NAME}",
                    "os_version": "16.6",
                    "device_serial": self.uuid,
                    "device_model": "iPhone",
                    "app_name": APP_NAME,
                    "software_version": "1",
                },
                "auth_data": {},
                "user_context_map": {"frc": frc},
                "requested_token_type": ["bearer", "mac_dms", "website_cookies"],
            }
            if self.access_token:
                data["auth_data"] = {"access_token": self.access_token}
            elif self.code_verifier and self.authorization_code:
                data["auth_data"] = {
                    "client_id": self.deviceid,
                    "authorization_code": self.authorization_code,
                    "code_verifier": self.code_verifier,
                    "code_algorithm": "SHA-256",
                    "client_domain": "DeviceLegacy",
                }
            _LOGGER.debug("Attempting to register with %s", url)
            try:
                response = await self._session.post(
                    "https://api." + url + "/auth/register",
                    json=data,
                    headers=headers,
                )
            except aiohttp.ClientConnectorError:
                _LOGGER.debug("Fallback attempt to register with api.amazon.com")
                response = await self._session.post(
                    "https://api.amazon.com/auth/register",
                    json=data,
                    headers=headers,
                )
            _LOGGER.debug("auth response %s with \n%s", response, dumps(data))
            if response.status == 200:
                registered = True
                break
        if not registered:
            _LOGGER.debug("Unable to register with %s", urls)
            return False
        response = (await response.json()).get("response")
        if response.get("success"):
            _LOGGER.debug(
                "Successfully registered %s device with Amazon",
                response["success"]["extensions"]["device_info"]["device_name"],
            )
            if self._debug:
                _LOGGER.debug("Received registration data:\n%s", dumps(response))
            self.refresh_token = response["success"]["tokens"]["bearer"][
                "refresh_token"
            ]
            self.mac_dms = response["success"]["tokens"]["mac_dms"]
            old = self.access_token
            self.access_token = response["success"]["tokens"]["bearer"]["access_token"]
            self.expires_in = datetime.datetime.now().timestamp() + int(
                response["success"]["tokens"]["bearer"]["expires_in"]
            )
            if old != self.access_token:
                _LOGGER.debug(
                    "New access token(%s) received which expires at %s in %s",
                    len(self.access_token),
                    datetime.datetime.fromtimestamp(self.expires_in),
                    datetime.datetime.fromtimestamp(self.expires_in)
                    - datetime.datetime.now(),
                )
            return True
        return False

    async def register_capabilities(self) -> bool:
        """Register capabilities of virtual device.

        Required for HTTP2/Push.
        https://developer.amazon.com/en-US/docs/alexa/alexa-voice-service/capabilities-api.html

        Returns
            bool: Return True if successful.

        """
        data = {
            "legacyFlags": {
                "SUPPORTS_COMMS": True,
                "SUPPORTS_ARBITRATION": True,
                "SCREEN_WIDTH": 1170,
                "SUPPORTS_SCRUBBING": True,
                "SPEECH_SYNTH_SUPPORTS_TTS_URLS": False,
                "SUPPORTS_HOME_AUTOMATION": True,
                "SUPPORTS_DROPIN_OUTBOUND": True,
                "FRIENDLY_NAME_TEMPLATE": "VOX",
                "SUPPORTS_SIP_OUTBOUND_CALLING": True,
                "VOICE_PROFILE_SWITCHING_DISABLED": True,
                "SUPPORTS_LYRICS_IN_CARD": False,
                "SUPPORTS_DATAMART_NAMESPACE": "Vox",
                "SUPPORTS_VIDEO_CALLING": True,
                "SUPPORTS_PFM_CHANGED": True,
                "SUPPORTS_TARGET_PLATFORM": "TABLET",
                "SUPPORTS_SECURE_LOCKSCREEN": False,
                "AUDIO_PLAYER_SUPPORTS_TTS_URLS": False,
                "SUPPORTS_KEYS_IN_HEADER": False,
                "SUPPORTS_MIXING_BEHAVIOR_FOR_AUDIO_PLAYER": False,
                "AXON_SUPPORT": True,
                "SUPPORTS_TTS_SPEECHMARKS": True,
            },
            "envelopeVersion": "20160207",
            "capabilities": [
                {
                    "version": "0.1",
                    "interface": "CardRenderer",
                    "type": "AlexaInterface",
                },
                {"interface": "Navigation", "type": "AlexaInterface", "version": "1.1"},
                {
                    "type": "AlexaInterface",
                    "version": "2.0",
                    "interface": "Alexa.Comms.PhoneCallController",
                },
                {
                    "type": "AlexaInterface",
                    "version": "1.1",
                    "interface": "ExternalMediaPlayer",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alerts",
                    "configurations": {
                        "maximumAlerts": {"timers": 2, "overall": 99, "alarms": 2}
                    },
                    "version": "1.3",
                },
                {
                    "version": "1.0",
                    "interface": "Alexa.Display.Window",
                    "type": "AlexaInterface",
                    "configurations": {
                        "templates": [
                            {
                                "type": "STANDARD",
                                "id": "app_window_template",
                                "configuration": {
                                    "sizes": [
                                        {
                                            "id": "fullscreen",
                                            "type": "DISCRETE",
                                            "value": {
                                                "value": {
                                                    "height": 1440,
                                                    "width": 3200,
                                                },
                                                "unit": "PIXEL",
                                            },
                                        }
                                    ],
                                    "interactionModes": ["mobile_mode", "auto_mode"],
                                },
                            }
                        ]
                    },
                },
                {
                    "type": "AlexaInterface",
                    "interface": "AccessoryKit",
                    "version": "0.1",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.AudioSignal.ActiveNoiseControl",
                    "version": "1.0",
                    "configurations": {
                        "ambientSoundProcessingModes": [
                            {"name": "ACTIVE_NOISE_CONTROL"},
                            {"name": "PASSTHROUGH"},
                        ]
                    },
                },
                {
                    "interface": "PlaybackController",
                    "type": "AlexaInterface",
                    "version": "1.0",
                },
                {"version": "1.0", "interface": "Speaker", "type": "AlexaInterface"},
                {
                    "version": "1.0",
                    "interface": "SpeechSynthesizer",
                    "type": "AlexaInterface",
                },
                {
                    "version": "1.0",
                    "interface": "AudioActivityTracker",
                    "type": "AlexaInterface",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.Camera.LiveViewController",
                    "version": "1.0",
                },
                {
                    "type": "AlexaInterface",
                    "version": "1.0",
                    "interface": "Alexa.Input.Text",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.PlaybackStateReporter",
                    "version": "1.0",
                },
                {
                    "version": "1.1",
                    "interface": "Geolocation",
                    "type": "AlexaInterface",
                },
                {
                    "interface": "Alexa.Health.Fitness",
                    "version": "1.0",
                    "type": "AlexaInterface",
                },
                {"interface": "Settings", "type": "AlexaInterface", "version": "1.0"},
                {
                    "configurations": {
                        "interactionModes": [
                            {
                                "dialog": "SUPPORTED",
                                "interactionDistance": {"value": 18, "unit": "INCHES"},
                                "video": "SUPPORTED",
                                "keyboard": "SUPPORTED",
                                "id": "mobile_mode",
                                "uiMode": "MOBILE",
                                "touch": "SUPPORTED",
                            },
                            {
                                "video": "UNSUPPORTED",
                                "dialog": "SUPPORTED",
                                "interactionDistance": {"value": 36, "unit": "INCHES"},
                                "uiMode": "AUTO",
                                "touch": "SUPPORTED",
                                "id": "auto_mode",
                                "keyboard": "UNSUPPORTED",
                            },
                        ]
                    },
                    "type": "AlexaInterface",
                    "interface": "Alexa.InteractionMode",
                    "version": "1.0",
                },
                {
                    "type": "AlexaInterface",
                    "configurations": {
                        "catalogs": [
                            {
                                "type": "IOS_APP_STORE",
                                "identifierTypes": [
                                    "URI_HTTP_SCHEME",
                                    "URI_CUSTOM_SCHEME",
                                ],
                            }
                        ]
                    },
                    "version": "0.2",
                    "interface": "Alexa.Launcher",
                },
                {"interface": "System", "version": "1.0", "type": "AlexaInterface"},
                {
                    "interface": "Alexa.IOComponents",
                    "type": "AlexaInterface",
                    "version": "1.4",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.FavoritesController",
                    "version": "1.0",
                },
                {
                    "version": "1.0",
                    "type": "AlexaInterface",
                    "interface": "Alexa.Mobile.Push",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "InteractionModel",
                    "version": "1.1",
                },
                {
                    "interface": "Alexa.PlaylistController",
                    "type": "AlexaInterface",
                    "version": "1.0",
                },
                {
                    "interface": "SpeechRecognizer",
                    "type": "AlexaInterface",
                    "version": "2.1",
                },
                {
                    "interface": "AudioPlayer",
                    "type": "AlexaInterface",
                    "version": "1.3",
                },
                {
                    "type": "AlexaInterface",
                    "version": "3.1",
                    "interface": "Alexa.RTCSessionController",
                },
                {
                    "interface": "VisualActivityTracker",
                    "version": "1.1",
                    "type": "AlexaInterface",
                },
                {
                    "interface": "Alexa.PlaybackController",
                    "version": "1.0",
                    "type": "AlexaInterface",
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.SeekController",
                    "version": "1.0",
                },
                {
                    "interface": "Alexa.Comms.MessagingController",
                    "type": "AlexaInterface",
                    "version": "1.0",
                },
            ],
        }
        headers = {
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US",
            "Accept-Charset": "utf-8",
            "Connection": "keep-alive",
            "Content-type": "application/json; charset=UTF-8",
            "authorization": f"Bearer {self.access_token}",
        }

        response = await self._session.put(
            "https://api.amazonalexa.com/v1/devices/@self/capabilities",
            json=data,
            headers=headers,
        )
        _LOGGER.debug(
            "capabilities response %s with \n%s\n%s",
            response,
            dumps(data),
            dumps(headers),
        )
        if response.status != 204:
            if self._debug:
                _LOGGER.debug(
                    "Failed to register capabilities: %s\n%s",
                    response,
                    await response.text(),
                )
            else:
                _LOGGER.debug("Failed to register capabilities")
            return False
        return True

    async def refresh_access_token(self) -> bool:
        """Refresh access token and expires in using refresh token.

        Returns
            bool: Return true if successful.

        """
        if not self.refresh_token:
            _LOGGER.debug("No refresh token found to get access_token")
            return False
        data = {
            "app_name": APP_NAME,
            "app_version": CALL_VERSION,
            "di.sdk.version": "6.12.4",
            "source_token": self.refresh_token,
            "package_name": "com.amazon.echo",
            "di.hw.version": "iPhone",
            "platform": "iOS",
            "requested_token_type": "access_token",
            "source_token_type": "refresh_token",
            "di.os.name": "iOS",
            "di.os.version": "16.6",
            "current_version": "6.12.4",
            "previous_version": "6.12.4",
        }
        try:
            response = await self._session.post(
                "https://api." + self.url + "/auth/token",
                data=data,
            )
        except aiohttp.ClientConnectionError:
            _LOGGER.debug(
                "Fallback attempt to refresh access token with api.amazon.com"
            )
            response = await self._session.post(
                "https://api.amazon.com/auth/token",
                data=data,
            )
        _LOGGER.debug("refresh response %s with \n%s", response, dumps(data))
        if response.status != 200:
            if self._debug:
                _LOGGER.debug("Failed to refresh access token: %s", response)
            else:
                _LOGGER.debug("Failed to refresh access token")
            return False
        response = await response.json()
        if self._debug:
            _LOGGER.debug("Refresh token json:\n%s ", response)
        if response.get("access_token"):
            self.access_token = response.get("access_token")
            self.expires_in = datetime.datetime.now().timestamp() + int(
                response.get("expires_in")
            )
            _LOGGER.debug(
                "Successfully refreshed access_token(%s) which expires at %s in %s",
                len(self.access_token),
                datetime.datetime.fromtimestamp(self.expires_in),
                datetime.datetime.fromtimestamp(self.expires_in)
                - datetime.datetime.now(),
            )
            return True
        return False

    async def exchange_token_for_cookies(self) -> bool:
        """Generate new session cookies using refresh token.

        Returns
            bool: True if successful

        """
        if not self.refresh_token:
            _LOGGER.debug("No refresh token found to get access token")
            return False
        data = {
            "app_name": APP_NAME,
            "app_version": CALL_VERSION,
            "di.sdk.version": "6.12.4",
            "domain": f".{self.url}",
            "source_token": self.refresh_token,
            "package_name": "com.amazon.echo",
            "di.hw.version": "iPhone",
            "platform": "iOS",
            "requested_token_type": "auth_cookies",
            "source_token_type": "refresh_token",
            "di.os.name": "iOS",
            "di.os.version": "16.6",
            "current_version": "6.12.4",
            "previous_version": "6.12.4",
        }
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        try:
            response = await self._session.post(
                "https://www." + self.url + "/ap/exchangetoken/cookies",
                data=data,
                headers=headers,
            )
        except aiohttp.ClientConnectorError:
            _LOGGER.debug("Fallback attempt to exchange tokens with www.amazon.com")
            response = await self._session.post(
                "https://www.amazon.com/ap/exchangetoken/cookies",
                data=data,
                headers=headers,
            )
        if response.status != 200:
            if self._debug:
                _LOGGER.debug(
                    "Failed to exchange cookies for refresh token: %s", response
                )
            else:
                _LOGGER.debug("Failed to exchange cookies for refresh token")
            return False
        response = (await response.json()).get("response")
        if self._debug:
            _LOGGER.debug("Exchange cookie json %s ", response)
        success = False
        for domain, cookies in response["tokens"]["cookies"].items():
            # _LOGGER.debug("updating %s with %s", domain, cookies)
            for item in cookies:
                raw_cookie = SimpleCookie()
                cookie_name = item["Name"]
                cookie_value = item["Value"]
                raw_cookie[cookie_name] = (
                    cookie_value
                    if not (cookie_value.startswith('"') and cookie_value.endswith('"'))
                    # Strings are returned within quotations, strip them
                    else cookie_value[1:-1]
                )
                raw_cookie[cookie_name]["domain"] = domain
                raw_cookie[cookie_name]["path"] = item["Path"]
                raw_cookie[cookie_name]["secure"] = item["Secure"]
                raw_cookie[cookie_name]["expires"] = item["Expires"]
                raw_cookie[cookie_name]["httpOnly"] = item["HttpOnly"]
                _LOGGER.debug("updating jar with cookie %s", raw_cookie)
                self._session.cookie_jar.update_cookies(raw_cookie, URL(domain))
            _LOGGER.info(
                "Exchanged refresh token for %s %s cookies: %s",
                len(cookies),
                domain,
                [c["Name"] for c in cookies],
            )
            success = True
        return success

    def _log_cookies_for_url(self, path):
        """Log a debug message with the names of the session cookies for a given URL."""
        cookies = self._session.cookie_jar.filter_cookies(path)
        _LOGGER.debug(
            "Session cookies for '%s': %s", path, [name for name, _ in cookies.items()]
        )

    async def get_csrf(self) -> bool:
        """Generate csrf if missing.

        Returns
            bool: True if csrf is found

        """
        cookies = self._get_cookies_from_session()
        if cookies.get("csrf"):
            _LOGGER.debug("CSRF already exists; no need to discover")
            return True
        _LOGGER.debug("Attempting to discover CSRF token")
        csrf_urls = [
            "/spa/index.html",
            "/api/language",
            "/api/devices-v2/device?cached=false",
            "/templates/oobe/d-device-pick.handlebars",
            "/api/strings",
        ]
        for url in csrf_urls:
            failed = False
            response = None
            try:
                path = f"{self._prefix}{self.url}{url}"
                self._log_cookies_for_url(path)
                response = await self._session.get(path)
            except aiohttp.ClientConnectionError:
                failed = True
            if failed or (response and response.status != 200):
                if self._debug:
                    _LOGGER.debug("Unable to load page for csrf: %s", response)
                continue
            cookies = self._get_cookies_from_session()
            if cookies.get("csrf"):
                _LOGGER.debug("CSRF token found from %s", url)
                return True
            _LOGGER.debug("CSRF token not found from %s", url)
        _LOGGER.debug("No csrf token found")
        return False

    async def check_domain(self) -> bool:
        """Check whether logged into appropriate login domain.

        Returns
            bool: True if in correct domain

        """
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Charset": "utf-8",
            "x-amzn-identity-auth-domain": f"api.{self.url}",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US",
        }
        response = await self._session.get(
            f"{self._prefix}{self.url}/api/users/me?platform=ios&version={CALL_VERSION}",
            headers=headers,
        )
        if response.status != 200:
            if self._debug:
                _LOGGER.debug("Unable to check for domain; proceeding:\n%s", response)
            return True
        try:
            response = await response.json(content_type=None)
        except JSONDecodeError:
            if self._debug:
                _LOGGER.debug("Unable to check for domain; proceeding:\n%s", response)
            return True
        domain = URL(response.get("marketPlaceDomainName")).host.replace("www.", "", 1)
        if self.url != domain:
            _LOGGER.warning(
                "Domain %s does not match reported account domain %s; functionality is not likely to work, please fix",  # noqa: E501
                self.url,
                domain,
            )
            return False
        _LOGGER.debug("Domain %s matches reported account domain: %s", self.url, domain)
        return True

    async def _process_resp(self, resp) -> str:
        if resp.history:
            for item in resp.history:
                _LOGGER.debug("%s: redirected from\n%s", item.method, item.url)
            self._headers["Referer"] = str(resp.url)
        url = str(resp.request_info.url)
        method = resp.request_info.method
        status = resp.status
        reason = resp.reason
        headers = resp.request_info.headers
        if self._debug:
            _LOGGER.debug(
                "%s: \n%s with\n%s\n returned %s:%s with response %s",
                method,
                url,
                headers,
                status,
                reason,
                resp.headers,
            )
        else:
            _LOGGER.debug(
                "%s: \n%s returned %s:%s with response %s",
                method,
                url,
                status,
                reason,
                resp.headers,
            )
        self._headers["Referer"] = str(url)
        return url

    async def _process_page(self, html: str, site: str) -> str | None:  # noqa: PLR0915
        """Process html to set login.status and find form post url."""

        def find_links() -> None:
            links = {}
            index = 0
            if links_tag:
                for link in links_tag:
                    if not link.string:
                        continue
                    string = link.string.strip()
                    href = link["href"]
                    # _LOGGER.debug("Found link: %s <%s>",
                    #               string,
                    #               href)
                    if href.startswith("/"):
                        links[str(index)] = (string, (self._prefix + self.url + href))
                        index += 1
                    elif href.startswith("http"):
                        links[str(index)] = (string, href)
                        index += 1
            if forms_tag:
                for form in forms_tag:
                    if (
                        form.get("method")
                        and form.get("method") == "get"
                        and form.get("action")
                    ):
                        string = form.get("id")
                        action = form.get("action")
                        params = {}
                        inputs = form.findAll("input")
                        for item in inputs:
                            if (
                                item
                                and item.get("type")
                                and item.get("type") == "hidden"
                            ):
                                params[item.get("name")] = item.get("value")
                        href = f"{self._prefix}{self.url}{action}?{urlencode(params)}"
                        links[str(index)] = (string, href)
                        index += 1
            if links:
                _LOGGER.debug("Links: %s", links)
            self._links = links

        _LOGGER.debug("Processing %s", site)
        site_url = URL(site)
        soup: BeautifulSoup = BeautifulSoup(html, "html.parser")

        status: dict[str, str | bool] = {}

        #  Find tags to determine which path
        login_tag = soup.find("form", {"name": "signIn"})
        captcha_tag = soup.find(id="auth-captcha-image")
        securitycode_tag = soup.find(id="auth-mfa-otpcode")
        errorbox = (
            soup.find(id="auth-error-message-box")
            if soup.find(id="auth-error-message-box")
            else soup.find(id="auth-warning-message-box")
        )
        claimspicker_tag = soup.find("form", {"name": "claimspicker"})
        authselect_tag = soup.find("form", {"id": "auth-select-device-form"})
        verificationcode_tag = soup.find("form", {"action": "verify"})
        verification_captcha_tag = soup.find("img", {"alt": "captcha"})
        javascript_authentication_tag = soup.find("form", {"id": "pollingForm"})
        links_tag = soup.findAll("a", href=True)
        forms_tag = soup.findAll("form")
        form_tag = soup.find("form")
        missingcookies_tag = soup.find(id="ap_error_return_home")
        forgotpassword_tag = soup.find("form", {"name": "forgotPassword"})
        polling_tag = soup.find(id="updatedChannelDetails")
        if self._debug:
            find_links()

        # pull out Amazon error message

        if errorbox:
            error_message = errorbox.find("h4").string
            if error_message is None:
                error_message = "unknown"
            for list_item in errorbox.findAll("li"):
                span_text = list_item.find("span").text
                if span_text:
                    error_message += span_text
            _LOGGER.debug("Error message: %s", error_message)
            status["error_message"] = error_message

        if login_tag and not captcha_tag:
            _LOGGER.debug("Found standard login page")
            #  scrape login page to get all the inputs required for login
            self._data = self.get_inputs(soup, {"name": "signIn"})
        elif captcha_tag is not None:
            _LOGGER.debug("Captcha requested")
            status["captcha_required"] = True
            status["captcha_image_url"] = captcha_tag.get("src")
            self._data = self.get_inputs(soup)

        elif securitycode_tag is not None:
            _LOGGER.debug("2FA requested")
            status["securitycode_required"] = True
            self._data = self.get_inputs(soup, {"id": "auth-mfa-form"})

        elif claimspicker_tag is not None:
            self._options = {}
            index = 0
            claims_message = ""
            options_message = ""
            for div in claimspicker_tag.findAll("div", "a-row"):
                claims_message += f"{div.text}\n"
            for label in claimspicker_tag.findAll("label"):
                value = (
                    (label.find("input")["value"]).strip()
                    if label.find("input")
                    else ""
                )
                message = (
                    (label.find("span").string).strip() if label.find("span") else ""
                )
                valuemessage = (
                    (f"* **`{index}`**:\t `{value} - {message}`.\n")
                    if value != ""
                    else ""
                )
                options_message += valuemessage
                if value:
                    self._options[str(index)] = value
                    index += 1
            _LOGGER.debug(
                "Verification method requested: %s, %s", claims_message, options_message
            )
            status["claimspicker_required"] = True
            status["claimspicker_message"] = options_message
            self._data = self.get_inputs(soup, {"name": "claimspicker"})
        elif authselect_tag is not None:
            self._options = {}
            index = 0
            authselect_message = ""
            authoptions_message = ""
            for div in soup.findAll("div", "a-box-inner"):
                if div.find("p"):
                    authselect_message += f"{div.find('p').string}\n"
            for label in authselect_tag.findAll("label"):
                value = (
                    (label.find("input")["value"]).strip()
                    if label.find("input")
                    else ""
                )
                message = (
                    (label.find("span").string).strip() if label.find("span") else ""
                )
                valuemessage = (f"{index}:\t{message}\n") if value != "" else ""
                authoptions_message += valuemessage
                if value:
                    self._options[str(index)] = value
                    index += 1
            _LOGGER.debug(
                "OTP method requested: %s%s", authselect_message, authoptions_message
            )
            status["authselect_required"] = True
            status["authselect_message"] = authoptions_message
            self._data = self.get_inputs(soup, {"id": "auth-select-device-form"})
        elif verification_captcha_tag is not None:
            _LOGGER.debug("Verification captcha code requested:")
            status["captcha_required"] = True
            status["captcha_image_url"] = verification_captcha_tag.get("src")
            status["verification_captcha_required"] = True
            self._data = self.get_inputs(soup, {"action": "verify"})
        elif verificationcode_tag is not None:
            _LOGGER.debug("Verification code requested:")
            status["verificationcode_required"] = True
            self._data = self.get_inputs(soup, {"action": "verify"})
        elif missingcookies_tag is not None and site_url.path != "/ap/maplanding":
            _LOGGER.debug("Error page detected:")
            href = ""
            links = missingcookies_tag.findAll("a", href=True)
            for link in links:
                href = link["href"]
            status["ap_error"] = True
            status["force_get"] = True
            status["ap_error_href"] = href
        elif javascript_authentication_tag:
            message: str = ""

            message = soup.find("span").getText()
            for div in soup.findAll("div", {"id": "channelDetails"}):
                message += div.getText()
            status["force_get"] = True
            status["message"] = re.sub("(\\s)+", "\\1", message)
            status["action_required"] = True
            _LOGGER.debug("Javascript Authentication page detected: %s", message)
        elif forgotpassword_tag or soup.find("input", {"name": "OTPChallengeOptions"}):
            status["message"] = (
                "Forgot password page detected; "
                "Amazon has detected too many failed logins. "
                "Please check to see if Amazon requires any further action. "
                "You may have to wait before retrying."
            )
            status["ap_error"] = True
            _LOGGER.warning(status["message"])
            status["login_failed"] = "forgot_password"
        elif polling_tag:
            status["force_get"] = True
            status["message"] = self.status["message"]
            approval_status = soup.find("input", {"id": "transactionApprovalStatus"})
            _LOGGER.debug(
                "Polling page detected: %s with %s", polling_tag, approval_status
            )
            status["approval_status"] = approval_status.get("value")
        else:
            _LOGGER.debug("Captcha/2FA not requested; confirming login.")
            query = site_url.query
            self.access_token = query.get("openid.oa2.access_token")
            if await self.test_loggedin():
                return
            _LOGGER.debug("Login failed; check credentials")
            status["login_failed"] = "login_failed"
            if self._data and "" in self._data.values():
                missing = [k for (k, v) in self._data.items() if v == ""]
                _LOGGER.debug(
                    "If credentials correct, please report these missing values: %s",
                    missing,
                )
        self.status = status
        # determine post url if not logged in
        if status.get("approval_status") == "TransactionCompleted":
            site = self._data.get("openid.return_to")
        elif form_tag and "login_successful" not in status:
            formsite: str = form_tag.get("action")
            if self._debug:
                _LOGGER.debug("Found form to process: %s", form_tag)
            if formsite and formsite == "verify":
                search_results = re.search(r"(.+)/(.*)", str(site))
                assert search_results is not None
                site = search_results.groups()[0] + "/verify"
                _LOGGER.debug("Found post url to verify; converting to %s", site)
            elif formsite and formsite == "get":
                if "ap_error" in status and status.get("ap_error_href"):
                    assert isinstance(status["ap_error_href"], str)
                    site = status["ap_error_href"]
                elif self._headers.get("Referer"):
                    site = self._headers["Referer"]
                else:
                    site = self.start_url
                _LOGGER.debug("Found post url to get; forcing get to %s", site)
                self._lastreq = None
            elif formsite and formsite == "/ap/cvf/approval/poll":
                self._data = self.get_inputs(soup, {"id": "pollingForm"})
                url = urlparse(site)
                site = f"{url.scheme}://{url.netloc}{formsite}"
                # site = form_tag.find("input", {"name": "openid.return_to"}).get("value")  # noqa: E501
                _LOGGER.debug("Found url for polling page %s", site)
            elif formsite and forgotpassword_tag:
                site = self.start_url
                _LOGGER.debug("Restarting login process %s", site)
            elif formsite:
                site = formsite
                _LOGGER.debug("Found post url to %s", site)
        return str(site)

    def _populate_data(self, site: str, data: dict[str, str | None]) -> bool:
        """Populate self._data with info from data."""
        _LOGGER.debug(
            "Preparing form submission to %s with input data: %s", site, obfuscate(data)
        )
        # pull data from configurator
        password: str | None = data.get("password", "")
        captcha: str | None = data.get("captcha", "")
        if data.get("otp_secret"):
            self.set_totp(data.get("otp_secret", ""))
        securitycode: str | None = data.get("securitycode", "")
        if not securitycode and self._totp:
            _LOGGER.debug("No 2FA code supplied but will generate.")
            securitycode = self.get_totp_token()
        claimsoption: str | None = data.get("claimsoption", "")
        authopt: str | None = data.get("authselectoption", "")
        verificationcode: str | None = data.get("verificationcode", "")

        #  add username and password to self._data for post request
        #  self._data is scraped from the form page in _process_page
        #  check if there is an input field
        if self._data:
            if "email" in self._data and self._data["email"] == "":
                self._data["email"] = self._email
                # add the otp to the password if available
            self._data["password"] = (
                self._password + securitycode
                if not password
                else password + securitycode
                if securitycode
                else password
            )
            if "rememberMe" in self._data:
                self._data["rememberMe"] = "true"
            if captcha is not None and "guess" in self._data:
                self._data["guess"] = captcha
            if captcha is not None and "cvf_captcha_input" in self._data:
                self._data["cvf_captcha_input"] = captcha
                self._data["cvf_captcha_captcha_action"] = "verifyCaptcha"
            if securitycode is not None and "otpCode" in self._data:
                self._data["otpCode"] = securitycode
                self._data["rememberDevice"] = "true"
            if claimsoption is not None and "option" in self._data:
                try:
                    self._data["option"] = self._options[str(claimsoption)]
                except KeyError:
                    _LOGGER.debug(
                        "Selected claimspicker option %s not in %s",
                        str(claimsoption),
                        self._options,
                    )
            if authopt is not None and "otpDeviceContext" in self._data:
                try:
                    self._data["otpDeviceContext"] = self._options[str(authopt)]
                except KeyError:
                    _LOGGER.debug(
                        "Selected OTP option %s not in %s",
                        str(authopt),
                        self._options,
                    )
            if verificationcode is not None and "code" in self._data:
                self._data["code"] = verificationcode
            self._data.pop("", None)  # remove '' key
            return "" in self._data.values()  # test if unfilled values
        return False

    async def finalize_login(self) -> None:
        """Perform final steps after successful login."""
        _LOGGER.debug(
            "Login confirmed for %s - %s; saving cookie to %s",
            hide_email(self.email),
            self.url,
            self._cookiefile[0].replace(self.email, hide_email(self.email)),
        )
        self.status = {}
        self.status["login_successful"] = True
        await self.save_cookiefile()
        #  remove extraneous Content-Type to avoid 500 errors
        self._headers.pop("Content-Type", None)
