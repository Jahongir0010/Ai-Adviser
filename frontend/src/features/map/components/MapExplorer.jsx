import { useCallback, useMemo, useRef } from 'react'
import MapCanvas from './MapCanvas.jsx'
import RegionsLayer from './layers/RegionsLayer.jsx'
import DistrictsLayer from './layers/DistrictsLayer.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import InfoPanel from './InfoPanel.jsx'
import LoadingOverlay from './LoadingOverlay.jsx'
import ErrorBanner from './ErrorBanner.jsx'
import { useMapDrilldown, LEVELS } from '../hooks/useMapDrilldown.js'
import { useRegionBoundaries } from '../hooks/useRegionBoundaries.js'
import { useDistrictBoundaries } from '../hooks/useDistrictBoundaries.js'
import { useMahallaList } from '../hooks/useMahallaList.js'
import { bboxOfFeature, findFeatureByProperty } from '../utils/geometry.js'
import { UZBEKISTAN_BOUNDS } from '../constants.js'

export default function MapExplorer() {
  const mapRef = useRef(null)
  const drilldown = useMapDrilldown()
  const { level, region, district, mahallaId } = drilldown

  const regionsQuery = useRegionBoundaries()
  const districtsQuery = useDistrictBoundaries(region?.id ?? null)
  const mahallaListQuery = useMahallaList(district?.id ?? null)

  const districts = useMemo(
    () => (districtsQuery.data?.features ?? []).map((f) => ({ id: f.properties.districtId, name: f.properties.name })),
    [districtsQuery.data]
  )

  const handleSelectRegionFeature = useCallback(
    (feature) => {
      const { regionId, name } = feature.properties
      drilldown.selectRegion({ id: regionId, name })
      mapRef.current?.flyToBounds(bboxOfFeature(feature))
    },
    [drilldown]
  )

  const handleSelectDistrictFeature = useCallback(
    (feature) => {
      const { districtId, name } = feature.properties
      drilldown.selectDistrict({ id: districtId, name })
      mapRef.current?.flyToBounds(bboxOfFeature(feature))
    },
    [drilldown]
  )

  const handleSelectDistrictFromList = useCallback(
    (districtSummary) => {
      drilldown.selectDistrict(districtSummary)
      const feature = findFeatureByProperty(districtsQuery.data, 'districtId', districtSummary.id)
      if (feature) mapRef.current?.flyToBounds(bboxOfFeature(feature))
    },
    [drilldown, districtsQuery.data]
  )

  const handleGoToCountry = useCallback(() => {
    drilldown.goToCountry()
    mapRef.current?.flyToBounds(UZBEKISTAN_BOUNDS, { padding: 32 })
  }, [drilldown])

  const handleGoToRegion = useCallback(() => {
    drilldown.goToRegion()
    const feature = findFeatureByProperty(regionsQuery.data, 'regionId', region?.id)
    if (feature) mapRef.current?.flyToBounds(bboxOfFeature(feature))
  }, [drilldown, regionsQuery.data, region])

  const handleGoToDistrict = useCallback(() => {
    drilldown.goToDistrict()
    const feature = findFeatureByProperty(districtsQuery.data, 'districtId', district?.id)
    if (feature) mapRef.current?.flyToBounds(bboxOfFeature(feature))
  }, [drilldown, districtsQuery.data, district])

  const activeError = regionsQuery.error ?? districtsQuery.error ?? mahallaListQuery.error
  const isLoading =
    (level === LEVELS.COUNTRY && regionsQuery.loading) ||
    (level === LEVELS.REGION && districtsQuery.loading) ||
    (level === LEVELS.DISTRICT && mahallaListQuery.loading)

  return (
    <div className="relative w-full h-[calc(100vh-160px)] min-h-[560px] rounded-[18px] overflow-hidden border border-ink-100 shadow-soft">
      <MapCanvas ref={mapRef}>
        <RegionsLayer
          data={regionsQuery.data}
          selectedRegionId={region?.id ?? null}
          interactive={level === LEVELS.COUNTRY}
          onSelect={handleSelectRegionFeature}
        />
        {region && (
          <DistrictsLayer
            data={districtsQuery.data}
            selectedDistrictId={district?.id ?? null}
            interactive={level === LEVELS.REGION}
            onSelect={handleSelectDistrictFeature}
          />
        )}
      </MapCanvas>

      <Breadcrumb
        level={level}
        region={region}
        district={district}
        onCountry={handleGoToCountry}
        onRegion={handleGoToRegion}
        onDistrict={handleGoToDistrict}
      />

      {isLoading && <LoadingOverlay />}
      {activeError && <ErrorBanner error={activeError} />}

      <InfoPanel
        level={level}
        region={region}
        district={district}
        districts={districts}
        mahallaId={mahallaId}
        mahallaListQuery={mahallaListQuery}
        onSelectDistrict={handleSelectDistrictFromList}
        onSelectMahalla={drilldown.selectMahalla}
        onBackToDistrict={handleGoToDistrict}
      />
    </div>
  )
}
