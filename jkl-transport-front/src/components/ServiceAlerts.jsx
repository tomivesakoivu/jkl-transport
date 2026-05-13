import { useState } from 'react'

/**
 * Shows service alerts. Clicking the title toggles visibility.
 *
 * Props:
 *   alerts   - array of GTFS-RT alert entities
 *   stopId   - the currently selected stop_id
 *   stopsMap - Map<stop_id, stop_name> for resolving IDs to names
 */
const ServiceAlerts = ({ alerts, stopId, stopsMap }) => {
  const [visible, setVisible] = useState(true)

  console.log('ServiceAlerts: total alerts:', alerts.length)
  if (alerts.length > 0) {
    console.log('ServiceAlerts: first alert entity:', JSON.stringify(alerts[0], null, 2))
  }

  const relevant = alerts

  if (relevant.length === 0) return null

  return (
    <div className="alerts-section">
      <h3 className="alerts-title" onClick={() => setVisible(v => !v)}>
        Service Alerts <span className="alerts-toggle">{visible ? '▲' : '▼'}</span>
      </h3>
      {visible && (
        <ul className="alerts-list">
          {relevant.map(entity => {
            const alert = entity.alert
            const header = alert.headerText?.translation?.[0]?.text ?? ''
            const description = alert.descriptionText?.translation?.[0]?.text ?? ''
            const affectedStops = (alert.informedEntity ?? [])
              .filter(e => e.stopId)
              .map(e => stopsMap.get(String(e.stopId)) ?? e.stopId)

            return (
              <li key={entity.id} className="alert-item">
                {header && <p className="alert-header">{header}</p>}
                {description && description !== header && (
                  <p className="alert-description">{description}</p>
                )}
                {affectedStops.length > 0 && (
                  <p className="alert-stops">
                    Affected stops: {affectedStops.join(', ')}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ServiceAlerts
