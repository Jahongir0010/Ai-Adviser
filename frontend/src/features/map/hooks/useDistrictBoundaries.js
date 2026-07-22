import { useCallback } from 'react'
import { useFetch } from './useFetch.js'
import { getDistrictBoundariesByRegion } from '../api/geoApi.js'

/** District boundaries for a single region - only fetched once a region is selected. */
export function useDistrictBoundaries(regionId) {
  const fetcher = useCallback((signal) => getDistrictBoundariesByRegion(regionId, { signal }), [regionId])
  return useFetch(fetcher, [regionId], { enabled: regionId != null })
}
