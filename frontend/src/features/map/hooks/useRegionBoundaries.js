import { useCallback } from 'react'
import { useFetch } from './useFetch.js'
import { getAllRegionBoundaries } from '../api/geoApi.js'

/** All 14 region boundaries - fetched once, reused across the whole session. */
export function useRegionBoundaries() {
  const fetcher = useCallback((signal) => getAllRegionBoundaries({ signal }), [])
  return useFetch(fetcher, [])
}
