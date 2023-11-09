import { useWallet } from '@txnlab/use-wallet'
import { Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const { activeAddress } = useWallet()
  const { pathname } = useLocation()
  const sliced = pathname.split('/')[1]

  if (['profile', 'upload', 'assets'].includes(sliced)) {
    return activeAddress ? <Outlet /> : <div className="routePage">Connect your wallet</div>
  }
  return <Outlet />
}

export default ProtectedRoute
