import { useState } from 'react'
import { Search, Bell, Sparkles, ChevronDown } from 'lucide-react'

export default function Topbar() {
  const [query, setQuery] = useState('')

  return (
    <header className="sticky top-0 z-30 h-[72px] shrink-0 flex items-center gap-4 px-4 md:px-7 border-b border-ink-100 bg-white/75 backdrop-blur-xl">
      <div className="flex items-center gap-2 md:hidden">
        <div className="size-8 rounded-[10px] btn-gradient-brand flex items-center justify-center">
          <Sparkles className="size-4 text-white" />
        </div>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[17px] text-ink-400 group-focus-within:text-primary-600 transition-colors" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search regions, industries, insights…"
            className="w-full h-10 rounded-[12px] bg-ink-50 border border-transparent pl-10 pr-4 text-[14px] text-ink-800 placeholder:text-ink-400 outline-none focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all"
          />
          <kbd className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 rounded-md border border-ink-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink-400">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="relative size-10 rounded-[12px] flex items-center justify-center text-ink-500 hover:bg-ink-50 hover:text-primary-600 transition-colors">
          <Bell className="size-[19px]" strokeWidth={2} />
          <span className="absolute top-2 right-2.5 size-[7px] rounded-full bg-secondary-500 ring-2 ring-white" />
        </button>

        <div className="w-px h-6 bg-ink-200 mx-1 hidden sm:block" />

        <button className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-[12px] hover:bg-ink-50 transition-colors">
          <div className="size-8 rounded-full btn-gradient-brand flex items-center justify-center text-white text-[13px] font-semibold">
            JI
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-[13px] font-semibold text-ink-800">Jahongir I.</span>
            <span className="text-[11px] text-ink-400">Investor account</span>
          </div>
          <ChevronDown className="size-4 text-ink-400 hidden sm:block" />
        </button>
      </div>
    </header>
  )
}
