import { useWallet } from '@txnlab/use-wallet'
import { Navigate, useLocation } from 'react-router-dom'
import Page from './Page'

const CreateProposal = () => {
  const { activeAddress } = useWallet()
  const { pathname } = useLocation()

  const getOwner = () => {}

  if (!activeAddress && pathname === '/dapp/dao/create') return <Navigate to={'/dapp'} />

  if (activeAddress !== getOwner()) return <Navigate to={'/dapp'} />

  return <Page />
}

export default CreateProposal
