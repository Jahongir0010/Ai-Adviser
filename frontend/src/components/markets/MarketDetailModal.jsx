import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Clock, LayoutGrid, Layers, MapPinned, Check } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import AIAnalysisPanel from './AIAnalysisPanel.jsx'
import AIRecommendationPanel from './AIRecommendationPanel.jsx'
import MarketMiniMap from './MarketMiniMap.jsx'
import BannerPattern from './BannerPattern.jsx'
import { MARKET_TYPE_ICONS, MARKET_TYPE_GRADIENT, PRODUCT_ICONS, FACILITY_ICONS } from './marketIcons.js'
import { getRegionName } from '../../data/markets.js'
import { PRODUCT_NAMES, MARKET_TYPE_NAMES, COVERAGE_NAMES, trMap } from '../../i18n/dictionaries.js'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'

function InfoField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="size-4 text-ink-400 mt-0.5 shrink-0" strokeWidth={2} />
      <div>
        <p className="text-[11px] text-ink-400">{label}</p>
        <p className="text-[13px] font-semibold text-ink-800 mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function MarketDetailModal({ market, onClose, onGenerateIdea, onViewReport, onCompare }) {
  const { locale, t } = useLocale()
  if (!market) return null
  const TypeIcon = MARKET_TYPE_ICONS[market.marketType] ?? MARKET_TYPE_ICONS.Universal
  const gradient = MARKET_TYPE_GRADIENT[market.marketType] ?? MARKET_TYPE_GRADIENT.Universal

  const facilityKeys = Object.keys(FACILITY_ICONS)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm flex items-start md:items-center justify-center p-3 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          key={market.id}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl my-auto"
        >
          <GlassCard className="p-0 overflow-hidden max-h-[92vh] flex flex-col">
            <div className={`relative h-40 shrink-0 flex items-end p-5 bg-gradient-to-br ${gradient}`}>
              <BannerPattern />
              <button
                onClick={onClose}
                className="absolute z-10 top-3 right-3 size-9 rounded-[10px] bg-black/20 text-white flex items-center justify-center hover:bg-black/30 transition-colors"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
              <TypeIcon className="absolute z-10 top-5 left-5 size-8 text-white/70" strokeWidth={1.5} />
              <h2 className="relative z-10 font-display font-bold text-[22px] text-white leading-snug">{tr(market.name, locale)}</h2>
            </div>

            <div className="p-5 md:p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <InfoField icon={MapPin} label={t('markets.detail.address')} value={tr(market.address, locale)} />
                <InfoField icon={MapPinned} label={t('markets.detail.region')} value={getRegionName(market.regionId, locale)} />
                <InfoField icon={Layers} label={t('markets.detail.coverage')} value={trMap(COVERAGE_NAMES, market.coverage, locale)} />
                <InfoField icon={LayoutGrid} label={t('markets.detail.marketType')} value={trMap(MARKET_TYPE_NAMES, market.marketType, locale)} />
                <InfoField icon={Clock} label={t('markets.detail.workingHours')} value={market.workingHours} />
              </div>

              <MarketMiniMap market={market} />

              <div>
                <p className="text-[11.5px] font-semibold text-ink-500 uppercase tracking-wider mb-2">{t('markets.detail.mainProducts')}</p>
                <div className="flex flex-wrap gap-2">
                  {market.products.map((p) => {
                    const Icon = PRODUCT_ICONS[p]
                    return (
                      <span key={p} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-700 bg-ink-50 border border-ink-100 rounded-full px-3 py-1.5">
                        {Icon && <Icon className="size-3.5 text-primary-600" strokeWidth={2} />}
                        {trMap(PRODUCT_NAMES, p, locale)}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11.5px] font-semibold text-ink-500 uppercase tracking-wider mb-2">{t('markets.detail.facilities')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {facilityKeys.map((key) => {
                    const Icon = FACILITY_ICONS[key]
                    const available = market.facilities[key]
                    return (
                      <div
                        key={key}
                        className={`flex items-center gap-2 rounded-[10px] px-3 py-2 text-[12.5px] font-medium border ${
                          available ? 'border-secondary-200 bg-secondary-50 text-secondary-800' : 'border-ink-100 bg-ink-50 text-ink-300'
                        }`}
                      >
                        <Icon className="size-4 shrink-0" strokeWidth={2} />
                        <span className="flex-1">{t(`markets.detail.facility.${key}`)}</span>
                        {available && <Check className="size-3.5 shrink-0" strokeWidth={2.5} />}
                      </div>
                    )
                  })}
                </div>
              </div>

              <AIAnalysisPanel stats={market.stats} />
              <AIRecommendationPanel market={market} onGenerateIdea={onGenerateIdea} onViewReport={onViewReport} onCompare={onCompare} />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
