import { useCallback } from 'react'
import { useFetch } from './useFetch.js'
import { getMahalla } from '../api/geoApi.js'

/** Single mahalla's full record - used as a fallback when it isn't already in a loaded list. */
export function useMahallaDetail(mahallaId) {
  const fetcher = useCallback((signal) => getMahalla(mahallaId, { signal }), [mahallaId])
  return useFetch(fetcher, [mahallaId], { enabled: mahallaId != null })
}
