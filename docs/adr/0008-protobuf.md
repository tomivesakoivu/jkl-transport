# Data Format: GTFS-Realtime Protocol Buffers

## Context and Problem Statement

Real-time transit data from Waltti arrives in binary format using Protocol Buffers (protobuf). The team must decide whether to decode protobuf on the backend or send raw binary to the frontend, and if decoding, what format to use.

## Considered Options

* Decode protobuf on backend, send JSON to frontend
* Send raw protobuf binary to frontend, decode in browser
* Convert protobuf to alternate format (e.g., MessagePack)

## Decision Outcome

Chosen option: "Send raw protobuf binary to frontend, decode in browser", because the decoding on the frontend was already working and moving it to the backend wasn't feasible with available human resources.

### Consequences

* Good, because backend stays thin
* Good, because gtfs-realtime-bindings works in the browser
* Bad, because frontend depends now on the gtfs-realtime-bindings
* Bad, because parsing in the frontend requires a bit more than revieving the JSON staright
