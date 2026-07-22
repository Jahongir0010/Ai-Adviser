import MapExplorer from '../features/map/components/MapExplorer.jsx'
import { useLocale } from '../i18n/LocaleContext.jsx'

export default function InteractiveMap() {
  const { t } = useLocale()

  return (
    <div className="flex flex-col gap-5 pb-10 h-full">
      <div>
        <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">{t('map.eyebrow')}</p>
        <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">{t('map.title')}</h1>
        <p className="text-[14px] text-ink-500 mt-1.5 max-w-2xl">{t('map.description')}</p>
      </div>

      <MapExplorer />
    </div>
  )
}
