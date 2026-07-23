import { useState } from 'react'
import { Sparkles, Search, MapPin, TrendingUp, Swords, Truck, Tag, Wallet, TrendingUp as ProfitIcon, Lightbulb } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import { MARKETS, REGION_NAMES_BY_ID, getRegionName } from '../../data/markets.js'
import { PRODUCT_NAMES, SALE_TYPES, LEVELS, trMap } from '../../i18n/dictionaries.js'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'

const BASE_PRICE_PER_KG = {
  Fruit: 9000,
  Vegetables: 5000,
  Meat: 65000,
  Dairy: 12000,
  Spices: 45000,
  Bread: 8000,
  Nuts: 70000,
  Flowers: 20000,
  Textile: 150000,
  Shoes: 200000,
}
const AVG_PRICE_INDEX_BASELINE = 55

function levelFromScore(score) {
  if (score >= 70) return 'High'
  if (score >= 40) return 'Medium'
  return 'Low'
}

function estimate({ product, volumeKg, regionId, salesType }) {
  const candidates = MARKETS.filter(
    (m) => (!product || m.products.includes(product)) && (!regionId || String(m.regionId) === String(regionId))
  )
  const pool = candidates.length ? candidates : MARKETS
  const bestMarkets = [...pool].sort((a, b) => b.stats.demand - a.stats.demand).slice(0, 3)
  const avg = (key) => Math.round(pool.reduce((sum, m) => sum + m.stats[key], 0) / pool.length)
  const demand = avg('demand')
  const competition = avg('competition')
  const logistics = avg('logistics')
  const priceIndex = Math.round(pool.reduce((sum, m) => sum + m.avgPriceIndex, 0) / pool.length)

  const basePrice = BASE_PRICE_PER_KG[product] ?? 10000
  const salesMultiplier = salesType === 'Wholesale' ? 0.85 : salesType === 'Export' ? 1.35 : 1
  const sellingPrice = Math.round(basePrice * (priceIndex / AVG_PRICE_INDEX_BASELINE) * salesMultiplier)

  const monthlyRevenue = Math.round((volumeKg || 0) * sellingPrice * (demand / 100))
  const marginRate = salesType === 'Export' ? 0.28 : salesType === 'Wholesale' ? 0.14 : 0.22
  const profit = Math.round(monthlyRevenue * marginRate)

  return {
    bestMarkets,
    demand,
    competitionLevel: levelFromScore(competition),
    transportDifficulty: levelFromScore(100 - logistics),
    sellingPrice,
    monthlyRevenue,
    profit,
  }
}

const selectClass =
  'w-full h-10 rounded-[10px] bg-ink-50 border border-transparent px-3 text-[13px] font-medium text-ink-700 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all appearance-none cursor-pointer'

export default function AISmartSearch() {
  const { locale, t } = useLocale()
  const [form, setForm] = useState({ product: 'Fruit', volumeKg: '', regionId: '', salesType: 'Retail' })
  const [result, setResult] = useState(null)

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function submit(e) {
    e.preventDefault()
    setResult(estimate({ ...form, volumeKg: Number(form.volumeKg) || 0 }))
  }

  return (
    <GlassCard className="p-5 md:p-6">
      <h3 className="font-display font-bold text-[16px] text-ink-900 flex items-center gap-2">
        <Sparkles className="size-[18px] text-primary-600" strokeWidth={2} />
        {t('markets.search.title')}
      </h3>
      <p className="text-[13px] text-ink-500 mt-1 max-w-xl">{t('markets.search.description')}</p>

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <div>
          <label className="text-[11.5px] font-semibold text-ink-500 mb-1 block">{t('markets.search.product')}</label>
          <select value={form.product} onChange={(e) => set('product', e.target.value)} className={selectClass}>
            {Object.keys(PRODUCT_NAMES).map((p) => (
              <option key={p} value={p}>
                {trMap(PRODUCT_NAMES, p, locale)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11.5px] font-semibold text-ink-500 mb-1 block">{t('markets.search.volume')}</label>
          <input
            type="number"
            min={0}
            value={form.volumeKg}
            onChange={(e) => set('volumeKg', e.target.value)}
            placeholder="500"
            className="w-full h-10 rounded-[10px] bg-ink-50 border border-transparent px-3 text-[13px] text-ink-800 placeholder:text-ink-400 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all"
          />
        </div>
        <div>
          <label className="text-[11.5px] font-semibold text-ink-500 mb-1 block">{t('markets.search.region')}</label>
          <select value={form.regionId} onChange={(e) => set('regionId', e.target.value)} className={selectClass}>
            <option value="">{t('markets.filter.allRegions')}</option>
            {Object.keys(REGION_NAMES_BY_ID).map((id) => (
              <option key={id} value={id}>
                {getRegionName(Number(id), locale)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11.5px] font-semibold text-ink-500 mb-1 block">{t('markets.search.salesType')}</label>
          <select value={form.salesType} onChange={(e) => set('salesType', e.target.value)} className={selectClass}>
            {Object.keys(SALE_TYPES).map((s) => (
              <option key={s} value={s}>
                {trMap(SALE_TYPES, s, locale)}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="md" className="sm:col-span-2 lg:col-span-4">
          <Search className="size-4" strokeWidth={2} /> {t('markets.search.submit')}
        </Button>
      </form>

      {result && (
        <div className="mt-6 pt-5 border-t border-ink-100 animate-fade-up">
          <h4 className="font-semibold text-[14px] text-ink-900 flex items-center gap-2 mb-3">
            <Sparkles className="size-4 text-primary-600" strokeWidth={2} /> {t('markets.search.resultsTitle')}
          </h4>

          <div>
            <p className="text-[11.5px] font-semibold text-ink-500 uppercase tracking-wider mb-2">{t('markets.search.bestMarkets')}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.bestMarkets.map((m) => (
                <span key={m.id} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary-700 bg-primary-50 rounded-full px-3 py-1.5">
                  <MapPin className="size-3.5" strokeWidth={2} /> {tr(m.name, locale)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="size-4 text-secondary-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.estimatedDemand')}</p>
                <p className="text-[14px] font-bold text-ink-900">{result.demand}/100</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Swords className="size-4 text-amber-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.competitionLevel')}</p>
                <p className="text-[14px] font-bold text-ink-900">{trMap(LEVELS, result.competitionLevel, locale)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Truck className="size-4 text-violet-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.transportDifficulty')}</p>
                <p className="text-[14px] font-bold text-ink-900">{trMap(LEVELS, result.transportDifficulty, locale)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tag className="size-4 text-primary-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.sellingPrice')}</p>
                <p className="text-[14px] font-bold text-ink-900">{result.sellingPrice.toLocaleString()} so'm/kg</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Wallet className="size-4 text-secondary-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.monthlyRevenue')}</p>
                <p className="text-[14px] font-bold text-ink-900">{result.monthlyRevenue.toLocaleString()} so'm</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ProfitIcon className="size-4 text-secondary-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11px] text-ink-400">{t('markets.search.expectedProfit')}</p>
                <p className="text-[14px] font-bold text-ink-900">{result.profit.toLocaleString()} so'm</p>
              </div>
            </div>
          </div>

          {result.bestMarkets[0] && (
            <div className="flex items-start gap-2.5 mt-4 rounded-[12px] bg-primary-50 px-3.5 py-3">
              <Lightbulb className="size-4 text-primary-600 mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-[11.5px] font-semibold text-primary-700 uppercase tracking-wider">{t('markets.search.recommendation')}</p>
                <p className="text-[13px] text-ink-700 mt-1">{tr(result.bestMarkets[0].aiRecommendation, locale)}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  )
}
