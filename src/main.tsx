import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/styles/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SchedulePage from '@/app/SchedulePage'
import PrivateClassesPage from '@/app/PrivateClassesPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/private-classes" element={<PrivateClassesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
