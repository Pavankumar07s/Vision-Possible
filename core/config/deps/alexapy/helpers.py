"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

Helpers.

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

import functools
import logging
import os
from asyncio import CancelledError
from http.cookies import CookieError
from json import JSONDecodeError
from types import MappingProxyType
from typing import Any

import aiofiles.os as aioos
from aiohttp import (
    ClientConnectionError,
    ClientResponse,
    ContentTypeError,
    ServerDisconnectedError,
)

import alexapy.alexalogin

from .const import EXCEPTION_TEMPLATE
from .errors import (
    AlexapyConnectionError,
    AlexapyLoginCloseRequested,
    AlexapyLoginError,
)

_LOGGER = logging.getLogger(__name__)

MIN_HIDE_LENGTH = 6

# Alexa API: Successful but guaranteed to NOT contain JSON
NO_JSON_STATUSES = (204,)


def hide_email(email: str) -> str:
    """Obfuscate email."""
    part = email.split("@")
    if len(part) > 1:
        return f"{part[0][0]}{'*' * (len(part[0]) - 2)}{part[0][-1]}@{part[1][0]}{'*' * (len(part[1]) - 2)}{part[1][-1]}"  # noqa: E501
    return hide_serial(email)


def hide_password(value: str) -> str:
    """Obfuscate password."""
    return f"REDACTED {len(value)} CHARS"


def hide_serial(item: dict | str | list | None) -> dict | str | list:
    """Obfuscate serial."""
    if item is None:
        return ""
    if isinstance(item, dict):
        response = item.copy()
        for key, value in item.items():
            if (
                isinstance(value, (dict, list))
                or key
                in [
                    "deviceSerialNumber",
                    "serialNumber",
                    "destinationUserId",
                    "customerId",
                    "access_token",
                    "refresh_token",
                ]
                or "secret" in key
            ):
                response[key] = hide_serial(value)
    elif isinstance(item, str):
        response = (
            f"{item[0]}{'*' * (len(item) - 4)}{item[-3:]}"
            if len(item) > MIN_HIDE_LENGTH
            else f"{'*' * len(item)}"
        )
    elif isinstance(item, list):
        response = []
        for list_item in item:
            if isinstance(list_item, dict):
                response.append(hide_serial(list_item))
            else:
                response.append(list_item)
    return response


def obfuscate(item):
    """Obfuscate email, password, and other known sensitive keys."""
    if item is None:
        return ""
    if isinstance(item, (MappingProxyType, dict)):
        response = item.copy()
        for key, value in item.items():
            if key in ["password"]:
                response[key] = hide_password(value)
            elif key in ["email"]:
                response[key] = hide_email(value)
            elif key in ["cookies_txt"]:
                response[key] = "OBFUSCATED COOKIE"
            elif (
                key
                in [
                    "deviceSerialNumber",
                    "serialNumber",
                    "destinationUserId",
                    "customerId",
                    "access_token",
                    "refresh_token",
                ]
                or "secret" in key
            ):
                response[key] = hide_serial(value)
            elif isinstance(value, (dict, list, tuple)):
                response[key] = obfuscate(value)
    elif isinstance(item, (list, tuple)):
        response = []
        for list_item in item:
            if isinstance(list_item, (dict, list, tuple)):
                response.append(obfuscate(list_item))
            else:
                response.append(list_item)
        if isinstance(item, tuple):
            response = tuple(response)
    else:
        return item
    return response


def _catch_all_exceptions(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        login: alexapy.alexalogin.AlexaLogin | None = None
        for arg in args:
            if isinstance(arg, alexapy.alexalogin.AlexaLogin):
                login = arg
                break
        try:
            return await func(*args, **kwargs)
        except (ClientConnectionError, KeyError, ServerDisconnectedError) as ex:
            _LOGGER.warning(
                "%s.%s(%s, %s): A connection error occurred: %s",
                func.__module__[func.__module__.find(".") + 1 :],
                func.__name__,
                obfuscate(args),
                obfuscate(kwargs),
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            raise AlexapyConnectionError from ex
        except (JSONDecodeError, CookieError) as ex:
            _LOGGER.warning(
                "%s.%s(%s, %s): A login error occurred: %s",
                func.__module__[func.__module__.find(".") + 1 :],
                func.__name__,
                obfuscate(args),
                obfuscate(kwargs),
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            if login:
                login.status["login_successful"] = False
            raise AlexapyLoginError from ex
        except ContentTypeError as ex:
            _LOGGER.warning(
                "%s.%s(%s, %s): A login error occurred; Amazon may want you to change your password: %s",  # noqa: E501
                func.__module__[func.__module__.find(".") + 1 :],
                func.__name__,
                obfuscate(args),
                obfuscate(kwargs),
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            if login:
                login.status["login_successful"] = False
            raise AlexapyLoginError from ex
        except CancelledError as ex:
            _LOGGER.warning(
                "%s.%s(%s, %s): Timeout error occurred accessing AlexaAPI: %s",
                func.__module__[func.__module__.find(".") + 1 :],
                func.__name__,
                obfuscate(args),
                obfuscate(kwargs),
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            return None
        except AlexapyLoginCloseRequested:
            raise
        except Exception as ex:
            _LOGGER.warning(
                "%s.%s(%s, %s): An error occurred accessing AlexaAPI: %s",
                func.__module__[func.__module__.find(".") + 1 :],
                func.__name__,
                obfuscate(args),
                obfuscate(kwargs),
                EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
            )
            raise
            # return None

    return wrapper


async def delete_cookie(cookiefile: str) -> None:
    """Delete a cookie.

    Args:
        cookiefile (Text): Path to cookie

    """
    _LOGGER.debug("Deleting cookiefile %s ", cookiefile)
    try:
        try:
            await aioos.remove(cookiefile)
        except AttributeError:
            os.remove(cookiefile)
    except (OSError, EOFError, TypeError, AttributeError) as ex:
        _LOGGER.debug(
            "Error deleting cookie: %s; please manually remove",
            EXCEPTION_TEMPLATE.format(type(ex).__name__, ex.args),
        )


async def get_json_value(
    response: ClientResponse | None,
    path: str | None,
    expected_type: type | tuple[type, ...],
) -> tuple[Any, bool]:
    """Extract a value from a JSON response using a dot-separated path.

    Retrieves the JSON body from an aiohttp.ClientResponse and traverses
    it according to a dot-path (e.g., 'items.0.name'). Supports array
    indices, multiple expected types, and handles Alexa API response behaviors.

    If `path` is None or an empty string, the entire JSON body is returned.

    Args:
        response: The aiohttp.ClientResponse object, or None.
        path: Dot-separated path to the desired value in the JSON. If None
            or empty, returns the entire JSON body.
        expected_type: A type or tuple of types that the value is expected to have.

    Returns:
        A tuple (value, valid):
        - value: the extracted value, or None if missing/invalid
        - valid: True if the value exists and matches the expected type, False otherwise

    Logs warnings for:
        - HTTP statuses that do not contain JSON (e.g., 204)
        - HTTP error statuses (4xx/5xx)
        - Missing or out-of-range path elements
        - Type mismatches

    """
    if response is None:
        return None, False

    body = None
    value = None
    valid = True  # Tracks overall success
    status = response.status

    # Status that definitely contains no JSON (e.g., 204)
    if status in NO_JSON_STATUSES:
        _LOGGER.warning(
            "HTTP (URL: %s) status %s returned but contains no JSON. Cannot validate '%s'.",  # noqa: E501
            response.url,
            status,
            path,
        )
        valid = False

    # HTTP error status (4xx/5xx)
    elif status >= 400:
        _LOGGER.warning(
            "HTTP (URL: %s) error status %s when accessing JSON for '%s'.",
            response.url,
            status,
            path,
        )
        valid = False

    # Status that may contain JSON (200/201/202)
    else:
        try:
            body = await response.json(content_type=None)
            value = body
        except Exception as exc:
            _LOGGER.warning(
                "Failed (URL: %s) to parse JSON for '%s' (status %s): %s",
                response.url,
                path,
                status,
                exc,
            )
            _LOGGER.debug("Response text: %s", response.text)
            valid = False

        # Traverse dot-path only if still valid
        if valid and path is not None and path != "":
            for part in path.split("."):
                # List index access
                if isinstance(value, list) and part.isdigit():
                    idx = int(part)
                    if idx < 0 or idx >= len(value):
                        _LOGGER.warning(
                            "Resulting JSON (URL: %s), index %s out of range at '%s'.",
                            response.url,
                            part,
                            path,
                        )
                        _LOGGER.debug("Response json: %s", body)
                        valid = False
                        value = None
                        break
                    value = value[idx]
                    continue

                # Dict key access
                if isinstance(value, dict) and part in value:
                    value = value[part]
                    continue

                # Path not found
                _LOGGER.warning(
                    "Resulting JSON (URL: %s), path '%s' not found in JSON response.",
                    response.url,
                    path,
                )
                _LOGGER.debug("Response json: %s", body)
                valid = False
                value = None
                break

        # Type check
        if valid and not isinstance(value, expected_type):
            type_names = (
                ", ".join(t.__name__ for t in expected_type)
                if isinstance(expected_type, tuple)
                else expected_type.__name__
            )
            _LOGGER.warning(
                "Resulting JSON (URL: %s), invalid type at '%s': expected %s, got %s",
                response.url,
                path,
                type_names,
                type(value).__name__,
            )
            _LOGGER.debug("Response json: %s", body)
            valid = False
            value = None

    return value, valid
