import { useState, useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useBodyScrollLock(mobileOpen)

  return (
    <div className="min-h-screen bg-[#050508]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          collapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        <DashboardHeader onMenuToggle={() => setMobileOpen(true)} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
