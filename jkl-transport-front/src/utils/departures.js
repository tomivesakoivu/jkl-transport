/**
 * Builds a sorted array of [routeId, departureTime] pairs for a given stop
 * from raw GTFS-RT trip update entities.
 *
 * Handles imperfect data: skips missing fields, invalid times, and
 * departures more than 1 minute in the past.
 *
 * @param {Array} tripUpdates - GTFS-RT feed entities
 * @param {string|number} stopId - the stop to filter for
 * @param {number} now - current time as Unix timestamp (seconds), defaults to Date.now()/1000
 * @returns {Array<[string, number]>} sorted by departure time ascending
 */
export const buildDepartures = (tripUpdates, stopId, now = Date.now() / 1000) => {
  const stopDepartureMap = new Map()

  for (const entity of tripUpdates) {
    const tripUpdate = entity?.tripUpdate
    if (!tripUpdate?.stopTimeUpdate || !tripUpdate?.trip?.routeId) continue

    for (const update of tripUpdate.stopTimeUpdate) {
      if (!update?.stopId || !update?.departure?.time) continue
      if (String(stopId) !== String(update.stopId)) continue

      const time = Number(update.departure.time)
      if (!Number.isFinite(time) || time <= 0) continue

      stopDepartureMap.set(tripUpdate.trip.routeId, time)
    }
  }

  return [...stopDepartureMap.entries()]
    .filter(([, time]) => time >= now - 60)
    .sort((a, b) => a[1] - b[1])
}
