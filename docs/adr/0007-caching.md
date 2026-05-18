# Static Data Caching: In-Memory with Startup Load

## Context and Problem Statement

The application requires fast access to GTFS static data (stops, routes) for search and display. The team must decide how and when to load this data to balance startup performance, search responsiveness, and memory usage.

## Considered Options

* In-memory cache loaded at startup (all data in RAM)
* On-demand fetch per request (fetch from API each time)
* Database cache (persistent storage like Redis or SQL)
* Hybrid (mix of in-memory and on-demand)

## Decision Outcome

Chosen option: "In-memory cache loaded at startup", because stops and routes change infrequently, loading them once at server start provides zero-latency searches without database complexity.

### Consequences

* Good, because search queries return instantly (no API calls needed)
* Good, because eliminates repeated API calls for static data
* Good, because simple implementation using JavaScript objects/arrays
* Good, because reduces load on Waltti API significantly
* Good, because works offline once cache is populated
* Bad, because memory usage grows with number of stops/routes
* Bad, because requires server restart to update static data
* Bad, because data becomes stale if routes/stops change during operation
* Bad, because startup time increases as dataset grows
