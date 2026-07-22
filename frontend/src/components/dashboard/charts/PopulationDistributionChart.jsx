import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { POPULATION_DISTRIBUTION } from '../../../data/charts.js'
import { CATEGORICAL_ORDER, CHART_COLORS } from '../../../utils/chartColors.js'

const COLORS = [...CATEGORICAL_ORDER, CHART_COLORS.neutral]

export default function PopulationDistributionChart() {
  const total = POPULATION_DISTRIBUTION.reduce((sum, d) => sum + d.value, 0)
  return (
    <ChartCard title="Population Distribution" subtitle={`By region, million people (total ${total.toFixed(1)}M)`}>
      <div className="flex items-center gap-4 h-full">
        <div className="w-[45%] h-full min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={POPULATION_DISTRIBUTION}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="92%"
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {POPULATION_DISTRIBUTION.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}M`} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-1.5">
          {POPULATION_DISTRIBUTION.map((entry, i) => (
            <li key={entry.name} className="flex items-center justify-between gap-2 text-[12.5px]">
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
