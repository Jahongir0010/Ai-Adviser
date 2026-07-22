import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard, { LegendDot } from './ChartCard.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { MARKET_DEMAND } from '../../../data/charts.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'
import { MONTHS, trMap } from '../../../i18n/dictionaries.js'

export default function MarketDemandChart() {
  const { locale, t } = useLocale()
  return (
    <ChartCard
      title={t('chart.marketDemand.title')}
      subtitle={t('chart.marketDemand.subtitle')}
      legend={
        <>
          <LegendDot color={CHART_COLORS.primary} label={t('chart.marketDemand.demand')} />
          <LegendDot color={CHART_COLORS.secondary} label={t('chart.marketDemand.supply')} />
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
          <XAxis
            dataKey="month"
            tickFormatter={(m) => trMap(MONTHS, m, locale)}
            tick={{ fontSize: 11, fill: CHART_AXIS }}
            axisLine={{ stroke: CHART_GRID }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} />
          <Tooltip content={<ChartTooltip />} labelFormatter={(m) => trMap(MONTHS, m, locale)} />
          <Area
            type="monotone"
            dataKey="demand"
            name={t('chart.marketDemand.demand')}
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            fill="url(#fillDemand)"
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="supply"
            name={t('chart.marketDemand.supply')}
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
