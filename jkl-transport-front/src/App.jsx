import { useState, useEffect } from 'react'
import PrintStopDepartures from './components/StopDepartures'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import axios from 'axios'

const App = () => {
  const [tripUpdates, setTripUpdates] = useState([])
  const [vehiclePositions, setVehiclePositions] = useState([])
  const [stopDepartures, setStopDepartures] = useState({})
  const YLIOPPILASKYLA_STOP_ID = 207532

  const getTripUpdate = () => {
    axios
      .get("http://localhost:3001/api/tripupdate", {
        responseType: "arraybuffer",
      })
      .then(response => {
        const feed =
          GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(response.data)
          )

        console.log("decoded TripUpdate: ", feed)

        setTripUpdates(feed.entity || [])
      })
      .catch(console.error)
  }

  useEffect(() => {
    console.log("Getting trip updates")
    getTripUpdate()
  }, [])

  const getVehiclePosition = () => {
    axios
      .get("http://localhost:3001/api/vehicleposition", {
        responseType: "arraybuffer",
      })
      .then(response => {
        const feed =
          GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(response.data)
          )

        console.log("decoded VehiclePosition: ", feed)

        setVehiclePositions(feed.entity || [])
      })
      .catch(console.error)
  }

  useEffect(() => {
    console.log("Getting vehicle positions")
    getVehiclePosition()
  }, [])

  const stopSchedule = stopID => {
    var stopDepartureArray = []

    //Just testing API parsing. getting every trip's every stop id :D
    if (stopID) {
      for (let i = 0; i < tripUpdates.length; i++) {
        //console.log(tripUpdates[i].tripUpdate.trip.routeId)
        for (let j = 0; j < tripUpdates[i].tripUpdate.stopTimeUpdate.length; j++)
          {
            stopDepartureArray.push(tripUpdates[i].tripUpdate.stopTimeUpdate[j].stopId)
          }
      }
    }
    console.log(stopDepartureArray)
  }

  return (
    <div>
      <h1>Jyväskylä Realtime Public Transport App</h1>
      <button onClick={stopSchedule}>
        Console print test
      </button>
      <h2>Ylioppilaskylä Live Departures</h2>
      <PrintStopDepartures
        tripUpdates={tripUpdates}
        stopId={YLIOPPILASKYLA_STOP_ID}
        setStopDepartures={setStopDepartures}
      />
    </div>
  )
}

export default App
