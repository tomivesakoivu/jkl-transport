import { useState, useEffect } from 'react'
import PrintStopDepartures from './components/StopDepartures'
import StopSearch from './components/StopSearch'
import ServiceAlerts from './components/ServiceAlerts'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import axios from 'axios'
import API_URL from './services/api'
import { getRoutesMap, getStopByName, getStopsMap } from './services/stopsService'

const App = () => {
  const [tripUpdates, setTripUpdates] = useState([])
  const [serviceAlerts, setServiceAlerts] = useState([])
  const [selectedStop, setSelectedStop] = useState(null) // { stop_id, stop_name }
  const [routesMap, setRoutesMap] = useState(new Map())
  const [stopsMap, setStopsMap] = useState(new Map())

  const [refreshed, setRefreshed] = useState(false)

  const getTripUpdate = () => {
    axios
      .get(`${API_URL}/api/tripupdate`, { responseType: 'arraybuffer' })
      .then(response => {
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
          new Uint8Array(response.data)
        )
        setTripUpdates(feed.entity || [])
        setRefreshed(true)
        setTimeout(() => setRefreshed(false), 2000)
      })
      .catch(console.error)
  }

  const getServiceAlerts = () => {
    axios
      .get(`${API_URL}/api/servicealert`, { responseType: 'arraybuffer' })
      .then(response => {
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
          new Uint8Array(response.data)
        )
        setServiceAlerts(feed.entity || [])
      })
      .catch(console.error)
  }

  useEffect(() => {
    getTripUpdate()
    const interval = setInterval(getTripUpdate, 15000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => { getServiceAlerts() }, [])

  useEffect(() => {
    getRoutesMap().then(setRoutesMap).catch(console.error)
  }, [])

  useEffect(() => {
    getStopsMap().then(setStopsMap).catch(console.error)
  }, [])

  useEffect(() => {
    getStopByName('Mattilanniemi')
      .then(stop => { if (stop) setSelectedStop(stop) })
      .catch(console.error)
  }, [])

  return (
    <div className="app">
      <h1 className="app-title">Jyväskylä Public Transport</h1>
      <p className="app-subtitle">Stop Schedules</p>

      <StopSearch onSelectStop={setSelectedStop} />

      {selectedStop && (
        <div className="departures-section">
          <h2 className="departures-title">{selectedStop.stop_name}</h2>
          <PrintStopDepartures
            tripUpdates={tripUpdates}
            stopId={selectedStop.stop_id}
            routesMap={routesMap}
            refreshed={refreshed}
          />
        </div>
      )}

      <ServiceAlerts
        alerts={serviceAlerts}
        stopId={selectedStop?.stop_id}
        stopsMap={stopsMap}
      />
    </div>
  )
}

export default App
