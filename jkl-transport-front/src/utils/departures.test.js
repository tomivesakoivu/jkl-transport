import { describe, it, expect } from 'vitest'
import { buildDepartures } from './departures'

const NOW = 1_700_000_000 // fixed timestamp for deterministic tests

const makeEntity = (routeId, stopId, departureTime) => ({
  tripUpdate: {
    trip: { routeId },
    stopTimeUpdate: [
      { stopId: String(stopId), departure: { time: departureTime } }
    ]
  }
})

describe('buildDepartures', () => {
  it('returns matching departures for the given stop', () => {
    const entities = [
      makeEntity('1', '100', NOW + 300),
      makeEntity('2', '100', NOW + 600),
      makeEntity('3', '999', NOW + 100), // different stop — should be excluded
    ]
    const result = buildDepartures(entities, '100', NOW)
    expect(result).toHaveLength(2)
    expect(result.map(([routeId]) => routeId)).toEqual(['1', '2'])
  })

  it('returns results sorted by departure time ascending', () => {
    const entities = [
      makeEntity('late', '100', NOW + 900),
      makeEntity('early', '100', NOW + 100),
      makeEntity('mid', '100', NOW + 500),
    ]
    const result = buildDepartures(entities, '100', NOW)
    expect(result.map(([routeId]) => routeId)).toEqual(['early', 'mid', 'late'])
  })

  it('matches stopId as string even when given as number', () => {
    const entities = [makeEntity('1', 100, NOW + 300)]
    expect(buildDepartures(entities, 100, NOW)).toHaveLength(1)
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(1)
  })

  it('skips entities with missing tripUpdate', () => {
    const entities = [{ tripUpdate: null }, makeEntity('1', '100', NOW + 300)]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(1)
  })

  it('skips entities with missing routeId', () => {
    const entities = [{
      tripUpdate: {
        trip: {},
        stopTimeUpdate: [{ stopId: '100', departure: { time: NOW + 300 } }]
      }
    }]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('skips stop time updates with missing departure time', () => {
    const entities = [{
      tripUpdate: {
        trip: { routeId: '1' },
        stopTimeUpdate: [{ stopId: '100', departure: {} }]
      }
    }]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('skips stop time updates with zero departure time', () => {
    const entities = [makeEntity('1', '100', 0)]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('skips stop time updates with negative departure time', () => {
    const entities = [makeEntity('1', '100', -1)]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('skips stop time updates with non-finite departure time', () => {
    const entities = [makeEntity('1', '100', NaN)]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('filters out departures more than 60 seconds in the past', () => {
    const entities = [
      makeEntity('stale', '100', NOW - 61),
      makeEntity('borderline', '100', NOW - 60), // exactly 60s ago — kept
      makeEntity('future', '100', NOW + 300),
    ]
    const result = buildDepartures(entities, '100', NOW)
    expect(result.map(([r]) => r)).toEqual(['borderline', 'future'])
  })

  it('returns empty array when no entities match the stop', () => {
    const entities = [makeEntity('1', '999', NOW + 300)]
    expect(buildDepartures(entities, '100', NOW)).toHaveLength(0)
  })

  it('returns empty array for empty input', () => {
    expect(buildDepartures([], '100', NOW)).toHaveLength(0)
  })

  it('keeps only the last seen departure time when a route appears multiple times for the same stop', () => {
    const entities = [
      makeEntity('1', '100', NOW + 100),
      makeEntity('1', '100', NOW + 500), // same routeId — overwrites
    ]
    const result = buildDepartures(entities, '100', NOW)
    expect(result).toHaveLength(1)
    expect(result[0][1]).toBe(NOW + 500)
  })
})
