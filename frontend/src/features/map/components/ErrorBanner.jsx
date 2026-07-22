import { AlertTriangle } from 'lucide-react'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function ErrorBanner({ error }) {
  const { t } = useLocale()
  if (!error) return null

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-rose-50/95 backdrop-blur px-3.5 py-2 border border-rose-200 shadow-soft text-[12.5px] font-medium text-rose-700 max-w-[90%]">
      <AlertTriangle className="size-4 shrink-0" strokeWidth={2} />
      <span className="truncate">{error.message ?? t('map.error')}</span>
    </div>
  )
}
