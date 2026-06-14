import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  AppWindow,
  Users,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  BarChart3,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'Applications', icon: AppWindow, to: '/admin/applications' },
  { label: 'Lecturers', icon: Users, to: '/admin/lecturers' },
  { label: 'Students', icon: GraduationCap, to: '/admin/students' },
  { label: 'Reports', icon: BarChart3, to: '/admin/reports' },
  { label: 'Courses', icon: BookOpen, to: '/admin/courses' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
]

function SidebarItem({ item, collapsed, onMobileClose }) {
  const location = useLocation()
  const Icon = item.icon
  const isActive = item.to === '/admin'
    ? location.pathname === '/admin'
    : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      end={item.to === '/admin'}
      onClick={onMobileClose}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
          : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent',
        collapsed && 'justify-center'
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!collapsed && <span className="flex-1">{item.label}</span>}
      {!collapsed && isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
      )}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full',
          'bg-black/90 backdrop-blur-xl border-r border-white/10',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn('flex h-16 items-center border-b border-white/10 px-4', collapsed && 'justify-center')}>
          <NavLink to="/admin" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <span className="font-semibold text-base text-white tracking-tight whitespace-nowrap">
                UNIPDA Admin
              </span>
            )}
          </NavLink>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              item={item}
              collapsed={collapsed}
              onMobileClose={onMobileClose}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div className={cn('border-t border-white/10 p-2', collapsed && 'flex flex-col items-center gap-1')}>
          <NavLink
            to="/"
            onClick={onMobileClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              'text-white/40 hover:text-indigo-400 hover:bg-indigo-500/10',
              collapsed && 'justify-center'
            )}
            title={collapsed ? 'Back to Site' : undefined}
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </NavLink>
          <button
            onClick={onToggle}
            className="hidden md:flex items-center justify-center w-full px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer mt-1"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  )
}
