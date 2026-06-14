import {
  AppWindow,
  Users,
  GraduationCap,
  Activity,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Applications',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: AppWindow,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    label: 'Active Lecturers',
    value: '48',
    change: '+2',
    trend: 'up',
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'Active Students',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-600',
  },
  {
    label: 'This Month',
    value: '156',
    change: '-8%',
    trend: 'down',
    icon: Activity,
    color: 'from-purple-500 to-pink-600',
  },
]

const recentApplications = [
  { title: 'E-Learning Platform', category: 'Web', status: 'Published', author: 'Tim Pengembang' },
  { title: 'Smart Campus App', category: 'Mobile', status: 'In Review', author: 'Riset & Tim Mobile' },
  { title: 'IoT Weather Station', category: 'IoT', status: 'Published', author: 'Lab IoT' },
  { title: 'Greenhouse Controller', category: 'Arduino', status: 'Draft', author: 'Tim Embedded Systems' },
  { title: 'Digital Library', category: 'Web', status: 'Published', author: 'Tim Perpustakaan Digital' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Overview of your faculty's applications and activity.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} opacity-80`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Recent applications table */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Recent Applications</h2>
          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-white/40 uppercase tracking-wider">Author</th>
                <th className="w-10 px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.title} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-3.5 text-sm text-white/80">{app.title}</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-white/50">
                      {app.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      app.status === 'Published'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : app.status === 'In Review'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-white/40">{app.author}</td>
                  <td className="px-6 py-3.5">
                    <button className="p-1 text-white/20 hover:text-white/60 transition-colors cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Application', desc: 'Upload a new app to showcase' },
              { label: 'Add Lecturer', desc: 'Add a faculty member' },
              { label: 'Generate Report', desc: 'Export activity data' },
              { label: 'Update Settings', desc: 'Configure portal options' },
            ].map((action) => (
              <button
                key={action.label}
                className="text-left p-3 rounded-lg border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer group"
              >
                <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{action.label}</div>
                <div className="text-xs text-white/30 mt-0.5">{action.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Activity Feed</h3>
          <div className="space-y-4">
            {[
              { text: 'New application submitted: E-Learning Platform', time: '2 hours ago' },
              { text: 'Lecturer profile updated: Dr. Ahmad Fauzi', time: '5 hours ago' },
              { text: 'IoT Weather Station approved for publishing', time: '1 day ago' },
              { text: 'New student registration: +12 accounts', time: '2 days ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400/50 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/60 truncate">{item.text}</p>
                  <p className="text-xs text-white/30 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
