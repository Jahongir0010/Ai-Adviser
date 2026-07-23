import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  Sparkles,
  Map as MapIcon,
  LineChart,
  Briefcase,
  Settings as SettingsIcon,
  LifeBuoy,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useState } from 'react'
import { useLocale } from '../i18n/LocaleContext.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', labelKey: 'sidebar.dashboard', icon: LayoutGrid },
  { to: '/map', labelKey: 'sidebar.map', icon: MapIcon },
  { to: '/business-idea', labelKey: 'sidebar.businessIdea', icon: Sparkles },
  { to: '/market-reports', labelKey: 'sidebar.marketReports', icon: LineChart },
]

const SOON_ITEMS = [{ labelKey: 'sidebar.portfolio', icon: Briefcase }]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useLocale()

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 h-screen sticky top-0 border-r border-ink-100 bg-white/70 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? 'w-[84px]' : 'w-[248px]'
      }`}
    >
      <div className="flex items-center gap-2.5 px-5 h-[72px] shrink-0">
        <div className="size-9 rounded-[12px] btn-gradient-brand shrink-0 flex items-center justify-center shadow-glow-primary">
          <Sparkles className="size-5 text-white" strokeWidth={2.25} />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-[17px] tracking-tight text-ink-900 whitespace-nowrap">
            AI Adviser
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto">
        <p className={`px-3 mt-2 mb-1.5 text-[11px] font-semibold tracking-wider text-ink-400 uppercase ${collapsed ? 'text-center px-0' : ''}`}>
          {collapsed ? '—' : t('sidebar.platform')}
        </p>
        {NAV_ITEMS.map(({ to, labelKey, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-glow-primary'
                  : 'text-ink-600 hover:bg-primary-50 hover:text-primary-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`size-[18px] shrink-0 ${isActive ? 'text-white' : 'text-ink-400 group-hover:text-primary-600'}`} strokeWidth={2} />
                {!collapsed && <span className="whitespace-nowrap">{t(labelKey)}</span>}
                {isActive && !collapsed && (
                  <span className="ml-auto size-1.5 rounded-full bg-secondary-400 animate-pulse-ring" />
                )}
              </>
            )}
          </NavLink>
        ))}

        <p className={`px-3 mt-5 mb-1.5 text-[11px] font-semibold tracking-wider text-ink-400 uppercase ${collapsed ? 'text-center px-0' : ''}`}>
          {collapsed ? '—' : t('sidebar.comingSoon')}
        </p>
        {SOON_ITEMS.map(({ labelKey, icon: Icon }) => (
          <div
            key={labelKey}
            className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium text-ink-300 cursor-not-allowed select-none"
            title={t('sidebar.comingSoon')}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={2} />
            {!collapsed && <span className="whitespace-nowrap">{t(labelKey)}</span>}
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-ink-100 flex flex-col gap-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium transition-colors ${
              isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-400 hover:bg-ink-50 hover:text-ink-700'
            }`
          }
        >
          <SettingsIcon className="size-[18px] shrink-0" strokeWidth={2} />
          {!collapsed && <span>{t('sidebar.settings')}</span>}
        </NavLink>
        <div className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium text-ink-400">
          <LifeBuoy className="size-[18px] shrink-0" strokeWidth={2} />
          {!collapsed && <span>{t('sidebar.help')}</span>}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-medium text-ink-400 hover:bg-ink-50 hover:text-ink-700 transition-colors mt-1"
        >
          {collapsed ? <ChevronsRight className="size-[18px]" strokeWidth={2} /> : <ChevronsLeft className="size-[18px]" strokeWidth={2} />}
          {!collapsed && <span>{t('sidebar.collapse')}</span>}
        </button>
      </div>
    </aside>
  )
}
