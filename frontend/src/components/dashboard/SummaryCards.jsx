import { Sparkles, Landmark, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { LATEST_AI_INSIGHTS, GOV_INCENTIVES } from '../../data/summary.js'
import { useLocale, tr } from '../../i18n/LocaleContext.jsx'
import { TAGS, trMap, trRegionName } from '../../i18n/dictionaries.js'

const TAG_STYLES = {
  'Market Trend': 'bg-primary-50 text-primary-700',
  'Competitor Alert': 'bg-rose-50 text-rose-700',
  Opportunity: 'bg-secondary-50 text-secondary-700',
  'Risk Update': 'bg-amber-50 text-amber-700',
}

export default function SummaryCards() {
  const { locale, t } = useLocale()

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <GlassCard className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[16px] text-ink-900 flex items-center gap-2">
            <span className="size-8 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center">
              <Sparkles className="size-4" strokeWidth={2} />
            </span>
            {t('summary.latestInsights')}
          </h3>
          <button className="text-[12.5px] font-semibold text-primary-600 flex items-center gap-1">
            {t('summary.viewAll')} <ArrowRight className="size-3.5" />
          </button>
        </div>
        <ul className="divide-y divide-ink-100">
          {LATEST_AI_INSIGHTS.map((item) => (
            <li key={item.id} className="py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-ink-800 leading-snug">{tr(item.title, locale)}</p>
                <p className="text-[11.5px] text-ink-400 mt-1">{tr(item.time, locale)}</p>
              </div>
              <span className={`shrink-0 text-[11px] font-semibold px-2 py-1 rounded-full ${TAG_STYLES[item.tag] ?? 'bg-ink-100 text-ink-600'}`}>
                {trMap(TAGS, item.tag, locale)}
              </span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[16px] text-ink-900 flex items-center gap-2">
            <span className="size-8 rounded-[10px] bg-secondary-50 text-secondary-600 flex items-center justify-center">
              <Landmark className="size-4" strokeWidth={2} />
            </span>
            {t('summary.govIncentives')}
          </h3>
          <button className="text-[12.5px] font-semibold text-primary-600 flex items-center gap-1">
            {t('summary.viewAll')} <ArrowRight className="size-3.5" />
          </button>
        </div>
        <ul className="space-y-3">
          {GOV_INCENTIVES.map((item) => {
            const regionLabel = item.nationwide
              ? t('region.nationwide')
              : item.regionIds.map((id) => trRegionName(id, locale)).join(' / ')
            return (
              <li key={item.id} className="flex items-start gap-3 rounded-[12px] border border-ink-100 bg-white/60 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-ink-900">{tr(item.title, locale)}</p>
                    <span className="text-[11px] font-medium text-ink-400 shrink-0">{regionLabel}</span>
                  </div>
                  <p className="text-[12.5px] text-ink-500 mt-1 leading-snug">{tr(item.benefit, locale)}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </GlassCard>
    </section>
  )
}
