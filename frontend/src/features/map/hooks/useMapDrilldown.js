import { useCallback, useMemo, useState } from 'react'

export const LEVELS = {
  COUNTRY: 'country',
  REGION: 'region',
  DISTRICT: 'district',
  MAHALLA: 'mahalla',
}

const INITIAL_STATE = { level: LEVELS.COUNTRY, region: null, district: null, mahallaId: null }

/**
 * Single source of truth for "where the user is" in the country -> region ->
 * district -> mahalla drill-down. region/district are kept as {id, name}
 * (read straight off the clicked GeoJSON feature's properties) so no extra
 * network round-trip is needed just to render a breadcrumb.
 */
export function useMapDrilldown() {
  const [state, setState] = useState(INITIAL_STATE)

  const selectRegion = useCallback((region) => {
    setState({ level: LEVELS.REGION, region, district: null, mahallaId: null })
  }, [])

  const selectDistrict = useCallback((district) => {
    setState((prev) => ({ ...prev, level: LEVELS.DISTRICT, district, mahallaId: null }))
  }, [])

  const selectMahalla = useCallback((mahallaId) => {
    setState((prev) => ({ ...prev, level: LEVELS.MAHALLA, mahallaId }))
  }, [])

  const goToCountry = useCallback(() => setState(INITIAL_STATE), [])

  const goToRegion = useCallback(() => {
    setState((prev) => ({ level: LEVELS.REGION, region: prev.region, district: null, mahallaId: null }))
  }, [])

  const goToDistrict = useCallback(() => {
    setState((prev) => ({ ...prev, level: LEVELS.DISTRICT, mahallaId: null }))
  }, [])

  return useMemo(
    () => ({ ...state, selectRegion, selectDistrict, selectMahalla, goToCountry, goToRegion, goToDistrict }),
    [state, selectRegion, selectDistrict, selectMahalla, goToCountry, goToRegion, goToDistrict]
  )
}
