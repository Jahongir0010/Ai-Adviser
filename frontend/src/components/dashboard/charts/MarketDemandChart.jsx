import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { LegendDot } from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { MARKET_DEMAND } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'

export default function MarketDemandChart() {
  return (
    <ChartCard
      title="Market Demand"
      subtitle="Demand vs. supply index, trailing 12 months"
      legend={
        <>
          <LegendDot color={CHART_COLORS.primary} label="Demand index" />
          <LegendDot color={CHART_COLORS.secondary} label="Supply index" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={MARKET_DEMAND} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="fillDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.28} />
              <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="demand"
            name="Demand"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            fill="url(#fillDemand)"
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="supply"
            name="Supply"
            stroke={CHART_COLORS.secondary}
            strokeWidth={2}
            fill="transparent"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
