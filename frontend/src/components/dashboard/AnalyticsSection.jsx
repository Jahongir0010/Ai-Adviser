import SectionHeading from '../ui/SectionHeading.jsx'
import MarketDemandChart from './charts/MarketDemandChart.jsx'
import IndustryGrowthChart from './charts/IndustryGrowthChart.jsx'
import SeasonalTrendsChart from './charts/SeasonalTrendsChart.jsx'
import PopulationDistributionChart from './charts/PopulationDistributionChart.jsx'
import ConsumerBehaviorChart from './charts/ConsumerBehaviorChart.jsx'
import InvestmentForecastChart from './charts/InvestmentForecastChart.jsx'
import { useLocale } from '../../i18n/LocaleContext.jsx'

export default function AnalyticsSection() {
  const { t } = useLocale()
  return (
    <section>
      <SectionHeading
        eyebrow={t('analytics.eyebrow')}
        title={t('analytics.title')}
        description={t('analytics.description')}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <MarketDemandChart />
        <IndustryGrowthChart />
        <SeasonalTrendsChart />
        <PopulationDistributionChart />
        <ConsumerBehaviorChart />
        <InvestmentForecastChart />
      </div>
    </section>
  )
}
