# UI Model: Stop-Centric View

## Context and Problem Statement

The application can present real-time transit data in two fundamentally different ways: stop-centric ("When does my bus leave this stop?") or vehicle-centric ("Where is this bus right now?"). This decision affects UI architecture, data fetching strategy, and core user flows.

## Considered Options

* Stop-centric view (search stop, show departures)
* Vehicle-centric view (track vehicle on map)
* Hybrid approach (both views available)

## Decision Outcome

Chosen option: "Stop-centric view", because it directly solves the primary user problem with minimal complexity and matches how users naturally think about transit (stops are persistent, vehicles are transient).

### Consequences

* Good, because users fundamentally ask "When will the next bus to X arrive at stop Y?"
* Good, because all major transit apps (Google Maps, Citymapper, Whim) default to stop view
* Good, because departure times drive user decisions, not vehicle positions
* Good, because simpler data model: stop → departures
* Good, because better performance: filtering by stop_id is efficient
* Good, because can display stop-specific service alerts and disruptions
* Bad, because cannot track live vehicle position on map
* Bad, because users cannot see vehicle approaching in real-time
