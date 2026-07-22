import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { LegendDot } from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { SEASONAL_TRENDS } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'

export default function SeasonalTrendsChart() {
  return (
    <ChartCard
      title="Seasonal Trends"
      subtitle="Sector index by quarter"
      legend={
        <>
          <LegendDot color={CHART_COLORS.primary} label="Retail" />
          <LegendDot color={CHART_COLORS.secondary} label="Tourism" />
          <LegendDot color={CHART_COLORS.amber} label="Agriculture" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={SEASONAL_TRENDS} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barGap={4} barCategoryGap={24}>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(0,91,172,0.05)' }} />
          <Bar dataKey="retail" name="Retail" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="tourism" name="Tourism" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="agriculture" name="Agriculture" fill={CHART_COLORS.amber} radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
