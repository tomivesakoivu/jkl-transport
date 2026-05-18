# Backend Technology Stack: Node.js + Express

## Context and Problem Statement

The backend must proxy API calls to Waltti, parse GTFS static data, and handle multiple concurrent requests from the frontend. The team must choose a backend technology that is simple to deploy and maintains consistency with the JavaScript frontend.

## Considered Options

* Node.js + Express (JavaScript runtime with minimal web framework)
* Python + Flask/FastAPI (interpreted language with lightweight frameworks)
* Go (compiled, fast, excellent concurrency)

## Decision Outcome

Chosen option: "Node.js + Express", because it provides simplicity, team alignment (unified JavaScript stack), and sufficient performance for this use case without unnecessary complexity.

### Consequences

* Good, because JavaScript across frontend and backend reduces context switching
* Good, because rich npm ecosystem has libraries for every requirement
* Good, because non-blocking I/O efficiently handles many concurrent connections
* Good, because minimal Express setup gets server running quickly
* Good, because team had prior experience.
* Bad, because JavaScript lacks built-in type safety (mitigated with JSDoc/TypeScript)
* Bad, because shared dependency chains between frontend and backend can cause conflicts
