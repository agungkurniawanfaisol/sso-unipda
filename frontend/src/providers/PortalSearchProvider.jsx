import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PortalSearchModal } from '@/components/PortalSearchModal'

const PortalSearchContext = createContext({
  openSearch: () => {},
  closeSearch: () => {},
  isOpen: false,
})

export function usePortalSearch() {
  return useContext(PortalSearchContext)
}

export function PortalSearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSearch = useCallback(() => setIsOpen(true), [])
  const closeSearch = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen((value) => !value)
      }
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(
    () => ({ openSearch, closeSearch, isOpen }),
    [openSearch, closeSearch, isOpen]
  )

  return (
    <PortalSearchContext.Provider value={value}>
      {children}
      <PortalSearchModal open={isOpen} onClose={closeSearch} />
    </PortalSearchContext.Provider>
  )
}
