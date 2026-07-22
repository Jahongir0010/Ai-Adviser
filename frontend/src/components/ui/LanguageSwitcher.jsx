import { useEffect, useRef, useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLocale, LOCALES, LOCALE_LABELS } from '../../i18n/LocaleContext.jsx'

export default function LanguageSwitcher({ variant = 'topbar' }) {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const isTopbar = variant === 'topbar'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={
          isTopbar
            ? 'flex items-center gap-1.5 h-10 px-3 rounded-[12px] text-ink-500 hover:bg-ink-50 hover:text-primary-600 transition-colors'
            : 'flex items-center gap-2 h-10 px-3.5 rounded-[12px] border border-ink-200 text-ink-700 hover:border-primary-300 hover:text-primary-700 transition-colors'
        }
      >
        <Globe className="size-[18px]" strokeWidth={2} />
        <span className="text-[13px] font-semibold">{LOCALE_LABELS[locale].short}</span>
        <ChevronDown className="size-3.5 text-ink-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-[14px] border border-ink-100 bg-white shadow-soft-lg p-1.5 z-40 animate-fade-up">
          {LOCALES.map((code) => (
            <button
              key={code}
              onClick={() => {
                setLocale(code)
                setOpen(false)
              }}
              className={`w-full flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-colors ${
                locale === code ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-50'
              }`}
            >
              {LOCALE_LABELS[code].name}
              {locale === code && <Check className="size-4" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
