require('dotenv').config()

const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const GtfsRealtimeBindings = require('gtfs-realtime-bindings')
const AdmZip = require('adm-zip')
const { parse } = require('csv-parse/sync')

app.use(cors())

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

app.get("/api/tripupdate", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/tripupdate",
      {
        responseType: "arraybuffer",
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    res.send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch GTFS data" })
  }
})

//JSON is nicer to read
app.get('/api/tripupdate/json', async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/tripupdate",
      {
        responseType: 'arraybuffer',
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    )
    res.json(feed)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GTFS data' })
  }
})

app.get("/api/vehicleposition", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/vehicleposition",
      {
        responseType: "arraybuffer",
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    res.send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch GTFS data" })
  }
})

//JSON is nicer to read
app.get('/api/vehicleposition/json', async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/vehicleposition",
      {
        responseType: 'arraybuffer',
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    )
    res.json(feed)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GTFS data' })
  }
})

app.get("/api/servicealert", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/servicealert",
      {
        responseType: "arraybuffer",
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    res.send(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch GTFS data" })
  }
})

//JSON is nicer to read
app.get('/api/servicealert/json', async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.waltti.fi/jyvaskyla/api/gtfsrealtime/v1.0/feed/servicealert",
      {
        responseType: 'arraybuffer',
        headers: { Authorization: `Basic ${auth}` },
      }
    )
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    )
    res.json(feed)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch GTFS data' })
  }
})

let gtfsCache = null

const getGtfsZip = async () => {
  if (gtfsCache) return gtfsCache

  console.log('Fetching 209.zip')
  const response = await axios.get(
    'https://tvv.fra1.digitaloceanspaces.com/209.zip',
    { responseType: 'arraybuffer' }
  )
  const zip = new AdmZip(Buffer.from(response.data))

  const parseEntry = (name) => {
    const entry = zip.getEntry(name)
    if (!entry) throw new Error(`${name} not found in ZIP`)
    return parse(entry.getData().toString('utf8'), {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
  }

  gtfsCache = {
    stops: parseEntry('stops.txt'),
    routes: parseEntry('routes.txt'),
  }

  return gtfsCache
}

app.get('/api/stops', async (req, res) => {
  try {
    const { stops } = await getGtfsZip()
    res.json(stops)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch or parse GTFS stops' })
  }
})

app.get('/api/routes', async (req, res) => {
  try {
    const { routes } = await getGtfsZip()
    res.json(routes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch or parse GTFS routes' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
