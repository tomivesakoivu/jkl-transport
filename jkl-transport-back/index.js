require('dotenv').config()

const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const GtfsRealtimeBindings = require('gtfs-realtime-bindings')

app.use(cors())

//.env file with your API keys from Waltti
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

/*app.get("/api/staticgtfs", async (req, res) => {
  try {
    const response = await axios.get(
      "https://tvv.fra1.digitaloceanspaces.com/209.zip"
    )
    res.send(response.data)
  } catch (err) {
    console.error(err)
    if (!response?.data) {
      res.status(500).json({ error: "Failed to fetch GTFS data"})
    }
  }
})*/

app.get("/api/tripupdate", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/tripupdate",
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )

    res.send(response.data)
  } catch (err) {
    console.error(err)
    if (!response?.data) {
      res.status(500).json({ error: "Failed to fetch GTFS data"})
    }
  }
})

//JSON is nicer to read
app.get('/api/tripupdate/json', async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/tripupdate",
      {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    //same as in front end
    const feed =
      GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(response.data)
      )

    res.json(feed)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GTFS data'})
  }
})

app.get("/api/vehicleposition", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/vehicleposition",
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )

    res.send(response.data)
  } catch (err) {
    console.error(err)
    if (!response?.data) {
      res.status(500).json({ error: "Failed to fetch GTFS data"})
    }
  }
})

//JSON is nicer to read
app.get('/api/vehicleposition/json', async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/vehicleposition",
      {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    //same as in front end
    const feed =
      GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(response.data)
      )

    res.json(feed)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GTFS data'})
  }
})

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
