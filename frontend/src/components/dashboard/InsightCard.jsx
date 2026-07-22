import * as Icons from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import TrendBadge from '../ui/TrendBadge.jsx'

export default function InsightCard({ insight }) {
  const Icon = Icons[insight.icon] ?? Icons.Sparkles
  const accent = insight.accent === 'secondary' ? 'secondary' : 'primary'

  return (
    <GlassCard className="p-4 group hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div
          className={`size-10 rounded-[12px] flex items-center justify-center shrink-0 ${
            accent === 'secondary' ? 'bg-secondary-50 text-secondary-600' : 'bg-primary-50 text-primary-600'
          }`}
        >
          <Icon className="size-[19px]" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-[14px] text-ink-900 leading-snug">{insight.title}</h4>
          <p className="text-[12.5px] text-ink-500 leading-snug mt-1">{insight.summary}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-[16px] text-ink-900">{insight.score}</span>
              <TrendBadge trend={insight.trend} value={insight.trendValue} />
            </div>
            <button className="flex items-center gap-0.5 text-[12.5px] font-semibold text-primary-600 opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
              View Details
              <ChevronRight className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
