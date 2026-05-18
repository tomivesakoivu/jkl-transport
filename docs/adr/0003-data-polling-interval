# Data Polling Interval: 15 Seconds

## Context and Problem Statement

The application needs to keep real-time transit data current. The team must decide how frequently to refresh data from the backend API. Too frequent polling exhausts API quotas and drains mobile batteries; too infrequent polling provides stale data and poor user experience.

## Considered Options

* 5 seconds (excellent freshness, but excessive API load)
* 10 seconds (very good freshness, marginal API safety)
* 15 seconds (good freshness, sustainable load)
* 30 seconds (fair freshness, minimal load)
* 60 seconds (poor freshness, unacceptable for transit)
* WebSocket push-based (real-time but complex infrastructure)

## Decision Outcome

Chosen option: "15 seconds", because it provides optimal balance between data freshness (0-15 second delay) and resource efficiency (5,760 requests per user per day, well within Waltti API quotas).

### Consequences

* Good, because 15-second window matches real-world transit variance and is industry standard
* Good, because 5,760 requests/day per user supports thousands of concurrent users
* Good, because manageable CPU and database load on backend
* Good, because reasonable battery and data impact on mobile devices
* Good, because simple implementation using JavaScript setInterval()
* Bad, because not true real-time (could miss departures within 14 seconds)
* Bad, because users see data up to 15 seconds old
* Bad, because generates 5,760 HTTP requests per user per day (network overhead)
