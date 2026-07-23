import { motion } from 'framer-motion'
import { MapPin, Bookmark, FileText, Sparkles, BadgeCheck, Scale, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import { MARKET_TYPE_ICONS } from './marketIcons.js'
import { getRegionName } from '../../data/markets.js'
import { MARKET_TYPE_NAMES, COVERAGE_NAMES, trMap } from '../../i18n/dictionaries.js'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'
import MarketBanner from './MarketBanner.jsx'

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus }
const TREND_TONE = { up: 'text-secondary-700 bg-secondary-50', down: 'text-rose-700 bg-rose-50', flat: 'text-ink-500 bg-ink-100' }

export default function MarketCard({ market, photoUrl, isSaved, isCompareSelected, onToggleSave, onToggleCompare, onViewDetails, onAiAnalysis }) {
  const { locale, t } = useLocale()
  const TypeIcon = MARKET_TYPE_ICONS[market.marketType] ?? MARKET_TYPE_ICONS.Universal
  const TrendIcon = TREND_ICON[market.trend]

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="h-full">
      <GlassCard className="p-0 flex flex-col h-full overflow-hidden hover:shadow-soft-lg transition-shadow">
        <MarketBanner market={market} photoUrl={photoUrl} className="h-32 shrink-0 flex items-center justify-center">
          {!photoUrl && (
            <span className="size-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <TypeIcon className="size-7 text-white" strokeWidth={1.5} />
            </span>
          )}
          <span className={`absolute z-10 top-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${TREND_TONE[market.trend]}`}>
            <TrendIcon className="size-3" strokeWidth={2.5} />
          </span>
          <button
            onClick={() => onToggleSave(market.id)}
            title={t('markets.card.save')}
            className={`absolute z-10 top-2.5 left-2.5 size-8 rounded-[10px] flex items-center justify-center backdrop-blur transition-colors ${
              isSaved ? 'bg-white text-secondary-600' : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            <Bookmark className="size-4" strokeWidth={2} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </MarketBanner>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-display font-bold text-[15.5px] text-ink-900 leading-snug">{tr(market.name, locale)}</h3>
          <p className="flex items-center gap-1 text-[12px] text-ink-400 mt-1">
            <MapPin className="size-3.5 shrink-0" strokeWidth={2} />
            {getRegionName(market.regionId, locale)}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 rounded-full px-2 py-0.5">
              {trMap(COVERAGE_NAMES, market.coverage, locale)}
            </span>
            <span className="text-[11px] font-semibold text-ink-600 bg-ink-100 rounded-full px-2 py-0.5">
              {trMap(MARKET_TYPE_NAMES, market.marketType, locale)}
            </span>
            {market.govSupportEligible && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-700 bg-secondary-50 rounded-full px-2 py-0.5">
                <BadgeCheck className="size-3" strokeWidth={2} /> {t('markets.card.govSupport')}
              </span>
            )}
          </div>

          <p className="text-[12.5px] text-ink-500 leading-snug mt-3 line-clamp-2">{tr(market.summary, locale)}</p>

          <div className="flex items-center gap-2 mt-auto pt-4">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => onViewDetails(market.id)}>
              <FileText className="size-3.5" strokeWidth={2} /> {t('markets.card.viewDetails')}
            </Button>
            <Button variant="primary" size="sm" className="flex-1" onClick={() => onAiAnalysis(market.id)}>
              <Sparkles className="size-3.5" strokeWidth={2} /> {t('markets.card.aiAnalysis')}
            </Button>
            <button
              onClick={() => onToggleCompare(market.id)}
              title={t('markets.card.addToCompare')}
              className={`size-9 shrink-0 rounded-[10px] flex items-center justify-center border transition-colors ${
                isCompareSelected ? 'bg-primary-50 border-primary-300 text-primary-600' : 'border-ink-200 text-ink-400 hover:text-primary-600 hover:border-primary-200'
              }`}
            >
              <Scale className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
