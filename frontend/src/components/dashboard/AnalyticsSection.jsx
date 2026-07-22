import SectionHeading from '../ui/SectionHeading.jsx'
import MarketDemandChart from './charts/MarketDemandChart.jsx'
import IndustryGrowthChart from './charts/IndustryGrowthChart.jsx'
import SeasonalTrendsChart from './charts/SeasonalTrendsChart.jsx'
import PopulationDistributionChart from './charts/PopulationDistributionChart.jsx'
import ConsumerBehaviorChart from './charts/ConsumerBehaviorChart.jsx'
import InvestmentForecastChart from './charts/InvestmentForecastChart.jsx'

export default function AnalyticsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Analytics"
        title="National Market Intelligence"
        description="Live indicators aggregated across all 14 regions, refreshed daily by the AI analytics engine."
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
