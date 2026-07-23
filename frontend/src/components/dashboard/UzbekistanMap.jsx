import { useMemo, useState } from 'react'
import MapCanvas from '../../features/map/components/MapCanvas.jsx'
import PolygonLayer from '../../features/map/components/layers/PolygonLayer.jsx'
import { useRegionBoundaries } from '../../features/map/hooks/useRegionBoundaries.js'
import { REGIONS } from '../../data/regions.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'
import { trRegionName } from '../../i18n/dictionaries.js'

// Numeric backend regionId (see backend/data/regions.json) -> this app's
// string region slug (the keys data/regions.js and i18n REGION_NAMES use).
const REGION_SLUG_BY_ID = {
  1: 'andijon',
  2: 'buxoro',
  3: 'jizzax',
  4: 'navoiy',
  5: 'namangan',
  6: 'samarqand',
  7: 'sirdaryo',
  8: 'surxondaryo',
  9: 'toshkent_v',
  10: 'toshkent_c',
  11: 'fargona',
  12: 'xorazm',
  13: 'qashqadaryo',
  14: 'qoraqalpogiston',
}
const REGION_ID_BY_SLUG = Object.fromEntries(Object.entries(REGION_SLUG_BY_ID).map(([id, slug]) => [slug, Number(id)]))

const SCORES = Object.values(REGIONS).map((r) => r.aiOpportunityScore)
const SCORE_MIN = Math.min(...SCORES)
const SCORE_MAX = Math.max(...SCORES)
const PRIMARY = [0, 91, 172] // primary-600
const SECONDARY = [0, 168, 107] // secondary-500

function scoreToColor(score) {
  const t = Math.min(Math.max((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN || 1), 0), 1)
  const mix = (a, b) => Math.round(a + (b - a) * t)
  return `rgb(${mix(PRIMARY[0], SECONDARY[0])},${mix(PRIMARY[1], SECONDARY[1])},${mix(PRIMARY[2], SECONDARY[2])})`
}

/** ['match', ['get','regionId'], id, color, id, color, ..., fallback] */
function buildFillColorExpression() {
  const expr = ['match', ['get', 'regionId']]
  for (const [id, slug] of Object.entries(REGION_SLUG_BY_ID)) {
    expr.push(Number(id), scoreToColor(REGIONS[slug]?.aiOpportunityScore ?? 50))
  }
  expr.push('#EEF3F9')
  return expr
}

/** ['match', ['get','regionId'], id, translatedName, id, translatedName, ..., ''] - rebuilt per locale. */
function buildLabelExpression(locale) {
  const expr = ['match', ['get', 'regionId']]
  for (const [id, slug] of Object.entries(REGION_SLUG_BY_ID)) {
    expr.push(Number(id), trRegionName(slug, locale))
  }
  expr.push('')
  return expr
}

export default function UzbekistanMap({ selectedId, onSelect }) {
  const { locale, t } = useLocale()
  const regionsQuery = useRegionBoundaries()
  const [hoveredRegionId, setHoveredRegionId] = useState(null)

  const fillColor = useMemo(() => buildFillColorExpression(), [])
  const labelExpression = useMemo(() => buildLabelExpression(locale), [locale])

  const selectedRegionId = REGION_ID_BY_SLUG[selectedId] ?? null
  const lineWidth = useMemo(() => {
    const ids = [...new Set([selectedRegionId, hoveredRegionId].filter((v) => v != null))]
    if (ids.length === 0) return 1.4
    const expr = ['match', ['get', 'regionId']]
    for (const id of ids) expr.push(id, id === selectedRegionId ? 3 : 2.2)
    expr.push(1.4)
    return expr
  }, [selectedRegionId, hoveredRegionId])

  function handleSelect(feature) {
    const slug = REGION_SLUG_BY_ID[feature.properties.regionId]
    if (slug) onSelect(slug)
  }

  function handleHover(feature) {
    setHoveredRegionId(feature ? feature.properties.regionId : null)
  }

  return (
    <div className="relative">
      <div className="relative h-[440px] rounded-[14px] overflow-hidden border border-ink-100">
        <MapCanvas>
          {regionsQuery.data && (
            <PolygonLayer
              id="dashboard-regions"
              data={regionsQuery.data}
              idProperty="regionId"
              selectedId={null}
              interactive
              showLabels
              fillColor={fillColor}
              fillOpacity={0.86}
              lineColor="#ffffff"
              lineWidth={lineWidth}
              labelExpression={labelExpression}
              onSelect={handleSelect}
              onHover={handleHover}
            />
          )}
        </MapCanvas>

        {hoveredRegionId != null && (
          <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 border border-ink-100 shadow-soft text-[12.5px] font-semibold text-ink-800 pointer-events-none">
            {trRegionName(REGION_SLUG_BY_ID[hoveredRegionId], locale)}
          </div>
        )}
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 border border-ink-100 shadow-soft">
        <span className="text-[11px] font-medium text-ink-500">{t('map.opportunityScore')}</span>
        <span className="h-2 w-20 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500" />
        <span className="text-[11px] text-ink-400">{t('map.lowToHigh')}</span>
      </div>
    </div>
  )
}
