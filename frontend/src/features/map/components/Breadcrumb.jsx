import { ChevronRight, Map as MapIcon } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext.jsx'
import { LEVELS } from '../hooks/useMapDrilldown.js'

export default function Breadcrumb({ level, region, district, onCountry, onRegion, onDistrict }) {
  const { t } = useLocale()

  return (
    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 flex-wrap max-w-[calc(100%-220px)] rounded-full bg-white/90 backdrop-blur px-3 py-1.5 border border-ink-100 shadow-soft text-[13px] font-medium">
      <button
        onClick={onCountry}
        className={`flex items-center gap-1 shrink-0 hover:underline ${
          level === LEVELS.COUNTRY ? 'text-ink-900 font-semibold' : 'text-primary-700'
        }`}
      >
        <MapIcon className="size-3.5" strokeWidth={2} /> {t('map.uzbekistan')}
      </button>
      {region && (
        <>
          <ChevronRight className="size-3.5 text-ink-300 shrink-0" />
          <button
            onClick={onRegion}
            className={`hover:underline shrink-0 truncate max-w-[160px] ${
              level === LEVELS.REGION ? 'text-ink-900 font-semibold' : 'text-primary-700'
            }`}
          >
            {region.name}
          </button>
        </>
      )}
      {district && (
        <>
          <ChevronRight className="size-3.5 text-ink-300 shrink-0" />
          <button
            onClick={onDistrict}
            className={`hover:underline shrink-0 truncate max-w-[160px] ${
              level === LEVELS.DISTRICT || level === LEVELS.MAHALLA ? 'text-ink-900 font-semibold' : 'text-primary-700'
            }`}
          >
            {district.name}
          </button>
        </>
      )}
    </div>
  )
}
