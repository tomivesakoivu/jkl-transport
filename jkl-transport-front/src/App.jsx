import { useState, useEffect } from 'react'
import PrintStopDepartures from './components/StopDepartures'
import StopSearch from './components/StopSearch'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import axios from 'axios'
import API_URL from './services/api'
import { getRoutesMap, getStopByName } from './services/stopsService'

const App = () => {
  const [tripUpdates, setTripUpdates] = useState([])
  const [selectedStop, setSelectedStop] = useState(null) // { stop_id, stop_name }
  const [routesMap, setRoutesMap] = useState(new Map())

  const getTripUpdate = () => {
    axios
      .get(`${API_URL}/api/tripupdate`, {
        responseType: "arraybuffer",
      })
      .then(response => {
        const feed =
          GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(response.data)
          )
        setTripUpdates(feed.entity || [])
      })
      .catch(console.error)
  }

  useEffect(() => {
    getTripUpdate()
  }, [])

  useEffect(() => {
    getRoutesMap()
      .then(setRoutesMap)
      .catch(console.error)
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
          />
        </div>
      )}
    </div>
  )
}

export default App
