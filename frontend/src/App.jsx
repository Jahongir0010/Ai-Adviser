import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BusinessIdea from './pages/BusinessIdea.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business-idea" element={<BusinessIdea />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
