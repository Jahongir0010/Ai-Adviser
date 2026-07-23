import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LocaleProvider } from './i18n/LocaleContext.jsx'
import AppLayout from './layout/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BusinessIdea from './pages/BusinessIdea.jsx'
import InteractiveMap from './pages/InteractiveMap.jsx'
import MarketReports from './pages/MarketReports.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  return (
    <LocaleProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business-idea" element={<BusinessIdea />} />
            <Route path="/map" element={<InteractiveMap />} />
            <Route path="/market-reports" element={<MarketReports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </LocaleProvider>
  )
}

export default App
