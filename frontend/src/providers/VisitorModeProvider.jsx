import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { MODE_ORDER, VISITOR_MODES } from '@/lib/visitorMode'

const STORAGE_KEY = 'unipda-visitor-mode'

const VisitorModeContext = createContext({
  mode: 'mahasiswa',
  config: VISITOR_MODES.mahasiswa,
  setMode: () => {},
})

export function useVisitorMode() {
  return useContext(VisitorModeContext)
}

export function VisitorModeProvider({ children }) {
  const [mode, setModeState] = useState('mahasiswa')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'calon') {
      window.localStorage.setItem(STORAGE_KEY, 'mahasiswa')
      return
    }
    if (saved && VISITOR_MODES[saved]) {
      setModeState(saved)
    }
  }, [])

  const setMode = (nextMode) => {
    if (!VISITOR_MODES[nextMode]) return
    setModeState(nextMode)
    window.localStorage.setItem(STORAGE_KEY, nextMode)
  }

  const value = useMemo(
    () => ({
      mode,
      config: VISITOR_MODES[mode] ?? VISITOR_MODES.mahasiswa,
      setMode,
      modes: MODE_ORDER.map((id) => VISITOR_MODES[id]),
    }),
    [mode]
  )

  return <VisitorModeContext.Provider value={value}>{children}</VisitorModeContext.Provider>
}
