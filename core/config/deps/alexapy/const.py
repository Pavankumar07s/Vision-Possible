"""Python Package for controlling Alexa devices (echo dot, etc) programmatically.

SPDX-License-Identifier: Apache-2.0

Constants.

For more details about this api, please refer to the documentation at
https://gitlab.com/keatontaylor/alexapy
"""

EXCEPTION_TEMPLATE = "An exception of type {0} occurred. Arguments:\n{1!r}"

CALL_VERSION = "2.2.556530.0"
APP_NAME = "Alexa Media Player"

# REST-style Alexa API hosts (for things like /api/notifications)
ALEXA_API_NA = "https://na-api-alexa.amazon.com"
ALEXA_API_EU = "https://eu-api-alexa.amazon.com"
ALEXA_API_FE = "https://fe-api-alexa.amazon.com"

ALEXA_API_BASE = {
    ".com": ALEXA_API_NA,
    ".ca": ALEXA_API_NA,
    ".com.mx": ALEXA_API_NA,
    ".com.br": ALEXA_API_NA,
    ".co.uk": ALEXA_API_EU,
    ".de": ALEXA_API_EU,
    ".fr": ALEXA_API_EU,
    ".es": ALEXA_API_EU,
    ".it": ALEXA_API_EU,
    ".in": ALEXA_API_FE,
    ".co.jp": ALEXA_API_FE,
    ".com.au": ALEXA_API_FE,
    ".co.nz": ALEXA_API_FE,
}

# UA used for REST API calls that should look like a modern mobile client
API_USER_AGENT = (
    "Mozilla/5.0 (Linux; Android 10) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/83.0.4103.101 Mobile Safari/537.36"
)

# Default Accept-Language header for REST API calls.
# Amazon documentation and Alexa mobile clients are consistently en-US.
DEFAULT_ACCEPT_LANGUAGE = "en-US"

# Centralize default locale for other operations
DEFAULT_LOCALE = "en-US"

# Retain existing constants (USER_AGENT, etc.) as other code still relies on it.
# These can be removed once all legacy code has been updated to utilize
# the new REST-style constants.
USER_AGENT = f"AmazonWebView/Amazon Alexa/{CALL_VERSION}/iOS/16.6/iPhone"
LOCALE_KEY = {
    ".de": "de_DE",
    ".com.au": "en_AU",
    ".ca": "en_CA",
    ".co.uk": "en_GB",
    ".in": "en_IN",
    ".com": "en_US",
    ".es": "es_ES",
    ".mx": "es_MX",
    ".fr": "fr_FR",
    ".it": "it_IT",
    ".co.jp": "ja_JP",
    ".com.br": "pt_BR",
}
# https://developer.amazon.com/en-US/docs/alexa/alexa-voice-service/api-overview.html#endpoints
HTTP2_NA = "alexa.na.gateway.devices.a2z.com"
HTTP2_EU = "alexa.eu.gateway.devices.a2z.com"
HTTP2_FE = "alexa.fe.gateway.devices.a2z.com"
HTTP2_AUTHORITY = {
    ".com": HTTP2_NA,
    ".ca": HTTP2_NA,
    ".com.mx": HTTP2_NA,
    ".com.br": HTTP2_NA,
    ".co.jp": HTTP2_FE,
    ".com.au": HTTP2_FE,
    ".com.in": HTTP2_FE,
    ".co.nz": HTTP2_FE,
}
HTTP2_DEFAULT = HTTP2_EU

GQL_SMARTHOME_QUERY = """
query CustomerSmartHome {
    endpoints(
      endpointsQueryParams: { paginationParams: { disablePagination: true } }
    ) {
        items {
            legacyAppliance {
                applianceId
                applianceTypes
                friendlyName
                friendlyDescription
                manufacturerName
                connectedVia
                modelName
                entityId
                aliases
                capabilities
                customerDefinedDeviceType
                alexaDeviceIdentifierList
                driverIdentity
            }
        }
    }
}
"""
