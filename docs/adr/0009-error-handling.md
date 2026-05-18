# Error Handling: Graceful Degradation with Status Indicators

## Context and Problem Statement

Network failures, API outages, and data parsing errors are inevitable in a real-time application. The team must decide how to handle errors to maintain user experience even when data is unavailable or stale.

## Considered Options

* Fail hard (show error page, block all functionality)
* Retry with exponential backoff (transparent to user)
* Graceful degradation with status indicators (show stale data, warn user)
* Cache and serve stale data indefinitely (no warning)

## Decision Outcome

Chosen option: "Graceful degradation with status indicators", because it maintains user experience by serving the most recent data while clearly indicating when information may be outdated.

### Consequences

* Good, because users can still access information even if real-time data is unavailable
* Good, because status indicator (last update timestamp) shows data freshness
* Good, because users understand when they're making decisions on stale information
* Good, because prevents app from appearing "broken" during temporary outages
* Bad, because showing old data could be misleading (bus may have already left)
* Bad, because adds UI complexity with status indicators and error messages
