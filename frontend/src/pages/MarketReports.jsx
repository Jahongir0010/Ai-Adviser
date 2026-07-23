import { useMemo, useState } from 'react'
import { Store } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard.jsx'
import StatsRow from '../components/markets/StatsRow.jsx'
import FilterToolbar from '../components/markets/FilterToolbar.jsx'
import MarketsMap from '../components/markets/MarketsMap.jsx'
import MarketCard from '../components/markets/MarketCard.jsx'
import MarketDetailModal from '../components/markets/MarketDetailModal.jsx'
import MarketComparison from '../components/markets/MarketComparison.jsx'
import AISmartSearch from '../components/markets/AISmartSearch.jsx'
import { MARKETS, REGION_NAMES_BY_ID, getRegionName } from '../data/markets.js'
import { PRODUCT_NAMES } from '../i18n/dictionaries.js'
import { useLocale } from '../i18n/LocaleContext.jsx'

const EMPTY_FILTERS = { search: '', regionId: '', marketType: '', product: '', coverage: '' }

export default function MarketReports() {
  const { locale, t } = useLocale()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [aiFilterActive, setAiFilterActive] = useState(false)
  const [savedIds, setSavedIds] = useState([])
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [activeMarketId, setActiveMarketId] = useState(null)

  const regions = useMemo(
    () => Object.keys(REGION_NAMES_BY_ID).map((id) => ({ id, name: getRegionName(Number(id), locale) })).sort((a, b) => a.name.localeCompare(b.name)),
    [locale]
  )

  const filteredMarkets = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    let list = MARKETS.filter((m) => {
      if (term && !m.name.en.toLowerCase().includes(term) && !m.name.uz.toLowerCase().includes(term) && !m.name.ru.toLowerCase().includes(term)) return false
      if (filters.regionId && String(m.regionId) !== String(filters.regionId)) return false
      if (filters.marketType && m.marketType !== filters.marketType) return false
      if (filters.product && !m.products.includes(filters.product)) return false
      if (filters.coverage && m.coverage !== filters.coverage) return false
      return true
    })
    if (aiFilterActive) list = [...list].sort((a, b) => b.stats.opportunity - a.stats.opportunity)
    return list
  }, [filters, aiFilterActive])

  const activeMarket = useMemo(() => MARKETS.find((m) => m.id === activeMarketId) ?? null, [activeMarketId])
  const compareMarkets = useMemo(() => MARKETS.filter((m) => compareIds.includes(m.id)), [compareIds])

  function toggleSave(id) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
    setShowCompare(true)
  }
  function handleGenerateIdea() {
    setActiveMarketId(null)
  }
  function handleViewReport() {
    setActiveMarketId(null)
  }
  function handleCompareFromPanel(market) {
    toggleCompare(market.id)
    setActiveMarketId(null)
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div>
        <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">{t('markets.eyebrow')}</p>
        <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">{t('markets.title')}</h1>
        <p className="text-[14px] text-ink-500 mt-1.5 max-w-2xl">{t('markets.description')}</p>
      </div>

      <StatsRow
        totalMarkets={MARKETS.length}
        totalRegions={Object.keys(REGION_NAMES_BY_ID).length}
        totalCategories={Object.keys(PRODUCT_NAMES).length}
        aiAnalyzedCount={100}
      />

      <FilterToolbar
        filters={filters}
        onChange={setFilters}
        regions={regions}
        onReset={() => {
          setFilters(EMPTY_FILTERS)
          setAiFilterActive(false)
        }}
        isAiFilterActive={aiFilterActive}
        onToggleAiFilter={() => setAiFilterActive((v) => !v)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <div className="xl:col-span-2 xl:self-start xl:sticky xl:top-[92px]">
          <MarketsMap
            selectedRegionId={filters.regionId || null}
            onSelectRegion={(regionId) => setFilters((prev) => ({ ...prev, regionId: regionId ? String(regionId) : '' }))}
          />
        </div>

        <div className="xl:col-span-3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[15px] text-ink-900 flex items-center gap-2">
              <Store className="size-[17px] text-primary-600" strokeWidth={2} />
              {t('markets.list.title')}
            </h3>
            <span className="text-[12.5px] text-ink-400">{t('markets.list.count').replace('{n}', filteredMarkets.length)}</span>
          </div>

          {filteredMarkets.length === 0 ? (
            <GlassCard className="p-10 flex flex-col items-center text-center text-ink-400">
              <Store className="size-8 mb-3 text-ink-300" strokeWidth={1.5} />
              <p className="text-[13.5px] font-medium text-ink-600">{t('markets.list.empty.title')}</p>
              <p className="text-[12px] mt-1 max-w-[280px]">{t('markets.list.empty.description')}</p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  isSaved={savedIds.includes(market.id)}
                  isCompareSelected={compareIds.includes(market.id)}
                  onToggleSave={toggleSave}
                  onToggleCompare={toggleCompare}
                  onViewDetails={setActiveMarketId}
                  onAiAnalysis={setActiveMarketId}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showCompare && (
        <MarketComparison
          markets={compareMarkets}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
        />
      )}

      <AISmartSearch />

      <MarketDetailModal
        market={activeMarket}
        onClose={() => setActiveMarketId(null)}
        onGenerateIdea={handleGenerateIdea}
        onViewReport={handleViewReport}
        onCompare={handleCompareFromPanel}
      />
    </div>
  )
}
