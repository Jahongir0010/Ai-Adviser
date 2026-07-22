import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { LegendDot } from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { INVESTMENT_FORECAST } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'

export default function InvestmentForecastChart() {
  return (
    <ChartCard
      title="Investment Forecast"
      subtitle="FDI vs. domestic investment, $ billion"
      legend={
        <>
          <LegendDot color={CHART_COLORS.primary} label="Foreign direct investment" />
          <LegendDot color={CHART_COLORS.secondary} label="Domestic investment" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={INVESTMENT_FORECAST} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="fillFdi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.25} />
              <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillDomestic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.secondary} stopOpacity={0.22} />
              <stop offset="100%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} unit="B" />
          <Tooltip content={<ChartTooltip formatter={(v) => `$${v}B`} />} />
          <Area type="monotone" dataKey="fdi" name="FDI" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#fillFdi)" activeDot={{ r: 4 }} />
          <Area
            type="monotone"
            dataKey="domestic"
            name="Domestic"
            stroke={CHART_COLORS.secondary}
            strokeWidth={2}
            fill="url(#fillDomestic)"
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
