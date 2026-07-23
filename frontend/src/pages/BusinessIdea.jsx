import { useMemo, useState } from 'react'
import { Sparkles, RotateCcw, AlertTriangle } from 'lucide-react'
import WizardChat from '../components/businessIdea/WizardChat.jsx'
import GeneratingState from '../components/businessIdea/GeneratingState.jsx'
import IdeaCard from '../components/businessIdea/IdeaCard.jsx'
import IdeaComparison from '../components/businessIdea/IdeaComparison.jsx'
import BusinessPlanView from '../components/businessIdea/BusinessPlanView.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import { apiPost } from '../lib/apiClient.js'
import { useLocale } from '../i18n/LocaleContext.jsx'

const STAGES = { WIZARD: 'wizard', GENERATING: 'generating', RESULTS: 'results', PLAN: 'plan' }

const SOM_FORMAT = new Intl.NumberFormat('uz-UZ')

// The backend returns investment/monthlyProfit/roi as plain numbers; IdeaCard
// and IdeaComparison render them as already-formatted display strings (this
// matched the old mock data's shape, e.g. "$48,000") - format once here so
// those components don't need to know the field's raw numeric shape.
function formatIdeas(rawIdeas) {
  return rawIdeas.map((idea) => ({
    ...idea,
    investment: `${SOM_FORMAT.format(idea.investment)} so'm`,
    monthlyProfit: `${SOM_FORMAT.format(idea.monthlyProfit)} so'm`,
    roi: `${idea.roi}%`,
  }))
}

export default function BusinessIdea() {
  const { t } = useLocale()
  const [stage, setStage] = useState(STAGES.WIZARD)
  const [submitError, setSubmitError] = useState(null)
  const [savedIds, setSavedIds] = useState([])
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [activeIdeaId, setActiveIdeaId] = useState(null)
  const [ideas, setIdeas] = useState([])
  const [answers, setAnswers] = useState(null)
  const [plan, setPlan] = useState(null)
  const [planLoading, setPlanLoading] = useState(false)
  const [planError, setPlanError] = useState(null)

  const compareIdeas = useMemo(() => ideas.filter((i) => compareIds.includes(i.id)), [ideas, compareIds])
  const activeIdea = useMemo(() => ideas.find((i) => i.id === activeIdeaId), [ideas, activeIdeaId])

  function handleWizardComplete(formAnswers) {
    setSubmitError(null)
    setStage(STAGES.GENERATING)
    setAnswers(formAnswers)

    // The minimum-duration timer keeps GeneratingState's 4-step animation from
    // being cut short if the AI call happens to resolve unusually fast.
    Promise.all([apiPost('/ai/biznes-goya', { answers: formAnswers }).then((r) => r.data), new Promise((resolve) => setTimeout(resolve, 3400))])
      .then(([result]) => {
        setIdeas(formatIdeas(result.ideas))
        setStage(STAGES.RESULTS)
      })
      .catch((error) => {
        setSubmitError(error.message)
        setStage(STAGES.WIZARD)
      })
  }

  function handleGeneratePlan(id) {
    const idea = ideas.find((i) => i.id === id)
    setActiveIdeaId(id)
    setStage(STAGES.PLAN)
    setPlan(null)
    setPlanError(null)
    setPlanLoading(true)
    apiPost('/ai/biznes-goya/reja', { idea, answers })
      .then((r) => setPlan(r.data))
      .catch((error) => setPlanError(error.message))
      .finally(() => setPlanLoading(false))
  }

  function toggleSave(id) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleCompare(id) {
    setCompareIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    setShowCompare(true)
  }

  function restart() {
    setStage(STAGES.WIZARD)
    setCompareIds([])
    setShowCompare(false)
    setActiveIdeaId(null)
    setIdeas([])
    setAnswers(null)
    setPlan(null)
    setPlanError(null)
  }

  if (stage === STAGES.PLAN) {
    if (planError) {
      return (
        <div className="max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-3 py-16">
          <AlertTriangle className="size-8 text-rose-400" strokeWidth={1.5} />
          <p className="text-[14px] text-rose-700">{planError}</p>
          <Button variant="secondary" size="sm" onClick={() => setStage(STAGES.RESULTS)}>
            {t('plan.backToIdeas')}
          </Button>
        </div>
      )
    }
    if (planLoading || !plan) return <GeneratingState />
    return <BusinessPlanView plan={plan} idea={activeIdea} onBack={() => setStage(STAGES.RESULTS)} />
  }

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">{t('businessIdea.eyebrow')}</p>
          <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">{t('businessIdea.title')}</h1>
          <p className="text-[14px] text-ink-500 mt-1.5 max-w-xl">{t('businessIdea.description')}</p>
        </div>
        {stage === STAGES.RESULTS && (
          <Button variant="secondary" size="sm" onClick={restart}>
            <RotateCcw className="size-4" strokeWidth={2} /> {t('businessIdea.startOver')}
          </Button>
        )}
      </div>

      {stage === STAGES.WIZARD && (
        <>
          {submitError && (
            <div className="max-w-2xl mx-auto w-full flex items-start gap-2.5 rounded-[14px] bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-[13px] text-rose-700">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" strokeWidth={2} />
              {submitError}
            </div>
          )}
          <WizardChat key={submitError ? 'retry' : 'initial'} onComplete={handleWizardComplete} />
        </>
      )}

      {stage === STAGES.GENERATING && <GeneratingState />}

      {stage === STAGES.RESULTS && (
        <>
          <SectionHeading
            eyebrow={t('businessIdea.resultsEyebrow')}
            title={t('businessIdea.resultsTitle')}
            description={t('businessIdea.resultsDescription')}
            action={
              <span className="hidden sm:flex items-center gap-1.5 text-[12.5px] font-medium text-secondary-700 bg-secondary-50 rounded-full px-3 py-1.5">
                <Sparkles className="size-3.5" /> {t('businessIdea.ideasGenerated').replace('{n}', ideas.length)}
              </span>
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isSaved={savedIds.includes(idea.id)}
                isCompareSelected={compareIds.includes(idea.id)}
                onToggleSave={toggleSave}
                onToggleCompare={toggleCompare}
                onGeneratePlan={handleGeneratePlan}
              />
            ))}
          </div>

          {showCompare && (
            <IdeaComparison
              ideas={compareIdeas}
              onClose={() => setShowCompare(false)}
              onRemove={(id) => setCompareIds((prev) => prev.filter((x) => x !== id))}
            />
          )}
        </>
      )}
    </div>
  )
}
