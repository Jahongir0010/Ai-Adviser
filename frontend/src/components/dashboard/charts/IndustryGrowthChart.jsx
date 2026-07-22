import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import ChartCard from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { INDUSTRY_GROWTH } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'

export default function IndustryGrowthChart() {
  const data = [...INDUSTRY_GROWTH].sort((a, b) => b.growth - a.growth)
  return (
    <ChartCard title="Industry Growth" subtitle="YoY growth rate by sector">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 28, left: 8, bottom: 0 }} barCategoryGap={10}>
          <CartesianGrid horizontal={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} unit="%" />
          <YAxis
            type="category"
            dataKey="industry"
            tick={{ fontSize: 11.5, fill: '#3D4657' }}
            axisLine={false}
            tickLine={false}
            width={104}
          />
          <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} cursor={{ fill: 'rgba(0,91,172,0.05)' }} />
          <Bar dataKey="growth" name="Growth" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} maxBarSize={16}>
            <LabelList dataKey="growth" position="right" formatter={(v) => `${v}%`} style={{ fontSize: 11, fontWeight: 600, fill: '#3D4657' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
