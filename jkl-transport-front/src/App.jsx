import { useState, useEffect } from 'react'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import axios from 'axios'

const App = () => {
  const [tripUpdates, setTripUpdates] = useState([])
  const [vehiclePositions, setVehiclePositions] = useState([])

  const getTripUpdate = () => {
    axios
      .get("http://localhost:3001/api/tripupdate", {
        responseType: "arraybuffer",
      })
      .then((response) => {
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
    getTripUpdate()
  }, [])

  const getVehiclePosition = () => {
    axios
      .get("http://localhost:3001/api/vehicleposition", {
        responseType: "arraybuffer",
      })
      .then((response) => {
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
    getVehiclePosition()
  }, [])

  return (
    <div>
      <h1>Jyväskylä Realtime Public Transport App</h1>
      <p>API:s first vehicle's licence plate:</p>
      <p>{vehiclePositions[0].vehicle.vehicle.licensePlate}</p>
    </div>
  )
}

export default App
