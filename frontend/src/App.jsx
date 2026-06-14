import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Hero from './components/Hero'
import ApplicationShowcase from './components/ApplicationShowcase'
import LecturerDirectory from './components/LecturerDirectory'
import InstitutionalInfo from './components/InstitutionalInfo'
import Dashboard from './pages/Dashboard'

function LandingPage() {
  return (
    <MainLayout>
      <Hero />
      <ApplicationShowcase />
      <LecturerDirectory />
      <InstitutionalInfo />
    </MainLayout>
  )
}

function AdminPage() {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
