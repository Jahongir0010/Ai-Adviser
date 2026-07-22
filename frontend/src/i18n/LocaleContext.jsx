import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { UI } from './ui.js'

const LocaleContext = createContext(null)
const STORAGE_KEY = 'ai-adviser-locale'
export const LOCALES = ['en', 'uz', 'ru']

export const LOCALE_LABELS = {
  en: { name: 'English', short: 'EN' },
  uz: { name: "O'zbekcha", short: 'UZ' },
  ru: { name: 'Русский', short: 'RU' },
}

function readInitialLocale() {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return LOCALES.includes(stored) ? stored : 'en'
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  function setLocale(next) {
    if (LOCALES.includes(next)) setLocaleState(next)
  }

  const t = useMemo(() => {
    return (key) => {
      const entry = UI[key]
      if (!entry) return key
      return entry[locale] ?? entry.en ?? key
    }
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}

// Resolves a translatable field: either a plain string (returned as-is) or an
// { en, uz, ru } object (picks current locale, falling back to English).
export function tr(field, locale) {
  if (field == null) return field
  if (typeof field === 'string') return field
  return field[locale] ?? field.en ?? ''
}

// Same as tr(), but maps over an array of translatable fields.
export function trList(list, locale) {
  return (list ?? []).map((item) => tr(item, locale))
}
