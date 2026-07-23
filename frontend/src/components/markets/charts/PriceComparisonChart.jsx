import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from '../../dashboard/charts/ChartCard.jsx'
import ChartTooltip from '../../dashboard/charts/ChartTooltip.jsx'
import { getPriceByMarketType } from '../../../data/markets.js'
import { MARKET_TYPE_NAMES, trMap } from '../../../i18n/dictionaries.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function PriceComparisonChart() {
  const { locale, t } = useLocale()
  const data = getPriceByMarketType().map((r) => ({ ...r, name: trMap(MARKET_TYPE_NAMES, r.marketType, locale) }))

  return (
    <ChartCard title={t('markets.charts.priceComparison')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={28} domain={[0, 100]} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="avgPriceIndex" name={t('markets.charts.priceComparison')} fill={CHART_COLORS.amber} radius={[4, 4, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
