import axios from 'axios'
import API_URL from './api'

// Module-level cache so we only fetch once per page load
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
    // Build a map of route_id -> route_short_name for fast lookup
    cachedRoutes = new Map(
      response.data.map(r => [r.route_id, r.route_short_name])
    )
  }
  return cachedRoutes
}

/**
 * Returns all stops whose name contains the search string (case-insensitive).
 *
 * @param {string} query
 * @returns {Promise<Array<{stop_id: string, stop_name: string}>>}
 */
export const searchStopsByName = async (query) => {
  const stops = await fetchStops()
  if (!query) return []
  return stops.filter(stop =>
    stop.stop_name.toLowerCase().includes(query.toLowerCase())
  )
}

/**
 * Returns the first stop object matching the name (case-insensitive).
 *
 * @param {string} stopName
 * @returns {Promise<{stop_id: string, stop_name: string}|null>}
 */
export const getStopByName = async (stopName) => {
  const stops = await fetchStops()
  return stops.find(stop =>
    stop.stop_name.toLowerCase().includes(stopName.toLowerCase())
  ) ?? null
}

/**
 * Returns the stop_id for the first stop matching the name (case-insensitive).
 *
 * @param {string} stopName
 * @returns {Promise<string|null>}
 */
export const getStopIdByName = async (stopName) => {
  const stops = await fetchStops()
  const match = stops.find(stop =>
    stop.stop_name.toLowerCase().includes(stopName.toLowerCase())
  )
  return match ? match.stop_id : null
}

/**
 * Returns a Map of route_id -> route_short_name.
 *
 * @returns {Promise<Map<string, string>>}
 */
export const getRoutesMap = async () => {
  return fetchRoutes()
}
