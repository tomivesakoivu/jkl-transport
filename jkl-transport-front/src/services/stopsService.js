import axios from 'axios'
import API_URL from './api'

let cachedStops = null
let cachedRoutes = null

const fetchStops = async () => {
  if (!cachedStops) {
    const response = await axios.get(`${API_URL}/api/stops`)
    cachedStops = response.data
  }
  return cachedStops
}

const fetchRoutes = async () => {
  if (!cachedRoutes) {
    const response = await axios.get(`${API_URL}/api/routes`)
    cachedRoutes = new Map(
      response.data.map(r => [r.route_id, r.route_short_name])
    )
  }
  return cachedRoutes
}

export const searchStopsByName = async (query) => {
  const stops = await fetchStops()
  if (!query) return []
  return stops.filter(stop =>
    stop.stop_name.toLowerCase().includes(query.toLowerCase())
  )
}

export const getStopByName = async (stopName) => {
  const stops = await fetchStops()
  return stops.find(stop =>
    stop.stop_name.toLowerCase().includes(stopName.toLowerCase())
  ) ?? null
}

export const getStopsMap = async () => {
  const stops = await fetchStops()
  return new Map(stops.map(s => [String(s.stop_id), s.stop_name]))
}

export const getRoutesMap = async () => {
  return fetchRoutes()
}
