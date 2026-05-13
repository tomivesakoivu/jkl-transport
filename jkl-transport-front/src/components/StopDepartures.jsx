const PrintStopDepartures = ({ tripUpdates, stopId, routesMap }) => {
  const stopDepartureMap = new Map()

  for (let i = 0; i < tripUpdates.length; i++) {
    for (let j = 0; j < tripUpdates[i].tripUpdate.stopTimeUpdate.length - 1; j++) {
      const update = tripUpdates[i].tripUpdate.stopTimeUpdate[j]
      if (String(stopId) === String(update.stopId)) {
        stopDepartureMap.set(
          tripUpdates[i].tripUpdate.trip.routeId,
          update.departure.time
        )
      }
    }
  }

  if (stopDepartureMap.size === 0) {
    return <p className="no-departures">No upcoming departures found for this stop.</p>
  }

  // Sort by departure time ascending
  const sorted = [...stopDepartureMap.entries()].sort((a, b) => a[1] - b[1])

  return (
    <table className="departures-table">
      <thead>
        <tr>
          <th>Buss Number</th>
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
  )
}

export default PrintStopDepartures
