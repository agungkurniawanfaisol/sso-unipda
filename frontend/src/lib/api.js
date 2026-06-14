const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

function buildUrl(path, params = {}) {
  const url = new URL(`${API_BASE}${path.startsWith('/') ? path : `/${path}`}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

async function request(path, params = {}) {
  const response = await fetch(buildUrl(path, params))
  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(json.message ?? `Request failed (${response.status})`)
    error.status = response.status
    error.payload = json
    throw error
  }

  return json
}

export const api = {
  getFaculties: () => request('/faculties'),
  getInstitutional: () => request('/institutional'),
  getLecturers: (params = { source: 'saintek' }) => request('/lecturers', params),
  getApplications: (params = {}) => request('/applications', params),
  getSchedules: (params = {}) => request('/schedules', params),
  getStudents: (params = {}) => request('/students', params),
  getStudyPrograms: () => request('/study-programs'),
  getActivities: () => request('/activities'),
}

export { API_BASE }
