import { Search, Sparkles, RotateCcw } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import { MARKET_TYPES, COVERAGE_LEVELS } from '../../data/markets.js'
import { PRODUCT_NAMES, MARKET_TYPE_NAMES, COVERAGE_NAMES, trMap } from '../../i18n/dictionaries.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'

const selectClass =
  'h-10 rounded-[10px] bg-ink-50 border border-transparent px-3 text-[13px] font-medium text-ink-700 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all appearance-none cursor-pointer'

export default function FilterToolbar({ filters, onChange, regions, onReset, isAiFilterActive, onToggleAiFilter }) {
  const { locale, t } = useLocale()
  const productKeys = Object.keys(PRODUCT_NAMES)

  function set(key, value) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <GlassCard className="sticky top-3 z-20 p-3 flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-[15px] text-ink-400" strokeWidth={2} />
        <input
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
          placeholder={t('markets.filter.searchPlaceholder')}
          className="w-full h-10 rounded-[10px] bg-ink-50 border border-transparent pl-9 pr-3 text-[13px] text-ink-800 placeholder:text-ink-400 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all"
        />
      </div>

      <select value={filters.regionId} onChange={(e) => set('regionId', e.target.value)} className={selectClass}>
        <option value="">{t('markets.filter.allRegions')}</option>
        {regions.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <select value={filters.marketType} onChange={(e) => set('marketType', e.target.value)} className={selectClass}>
        <option value="">{t('markets.filter.allTypes')}</option>
        {MARKET_TYPES.map((type) => (
          <option key={type} value={type}>
            {trMap(MARKET_TYPE_NAMES, type, locale)}
          </option>
        ))}
      </select>

      <select value={filters.product} onChange={(e) => set('product', e.target.value)} className={selectClass}>
        <option value="">{t('markets.filter.allCategories')}</option>
        {productKeys.map((p) => (
          <option key={p} value={p}>
            {trMap(PRODUCT_NAMES, p, locale)}
          </option>
        ))}
      </select>

      <select value={filters.coverage} onChange={(e) => set('coverage', e.target.value)} className={selectClass}>
        <option value="">{t('markets.filter.allCoverage')}</option>
        {COVERAGE_LEVELS.map((c) => (
          <option key={c} value={c}>
            {trMap(COVERAGE_NAMES, c, locale)}
          </option>
        ))}
      </select>

      <Button
        variant={isAiFilterActive ? 'primary' : 'secondary'}
        size="sm"
        onClick={onToggleAiFilter}
        className="shrink-0"
      >
        <Sparkles className="size-4" strokeWidth={2} />
        {isAiFilterActive ? t('markets.filter.aiSmartFilterActive') : t('markets.filter.aiSmartFilter')}
      </Button>

      <button
        onClick={onReset}
        title={t('markets.filter.reset')}
        className="size-10 shrink-0 rounded-[10px] flex items-center justify-center border border-ink-200 text-ink-400 hover:text-primary-600 hover:border-primary-200 transition-colors"
      >
        <RotateCcw className="size-4" strokeWidth={2} />
      </button>
    </GlassCard>
  )
}
