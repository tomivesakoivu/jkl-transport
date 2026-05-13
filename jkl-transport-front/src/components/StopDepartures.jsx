const PrintStopDepartures = ({ tripUpdates, stopId, routesMap, refreshed, loading, error }) => {
  if (loading) return <p className="no-departures">Loading departures...</p>
  if (error)   return <p className="no-departures error-text">Could not load departures. Retrying...</p>

  const stopDepartureMap = new Map()

  for (const entity of tripUpdates) {
    const tripUpdate = entity?.tripUpdate
    if (!tripUpdate?.stopTimeUpdate || !tripUpdate?.trip?.routeId) continue

    for (const update of tripUpdate.stopTimeUpdate) {
      if (!update?.stopId || !update?.departure?.time) continue
      if (String(stopId) !== String(update.stopId)) continue

      const time = Number(update.departure.time)
      if (!Number.isFinite(time) || time <= 0) continue

      stopDepartureMap.set(tripUpdate.trip.routeId, time)
    }
  }

  if (stopDepartureMap.size === 0) {
    return <p className="no-departures">No upcoming departures found for this stop.</p>
  }

  const now = Date.now() / 1000
  const sorted = [...stopDepartureMap.entries()]
    .filter(([, time]) => time >= now - 60) // drop departures more than 1 min in the past
    .sort((a, b) => a[1] - b[1])

  if (sorted.length === 0) {
    return <p className="no-departures">No upcoming departures found for this stop.</p>
  }

  return (
    <>
      <table className="departures-table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Departure</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(([routeId, time]) => (
            <tr key={routeId}>
              <td>{routesMap.get(routeId) ?? routeId}</td>
              <td>
                {new Date(time * 1000).toLocaleTimeString('fi-FI', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={`refresh-indicator ${refreshed ? 'refresh-visible' : ''}`}>
        Refreshed
      </p>
    </>
  )
}

export default PrintStopDepartures
