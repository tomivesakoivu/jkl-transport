# Data Source: Waltti API

## Context and Problem Statement

The application needs real-time transit data for Jyväskylä, Finland. The team must choose a reliable data provider that offers GTFS-Realtime feeds with vehicle positions, trip updates, and service alerts.

## Considered Options

* Waltti API (Finland's public transport data provider)

## Decision Outcome

Chosen option: "Waltti API", because it is the only reliable source for Jyväskylä transport data and provides standardized GTFS-Realtime feeds with authentication.

### Consequences

* Good, because Waltti provides comprehensive, real-time data (vehicle positions, trip updates, service alerts) for all public transport in Jyväskylä
* Good, because GTFS-Realtime is an industry standard format
* Bad, because we depend on an external API and require authentication credentials (CLIENT_ID, CLIENT_SECRET)
* Bad, because API rate limits must be respected (requires careful polling strategy)
* Bad, because API availability issues would impact user experience
