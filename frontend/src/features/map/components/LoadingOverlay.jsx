import { Loader2 } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function LoadingOverlay() {
  const { t } = useLocale()
  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 border border-ink-100 shadow-soft text-[12.5px] font-medium text-ink-600">
      <Loader2 className="size-3.5 animate-spin text-primary-600" />
      {t('map.loading')}
    </div>
  )
}
