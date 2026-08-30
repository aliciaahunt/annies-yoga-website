import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SchedulePage from '@/app/SchedulePage'
import PrivateClassesPage from '@/app/PrivateClassesPage'
import RetreatsPage from '@/app/RetreatsPage'
import ContactPage from '@/app/ContactPage'
import NotFoundPage from '@/app/NotFoundPage'
import WorkshopsPage from '@/app/WorkshopsPage'
import RouteEffects from '@/components/RouteEffects'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/private-classes" element={<PrivateClassesPage />} />
        <Route path="/retreats" element={<RetreatsPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
