import { Sparkles, Landmark, ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { LATEST_AI_INSIGHTS, GOV_INCENTIVES } from '../../data/summary.js'

const TAG_STYLES = {
  'Market Trend': 'bg-primary-50 text-primary-700',
  'Competitor Alert': 'bg-rose-50 text-rose-700',
  Opportunity: 'bg-secondary-50 text-secondary-700',
  'Risk Update': 'bg-amber-50 text-amber-700',
}

export default function SummaryCards() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <GlassCard className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[16px] text-ink-900 flex items-center gap-2">
            <span className="size-8 rounded-[10px] bg-primary-50 text-primary-600 flex items-center justify-center">
              <Sparkles className="size-4" strokeWidth={2} />
            </span>
            Latest AI Insights
          </h3>
          <button className="text-[12.5px] font-semibold text-primary-600 flex items-center gap-1">
            View all <ArrowRight className="size-3.5" />
          </button>
        </div>
        <ul className="divide-y divide-ink-100">
          {LATEST_AI_INSIGHTS.map((item) => (
            <li key={item.id} className="py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-ink-800 leading-snug">{item.title}</p>
                <p className="text-[11.5px] text-ink-400 mt-1">{item.time}</p>
              </div>
              <span className={`shrink-0 text-[11px] font-semibold px-2 py-1 rounded-full ${TAG_STYLES[item.tag] ?? 'bg-ink-100 text-ink-600'}`}>
                {item.tag}
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
            Government Incentives & Subsidies
          </h3>
          <button className="text-[12.5px] font-semibold text-primary-600 flex items-center gap-1">
            View all <ArrowRight className="size-3.5" />
          </button>
        </div>
        <ul className="space-y-3">
          {GOV_INCENTIVES.map((item) => (
            <li key={item.id} className="flex items-start gap-3 rounded-[12px] border border-ink-100 bg-white/60 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13.5px] font-semibold text-ink-900">{item.title}</p>
                  <span className="text-[11px] font-medium text-ink-400 shrink-0">{item.region}</span>
                </div>
                <p className="text-[12.5px] text-ink-500 mt-1 leading-snug">{item.benefit}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </section>
  )
}
