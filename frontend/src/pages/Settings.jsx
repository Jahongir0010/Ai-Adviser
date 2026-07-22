import { Globe, Check } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard.jsx'
import { useLocale, LOCALES, LOCALE_LABELS } from '../i18n/LocaleContext.jsx'

export default function Settings() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div>
        <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">{t('sidebar.settings')}</p>
        <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">{t('settings.title')}</h1>
        <p className="text-[14px] text-ink-500 mt-1.5 max-w-xl">{t('settings.description')}</p>
      </div>

      <GlassCard className="p-5 md:p-6 max-w-xl">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="size-8 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center">
            <Globe className="size-4" strokeWidth={2} />
          </span>
          <h3 className="font-display font-bold text-[16px] text-ink-900">{t('settings.language.title')}</h3>
        </div>
        <p className="text-[13px] text-ink-500 mt-1 mb-4">{t('settings.language.description')}</p>

        <div className="flex flex-col gap-2">
          {LOCALES.map((code) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className={`flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 text-[14px] font-medium transition-colors ${
                locale === code
                  ? 'bg-primary-50 border-primary-300 text-primary-700'
                  : 'border-ink-200 text-ink-700 hover:border-primary-200 hover:bg-primary-50/40'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-[12px] font-bold text-ink-400 w-7 shrink-0">{LOCALE_LABELS[code].short}</span>
                {LOCALE_LABELS[code].name}
              </span>
              {locale === code && <Check className="size-4" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
