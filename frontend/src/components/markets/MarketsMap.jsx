import { useMemo, useState } from 'react'
import { MapPinned } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import MapCanvas from '../../features/map/components/MapCanvas.jsx'
import PolygonLayer from '../../features/map/components/layers/PolygonLayer.jsx'
import { useRegionBoundaries } from '../../features/map/hooks/useRegionBoundaries.js'
import { getMarketDensityByRegion } from '../../data/markets.js'
import { CHART_COLORS } from '../../utils/chartColors.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'

/** Sequential encoding: one hue (brand primary), intensity = fill-opacity. */
function buildDensityOpacityExpression(density, selectedRegionId) {
  const counts = Object.values(density)
  const max = Math.max(1, ...counts)
  const expr = ['match', ['get', 'regionId']]
  for (const [regionId, count] of Object.entries(density)) {
    const base = 0.12 + (count / max) * 0.62
    const isSelected = String(selectedRegionId) === String(regionId)
    expr.push(Number(regionId), isSelected ? Math.min(base + 0.2, 0.95) : base)
  }
  expr.push(0.04) // fallback for regions with no markets
  return expr
}

export default function MarketsMap({ selectedRegionId, onSelectRegion }) {
  const { t } = useLocale()
  const regionsQuery = useRegionBoundaries()
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const density = useMemo(() => getMarketDensityByRegion(), [])

  const fillOpacity = useMemo(() => buildDensityOpacityExpression(density, selectedRegionId), [density, selectedRegionId])

  function handleSelect(feature) {
    const { regionId } = feature.properties
    onSelectRegion(String(regionId) === String(selectedRegionId) ? null : regionId)
  }

  return (
    <GlassCard className="p-4 flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[14.5px] text-ink-900 flex items-center gap-2">
          <MapPinned className="size-[17px] text-primary-600" strokeWidth={2} />
          {t('markets.map.title')}
        </h3>
        <span className="text-[11.5px] text-ink-400">{t('markets.map.hint')}</span>
      </div>

      <div className="relative flex-1 rounded-[14px] overflow-hidden border border-ink-100">
        <MapCanvas>
          {regionsQuery.data && (
            <PolygonLayer
              id="markets-regions"
              data={regionsQuery.data}
              idProperty="regionId"
              selectedId={null}
              interactive
              showLabels={false}
              fillColor={CHART_COLORS.primary}
              lineColor={CHART_COLORS.primary}
              fillOpacity={fillOpacity}
              onSelect={handleSelect}
              onHover={setHoveredRegion}
            />
          )}
        </MapCanvas>

        {hoveredRegion && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-2 border border-ink-100 shadow-soft text-[12.5px] font-medium text-ink-700 pointer-events-none">
            {hoveredRegion.properties.name}
            <span className="text-primary-600 font-bold">
              {(density[hoveredRegion.properties.regionId] ?? 0) > 0
                ? t('markets.map.marketsCount').replace('{n}', density[hoveredRegion.properties.regionId])
                : t('markets.map.noMarkets')}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3 text-[11px] text-ink-400">
        <span>{t('markets.map.densityLow')}</span>
        <span className="h-2 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${CHART_COLORS.primary}1a, ${CHART_COLORS.primary})` }} />
        <span>{t('markets.map.densityHigh')}</span>
      </div>
    </GlassCard>
  )
}
