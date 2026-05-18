# Data Format: GTFS-Realtime Protocol Buffers

## Context and Problem Statement

Real-time transit data from Waltti arrives in binary format using Protocol Buffers (protobuf). The team must decide whether to decode protobuf on the backend or send raw binary to the frontend, and if decoding, what format to use.

## Considered Options

* Decode protobuf on backend, send JSON to frontend
* Send raw protobuf binary to frontend, decode in browser
* Convert protobuf to alternate format (e.g., MessagePack)

## Decision Outcome

Chosen option: "Decode protobuf on backend, send JSON to frontend", because it centralizes the decoding complexity, reduces frontend dependencies, and provides a consistent REST API interface.

### Consequences

* Good, because backend handles protobuf decoding complexity (using gtfs-realtime-bindings)
* Good, because frontend receives simple JSON, no binary parsing needed
* Good, because REST API is standard and easy to debug
* Bad, because requires gtfs-realtime-bindings dependency

