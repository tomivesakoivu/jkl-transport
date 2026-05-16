import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'

vi.mock('axios')
vi.mock('./api', () => ({ default: 'http://localhost:3001' }))

// Re-import after mocking so the module cache is fresh each test
const mockStops = [
  { stop_id: '1', stop_name: 'Keskusta 1' },
  { stop_id: '2', stop_name: 'Keskusta 2' },
  { stop_id: '3', stop_name: 'Mattilanniemi' },
  { stop_id: '4', stop_name: 'Ylioppilaskylä' },
]

beforeEach(async () => {
  vi.resetModules()
  vi.clearAllMocks()
  axios.get.mockResolvedValue({ data: mockStops })
})

describe('searchStopsByName', () => {
  it('returns all stops matching a partial name (case-insensitive)', async () => {
    const { searchStopsByName } = await import('./stopsService')
    const result = await searchStopsByName('kesk')
    expect(result).toHaveLength(2)
    expect(result.map(s => s.stop_name)).toEqual(['Keskusta 1', 'Keskusta 2'])
  })

  it('is case-insensitive', async () => {
    const { searchStopsByName } = await import('./stopsService')
    const result = await searchStopsByName('MATTI')
    expect(result).toHaveLength(1)
    expect(result[0].stop_name).toBe('Mattilanniemi')
  })

  it('returns empty array for empty query', async () => {
    const { searchStopsByName } = await import('./stopsService')
    expect(await searchStopsByName('')).toEqual([])
    expect(await searchStopsByName(null)).toEqual([])
  })

  it('returns empty array when no stops match', async () => {
    const { searchStopsByName } = await import('./stopsService')
    expect(await searchStopsByName('zzznomatch')).toHaveLength(0)
  })

  it('returns all stops when query matches all', async () => {
    const { searchStopsByName } = await import('./stopsService')
    const result = await searchStopsByName('a') // all names contain 'a'
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('getStopByName', () => {
  it('returns the first matching stop object', async () => {
    const { getStopByName } = await import('./stopsService')
    const result = await getStopByName('Mattilanniemi')
    expect(result).toEqual({ stop_id: '3', stop_name: 'Mattilanniemi' })
  })

  it('returns null when no stop matches', async () => {
    const { getStopByName } = await import('./stopsService')
    expect(await getStopByName('zzznomatch')).toBeNull()
  })

  it('matches on partial name', async () => {
    const { getStopByName } = await import('./stopsService')
    const result = await getStopByName('Ylioppilas')
    expect(result?.stop_name).toBe('Ylioppilaskylä')
  })
})

describe('getStopsMap', () => {
  it('returns a Map with stop_id keys and stop_name values', async () => {
    const { getStopsMap } = await import('./stopsService')
    const map = await getStopsMap()
    expect(map).toBeInstanceOf(Map)
    expect(map.get('1')).toBe('Keskusta 1')
    expect(map.get('3')).toBe('Mattilanniemi')
  })

  it('has the same number of entries as the stops array', async () => {
    const { getStopsMap } = await import('./stopsService')
    const map = await getStopsMap()
    expect(map.size).toBe(mockStops.length)
  })

  it('stores stop_id as string keys', async () => {
    const { getStopsMap } = await import('./stopsService')
    const map = await getStopsMap()
    expect(map.has('1')).toBe(true)
    expect(map.has(1)).toBe(false) // number key should not exist
  })
})
