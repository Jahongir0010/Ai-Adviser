import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { POPULATION_DISTRIBUTION } from '../../../data/charts.js'
import { CATEGORICAL_ORDER, CHART_COLORS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'
import { trRegionName } from '../../../i18n/dictionaries.js'

const COLORS = [...CATEGORICAL_ORDER, CHART_COLORS.neutral]

export default function PopulationDistributionChart() {
  const { locale, t } = useLocale()
  const total = POPULATION_DISTRIBUTION.reduce((sum, d) => sum + d.value, 0)
  const displayName = (regionId) => (regionId ? trRegionName(regionId, locale) : t('chart.population.other'))
  const data = POPULATION_DISTRIBUTION.map((d) => ({ ...d, name: displayName(d.regionId) }))

  return (
    <ChartCard
      title={t('chart.population.title')}
      subtitle={t('chart.population.subtitle').replace('{total}', total.toFixed(1))}
    >
      <div className="flex items-center gap-4 h-full">
        <div className="w-[45%] h-full min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="92%"
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell key={entry.regionId ?? 'other'} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}M`} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-1.5">
          {data.map((entry, i) => (
            <li key={entry.regionId ?? 'other'} className="flex items-center justify-between gap-2 text-[12.5px]">
              <span className="flex items-center gap-1.5 text-ink-600 truncate">
                <span className="size-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="truncate">{entry.name}</span>
              </span>
              <span className="font-semibold text-ink-900 shrink-0">{entry.value}M</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}
