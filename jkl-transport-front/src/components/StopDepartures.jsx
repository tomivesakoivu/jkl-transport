import { buildDepartures } from '../utils/departures'

const PrintStopDepartures = ({ tripUpdates, stopId, routesMap, refreshed, loading, error }) => {
  if (loading) return <p className="no-departures">Loading departures...</p>
  if (error)   return <p className="no-departures error-text">Could not load departures. Retrying...</p>

  const sorted = buildDepartures(tripUpdates, stopId)

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
