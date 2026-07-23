import { motion } from 'framer-motion'
import { Store, MapPinned, Boxes, Sparkles, TrendingUp } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import { useLocale } from '../../i18n/LocaleContext.jsx'

function StatCard({ icon: Icon, tone, value, trend, label, hint }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
      <GlassCard className="p-5 h-full">
        <div className="flex items-start justify-between">
          <span className={`size-10 rounded-[12px] flex items-center justify-center ${tone.bg} ${tone.text}`}>
            <Icon className="size-5" strokeWidth={2} />
          </span>
          {trend != null && (
            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-secondary-700 bg-secondary-50 rounded-full px-2 py-0.5">
              <TrendingUp className="size-3" strokeWidth={2.5} />+{trend}%
            </span>
          )}
        </div>
        <p className="font-display font-bold text-[28px] text-ink-900 mt-3 leading-none">{value}</p>
        <p className="text-[13px] font-semibold text-ink-700 mt-1.5">{label}</p>
        <p className="text-[12px] text-ink-400 mt-0.5">{hint}</p>
      </GlassCard>
    </motion.div>
  )
}

export default function StatsRow({ totalMarkets, totalRegions, totalCategories, aiAnalyzedCount }) {
  const { t } = useLocale()

  const cards = [
    {
      icon: Store,
      tone: { bg: 'bg-primary-50', text: 'text-primary-600' },
      value: totalMarkets,
      trend: 8,
      label: t('markets.stat.totalMarkets'),
      hint: t('markets.stat.totalMarketsHint'),
    },
    {
      icon: MapPinned,
      tone: { bg: 'bg-secondary-50', text: 'text-secondary-700' },
      value: totalRegions,
      label: t('markets.stat.regions'),
      hint: t('markets.stat.regionsHint'),
    },
    {
      icon: Boxes,
      tone: { bg: 'bg-amber-50', text: 'text-amber-700' },
      value: totalCategories,
      label: t('markets.stat.categories'),
      hint: t('markets.stat.categoriesHint'),
    },
    {
      icon: Sparkles,
      tone: { bg: 'bg-violet-50', text: 'text-violet-700' },
      value: `${aiAnalyzedCount}%`,
      label: t('markets.stat.aiAnalyzed'),
      hint: t('markets.stat.aiAnalyzedHint'),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  )
}
