# Frontend-Backend Separation

## Context and Problem Statement

The application must securely handle API credentials for Waltti while allowing the frontend to fetch real-time data. Additionally, the frontend and backend have different deployment requirements, scaling patterns, and technology needs. The team must decide on the architectural boundary between frontend and backend.

## Considered Options

* Single monolithic application (frontend and backend in one codebase/deployment)
* Frontend-backend separation (distinct frontend and backend services)
* Frontend-only with third-party backend services (BaaS)

## Decision Outcome

Chosen option: "Frontend-backend separation", because it securely isolates API credentials on the server, enables independent scaling of frontend and backend, and allows each layer to use optimal technologies.

### Consequences

* Good, because API credentials (CLIENT_ID, CLIENT_SECRET) remain secure on the server and never exposed to browsers
* Good, because backend can cache static data (stops, routes) to reduce API calls to Waltti
* Good, because backend can decode protobuf messages into JSON, simplifying frontend logic
* Good, because allows different technology stacks optimized for each layer
* Good, because future backend features (notifications, user preferences) can be added without frontend changes
* Bad, because adds architectural complexity with an additional network boundary
* Bad, because backend must be running for frontend to function (single point of failure)
* Bad, because adds latency compared to direct frontend API calls to Waltti
