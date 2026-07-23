import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { Sparkles } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import ScoreRing from '../ui/ScoreRing.jsx'
import { MARKET_SEASONALITY } from '../../data/markets.js'
import { CHART_COLORS } from '../../utils/chartColors.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'

function toneForRisk(score) {
  if (score <= 33) return CHART_COLORS.secondary
  if (score <= 60) return CHART_COLORS.amber
  return '#F43F5E' // Tailwind rose-500 - matches IdeaCard's high-risk rose tone
}

function ProgressRow({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[12.5px] font-medium text-ink-600">{label}</span>
        <span className="text-[12.5px] font-bold text-ink-900">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

export default function AIAnalysisPanel({ stats }) {
  const { t } = useLocale()
  const riskColor = toneForRisk(stats.risk)

  const bars = [
    { key: 'competition', label: t('markets.analysis.competition'), value: stats.competition, color: CHART_COLORS.primary },
    { key: 'priceLevel', label: t('markets.analysis.priceLevel'), value: stats.priceLevel, color: CHART_COLORS.amber },
    { key: 'logistics', label: t('markets.analysis.logistics'), value: stats.logistics, color: CHART_COLORS.violet },
    { key: 'seasonality', label: t('markets.analysis.seasonality'), value: stats.seasonality, color: CHART_COLORS.magenta },
  ]

  return (
    <GlassCard className="p-5">
      <h3 className="font-display font-bold text-[15px] text-ink-900 flex items-center gap-2 mb-4">
        <Sparkles className="size-[17px] text-primary-600" strokeWidth={2} />
        {t('markets.analysis.title')}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div className="flex flex-col items-center gap-2">
          <ScoreRing value={stats.demand} size={64} color={CHART_COLORS.primary} />
          <span className="text-[11.5px] font-medium text-ink-500 text-center">{t('markets.analysis.demand')}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ScoreRing value={stats.opportunity} size={64} color={CHART_COLORS.secondary} />
          <span className="text-[11.5px] font-medium text-ink-500 text-center">{t('markets.analysis.opportunity')}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ScoreRing value={stats.risk} size={64} color={riskColor} />
          <span className="text-[11.5px] font-medium text-ink-500 text-center">{t('markets.analysis.risk')}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ScoreRing value={stats.investmentAttractiveness} size={64} color={CHART_COLORS.violet} />
          <span className="text-[11.5px] font-medium text-ink-500 text-center">{t('markets.analysis.investment')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
        {bars.map((bar) => (
          <ProgressRow key={bar.key} label={bar.label} value={bar.value} color={bar.color} />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-ink-100">
        <p className="text-[11.5px] font-semibold text-ink-500 uppercase tracking-wider mb-1.5">{t('markets.analysis.seasonality')}</p>
        <div className="h-[46px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MARKET_SEASONALITY} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <Line type="monotone" dataKey="demandIndex" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  )
}
