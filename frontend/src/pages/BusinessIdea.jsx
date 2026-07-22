import { useMemo, useState } from 'react'
import { Sparkles, RotateCcw } from 'lucide-react'
import WizardChat from '../components/businessIdea/WizardChat.jsx'
import GeneratingState from '../components/businessIdea/GeneratingState.jsx'
import IdeaCard from '../components/businessIdea/IdeaCard.jsx'
import IdeaComparison from '../components/businessIdea/IdeaComparison.jsx'
import BusinessPlanView from '../components/businessIdea/BusinessPlanView.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import { GENERATED_IDEAS, BUSINESS_PLAN } from '../data/ideas.js'

const STAGES = { WIZARD: 'wizard', GENERATING: 'generating', RESULTS: 'results', PLAN: 'plan' }

export default function BusinessIdea() {
  const [stage, setStage] = useState(STAGES.WIZARD)
  const [savedIds, setSavedIds] = useState([])
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [activeIdeaId, setActiveIdeaId] = useState(null)

  const compareIdeas = useMemo(() => GENERATED_IDEAS.filter((i) => compareIds.includes(i.id)), [compareIds])
  const activeIdea = useMemo(() => GENERATED_IDEAS.find((i) => i.id === activeIdeaId), [activeIdeaId])

  function handleWizardComplete() {
    setStage(STAGES.GENERATING)
    setTimeout(() => setStage(STAGES.RESULTS), 3400)
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
  }

  if (stage === STAGES.PLAN) {
    return <BusinessPlanView plan={BUSINESS_PLAN} idea={activeIdea} onBack={() => setStage(STAGES.RESULTS)} />
  }

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-wider uppercase text-primary-600 mb-1.5">AI Business Discovery</p>
          <h1 className="font-display font-bold text-[26px] md:text-[30px] text-ink-900 tracking-tight">Find Your Next Business Idea</h1>
          <p className="text-[14px] text-ink-500 mt-1.5 max-w-xl">
            Answer a few guided questions and let AI generate personalized, data-backed business opportunities.
          </p>
        </div>
        {stage === STAGES.RESULTS && (
          <Button variant="secondary" size="sm" onClick={restart}>
            <RotateCcw className="size-4" strokeWidth={2} /> Start over
          </Button>
        )}
      </div>

      {stage === STAGES.WIZARD && <WizardChat onComplete={handleWizardComplete} />}

      {stage === STAGES.GENERATING && <GeneratingState />}

      {stage === STAGES.RESULTS && (
        <>
          <SectionHeading
            eyebrow="Results"
            title="Your Personalized Business Ideas"
            description="Ranked by AI match score based on your budget, region, risk tolerance, and industry preferences."
            action={
              <span className="hidden sm:flex items-center gap-1.5 text-[12.5px] font-medium text-secondary-700 bg-secondary-50 rounded-full px-3 py-1.5">
                <Sparkles className="size-3.5" /> {GENERATED_IDEAS.length} ideas generated
              </span>
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {GENERATED_IDEAS.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                isSaved={savedIds.includes(idea.id)}
                isCompareSelected={compareIds.includes(idea.id)}
                onToggleSave={toggleSave}
                onToggleCompare={toggleCompare}
                onGeneratePlan={(id) => {
                  setActiveIdeaId(id)
                  setStage(STAGES.PLAN)
                }}
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
