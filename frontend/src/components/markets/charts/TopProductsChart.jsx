import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from '../../dashboard/charts/ChartCard.jsx'
import ChartTooltip from '../../dashboard/charts/ChartTooltip.jsx'
import { getTopProducts } from '../../../data/markets.js'
import { PRODUCT_NAMES, trMap } from '../../../i18n/dictionaries.js'
import { CHART_COLORS, CHART_GRID, CHART_AXIS } from '../../../utils/chartColors.js'
import { useLocale } from '../../../i18n/LocaleContext.jsx'

export default function TopProductsChart() {
  const { locale, t } = useLocale()
  const data = getTopProducts(8).map((p) => ({ ...p, name: trMap(PRODUCT_NAMES, p.product, locale) }))

  return (
    <ChartCard title={t('markets.charts.topProducts')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid horizontal={false} stroke={CHART_GRID} strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 11, fill: CHART_AXIS }} axisLine={false} tickLine={false} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11.5, fill: CHART_AXIS }} axisLine={false} tickLine={false} width={90} />
          <Tooltip
            content={<ChartTooltip formatter={(value) => `${value} ${t('markets.charts.marketsSuffix')}`} />}
            cursor={{ fill: 'rgba(0,91,172,0.05)' }}
          />
          <Bar dataKey="count" name={t('markets.charts.topProducts')} fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
