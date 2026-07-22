import { useCallback } from 'react'
import { useFetch } from './useFetch.js'
import { getDistrictMahallas } from '../api/geoApi.js'

/** Full mahalla records (stats included) for a single district. */
export function useMahallaList(districtId) {
  const fetcher = useCallback((signal) => getDistrictMahallas(districtId, { signal }), [districtId])
  return useFetch(fetcher, [districtId], { enabled: districtId != null })
}
