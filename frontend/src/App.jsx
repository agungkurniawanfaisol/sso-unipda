import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingLayout from './layouts/LandingLayout'
import DashboardLayout from './layouts/DashboardLayout'
import Hero from './components/Hero'
import CampusToday from './components/CampusToday'
import StatementSection from './components/StatementSection'
import PmbBanner from './components/PmbBanner'
import { LazySection } from './components/ui/LazySection'
import { SectionHighlight } from './components/SectionHighlight'
import Dashboard from './pages/Dashboard'
import AllLecturersPage from './pages/AllLecturersPage'
import AllStudentsPage from './pages/AllStudentsPage'

const FacultySection = lazy(() => import('./components/FacultySection'))
const LecturerDirectory = lazy(() => import('./components/LecturerDirectory'))
const StudentDirectory = lazy(() => import('./components/StudentDirectory'))
const SchedulePreview = lazy(() => import('./components/SchedulePreview'))
const GallerySection = lazy(() => import('./components/GallerySection'))
const InstitutionalInfo = lazy(() => import('./components/InstitutionalInfo'))

function LandingPage() {
  return (
    <LandingLayout>
      <Hero />
      <CampusToday />
      <StatementSection />
      <LazySection minHeight="80vh">
        <SectionHighlight sectionId="faculties">
          <FacultySection />
        </SectionHighlight>
      </LazySection>
      <LazySection minHeight="80vh">
        <SectionHighlight sectionId="lecturers">
          <LecturerDirectory />
        </SectionHighlight>
      </LazySection>
      <LazySection minHeight="80vh">
        <SectionHighlight sectionId="students">
          <StudentDirectory />
        </SectionHighlight>
      </LazySection>
      <LazySection minHeight="80vh">
        <SectionHighlight sectionId="schedules">
          <SchedulePreview />
        </SectionHighlight>
      </LazySection>
      <LazySection minHeight="80vh">
        <GallerySection />
      </LazySection>
      <LazySection minHeight="20vh">
        <PmbBanner />
      </LazySection>
      <LazySection minHeight="80vh">
        <InstitutionalInfo />
      </LazySection>
    </LandingLayout>
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
        <Route path="/dosen" element={<AllLecturersPage />} />
        <Route path="/mahasiswa" element={<AllStudentsPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
