import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from '../../dashboard/charts/ChartCard.jsx'
import ChartTooltip from '../../dashboard/charts/ChartTooltip.jsx'
import { getMarketDensityByRegion, getRegionName } from '../../../data/markets.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function MarketDensityChart() {
  const { locale, t } = useLocale()
  const density = getMarketDensityByRegion()
  const data = Object.entries(density)
    .map(([regionId, count]) => ({ regionId: Number(regionId), count, name: getRegionName(Number(regionId), locale) }))
    .sort((a, b) => b.count - a.count)

  return (
    <ChartCard title={t('markets.charts.marketDensity')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10.5, fill: CHART_AXIS }}
            axisLine={{ stroke: CHART_GRID }}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={56}
          />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={24} allowDecimals={false} />
          <Tooltip content={<ChartTooltip formatter={(value) => `${value} ${t('markets.charts.marketsSuffix')}`} />} cursor={{ fill: 'rgba(0,91,172,0.05)' }} />
          <Bar dataKey="count" name={t('markets.charts.marketDensity')} fill={CHART_COLORS.violet} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
