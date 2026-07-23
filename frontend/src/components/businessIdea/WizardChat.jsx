import { useEffect, useMemo, useState } from 'react'
import { Sparkles, Bot, User, ArrowRight, AlertTriangle } from 'lucide-react'
import GlassCard from '../ui/GlassCard.jsx'
import Button from '../ui/Button.jsx'
import WizardProgress from './WizardProgress.jsx'
import { getSavollar } from '../../data/anketaApi.js'
import { getRegionDistricts, getDistrictMahallas } from '../../features/map/api/geoApi.js'
import { useLocale } from '../../i18n/LocaleContext.jsx'

// hudud (regions) options come back resolved on GET /anketa/savollar already;
// tuman/mahalla are cascading selects the backend leaves for the client to
// resolve once the question they dependsOn has an answer.
const DYNAMIC_OPTION_LOADERS = {
  tuman: (regionId) => getRegionDistricts(regionId).then((list) => list.map((d) => ({ value: d.id, label: d.name }))),
  mahalla: (districtId) => getDistrictMahallas(districtId).then((list) => list.map((m) => ({ value: m.id, label: m.name }))),
}

function ChatBubble({ from, text, subtext }) {
  if (!text) return null
  const isAi = from === 'ai'
  return (
    <div className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}>
      <div
        className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
          isAi ? 'bg-primary-50 text-primary-600' : 'bg-secondary-50 text-secondary-700'
        }`}
      >
        {isAi ? <Bot className="size-3.5" strokeWidth={2} /> : <User className="size-3.5" strokeWidth={2} />}
      </div>
      <div
        className={`rounded-[14px] px-3.5 py-2.5 max-w-[80%] text-[13.5px] leading-snug ${
          isAi ? 'bg-ink-50 text-ink-800 rounded-tl-sm' : 'bg-primary-600 text-white rounded-tr-sm'
        }`}
      >
        {text}
        {subtext && <p className="text-[12px] text-ink-400 mt-1">{subtext}</p>}
      </div>
    </div>
  )
}

function isVisible(question, answers) {
  if (!question.requiredIf) return true
  return answers[question.requiredIf.key] === question.requiredIf.equals
}

export default function WizardChat({ onComplete }) {
  const { t } = useLocale()
  const [loadState, setLoadState] = useState({ status: 'loading', questions: [], error: null })
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [dynamicOptions, setDynamicOptions] = useState({})
  const [optionsLoading, setOptionsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const [retryToken, setRetryToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoadState({ status: 'loading', questions: [], error: null })
    getSavollar()
      .then((questions) => {
        if (!cancelled) setLoadState({ status: 'ready', questions, error: null })
      })
      .catch((error) => {
        if (!cancelled) setLoadState({ status: 'error', questions: [], error })
      })
    return () => {
      cancelled = true
    }
  }, [retryToken])

  const questions = loadState.questions
  const visibleQuestions = useMemo(() => questions.filter((q) => isVisible(q, answers)), [questions, answers])
  const question = visibleQuestions[stepIndex]
  const history = visibleQuestions.slice(0, stepIndex)

  useEffect(() => {
    setInputValue('')
  }, [stepIndex])

  useEffect(() => {
    if (!question || question.options || !DYNAMIC_OPTION_LOADERS[question.key]) return
    const dependsOnValue = answers[question.dependsOn]
    if (dependsOnValue == null) return
    let cancelled = false
    setOptionsLoading(true)
    DYNAMIC_OPTION_LOADERS[question.key](dependsOnValue)
      .then((opts) => {
        if (!cancelled) setDynamicOptions((prev) => ({ ...prev, [question.key]: opts }))
      })
      .catch(() => {
        if (!cancelled) setDynamicOptions((prev) => ({ ...prev, [question.key]: [] }))
      })
      .finally(() => {
        if (!cancelled) setOptionsLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.key, answers[question?.dependsOn]])

  function optionsFor(q) {
    return q.options ?? dynamicOptions[q.key] ?? []
  }

  function advance(value) {
    const updated = { ...answers, [question.key]: value }
    const nextVisible = questions.filter((q) => isVisible(q, updated))
    setAnswers(updated)
    if (stepIndex + 1 >= nextVisible.length) {
      onComplete(updated)
    } else {
      setStepIndex(stepIndex + 1)
    }
  }

  function answerText(q) {
    const value = answers[q.key]
    if (value == null) return null
    if (q.type === 'select') {
      const match = optionsFor(q).find((o) => String(o.value) === String(value))
      return match ? match.label : String(value)
    }
    return String(value)
  }

  function submitInput() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    if (question.type === 'number') {
      const num = Number(trimmed)
      if (Number.isNaN(num) || (question.min !== undefined && num < question.min)) return
      advance(num)
    } else {
      advance(trimmed)
    }
  }

  if (loadState.status === 'loading') {
    return (
      <GlassCard className="p-5 md:p-7 max-w-2xl mx-auto w-full flex items-center gap-2.5 text-[13.5px] text-ink-500">
        <Sparkles className="size-4 text-primary-600 animate-pulse" strokeWidth={2} />
        {t('wizard.loadingQuestions')}
      </GlassCard>
    )
  }

  if (loadState.status === 'error') {
    return (
      <GlassCard className="p-5 md:p-7 max-w-2xl mx-auto w-full">
        <div className="flex items-start gap-2.5 text-[13.5px] text-rose-700">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" strokeWidth={2} />
          <span>{loadState.error?.message || t('wizard.loadError')}</span>
        </div>
        <Button size="sm" variant="secondary" className="mt-3" onClick={() => setRetryToken((n) => n + 1)}>
          {t('wizard.retry')}
        </Button>
      </GlassCard>
    )
  }

  if (!question) return null

  return (
    <GlassCard className="p-5 md:p-7 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="size-9 rounded-[12px] btn-gradient-brand flex items-center justify-center shrink-0">
          <Sparkles className="size-[18px] text-white" strokeWidth={2.25} />
        </div>
        <div>
          <p className="font-semibold text-[14px] text-ink-900">{t('wizard.advisorName')}</p>
          <p className="text-[12px] text-ink-400">
            {t('wizard.stepOf').replace('{current}', stepIndex + 1).replace('{total}', visibleQuestions.length)}
          </p>
        </div>
      </div>

      <WizardProgress step={stepIndex + 1} total={visibleQuestions.length} />

      <div className="mt-6 space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {history.map((q) => (
          <div key={q.key} className="space-y-2">
            <ChatBubble from="ai" text={q.label} />
            <ChatBubble from="user" text={answerText(q)} />
          </div>
        ))}

        <div key={question.key} className="animate-fade-up">
          <ChatBubble from="ai" text={question.label} />

          {question.type === 'select' && (
            <div className="mt-3 ml-11 flex flex-wrap gap-2">
              {optionsLoading && optionsFor(question).length === 0 && (
                <span className="text-[12.5px] text-ink-400">{t('wizard.optionsLoading')}</span>
              )}
              {optionsFor(question).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => advance(opt.value)}
                  className="flex items-center gap-1.5 rounded-full border border-ink-200 text-ink-700 px-3.5 py-2 text-[13.5px] font-medium transition-all hover:border-primary-300 hover:bg-primary-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {(question.type === 'text' || question.type === 'number') && (
            <div className="mt-3 ml-11 flex items-center gap-2">
              <input
                type={question.type === 'number' ? 'number' : 'text'}
                min={question.min}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitInput()}
                placeholder={t('wizard.textPlaceholder')}
                className="flex-1 h-10 rounded-[10px] bg-ink-50 border border-transparent px-3.5 text-[13.5px] text-ink-800 placeholder:text-ink-400 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all"
              />
              <Button size="sm" onClick={submitInput} disabled={!inputValue.trim()}>
                {t('wizard.continue')} <ArrowRight className="size-4" strokeWidth={2.25} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
