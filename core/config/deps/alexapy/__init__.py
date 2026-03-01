"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

try:
    from importlib_metadata import PackageNotFoundError
    from importlib_metadata import metadata as __load
except ModuleNotFoundError:
    from importlib.metadata import PackageNotFoundError
    from importlib.metadata import metadata as __load

import logging
from pathlib import Path

from .alexaapi import AlexaAPI
from .alexahttp2 import HTTP2EchoClient
from .alexalogin import AlexaLogin
from .alexaproxy import AlexaProxy
from .alexawebsocket import WebsocketEchoClient
from .errors import (
    AlexapyConnectionError,
    AlexapyLoginCloseRequested,
    AlexapyLoginError,
    AlexapyPyotpInvalidKey,
)
from .helpers import hide_email, hide_serial, obfuscate

pkg = Path(__file__).absolute().parent.name
logger = logging.getLogger(pkg)
try:
    metadata = __load(pkg)

    __uri__ = metadata.get("project-url").split("Repository,")[1].strip()
    __title__ = metadata["name"]
    __summary__ = metadata["summary"]
    __license__ = metadata["license"]
    __version__ = metadata["version"]
    __author__ = metadata["author"]
    __maintainer__ = metadata.get("maintainer")
    __contact__ = metadata.get("maintainer")
except PackageNotFoundError:  # pragma: no cover
    logger.error("Could not load package metadata for %s. Is it installed?", pkg)

__all__ = [
    "AlexaAPI",
    "AlexaLogin",
    "AlexaProxy",
    "AlexapyConnectionError",
    "AlexapyLoginCloseRequested",
    "AlexapyLoginError",
    "AlexapyPyotpInvalidKey",
    "HTTP2EchoClient",
    "WebsocketEchoClient",
    "hide_email",
    "hide_serial",
    "obfuscate",
]
