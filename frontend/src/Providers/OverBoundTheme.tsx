import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const OverBoundTheme = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname.includes('/dapp')) {
      document.body.setAttribute('dapp-page', 'true')
    } else {
      document.body.setAttribute('dapp-page', 'false')
    }

    return () => {
      document.body.setAttribute('dapp-page', 'false')
    }
  }, [pathname])

  return <div className="hidden w-0 h-0" />
}

export default OverBoundTheme
