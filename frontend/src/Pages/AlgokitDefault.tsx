import { useState } from 'react'
import AppCalls from '../components/AppCalls'
import Transact from '../components/Transact'
import { useWallet } from '@txnlab/use-wallet'

const AlgokitDefault = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress } = useWallet()

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

  return (
    <div className="hero-content text-center rounded-lg p-6 max-w-md mx-auto">
      <div className="max-w-md">
        <h1 className="text-4xl">
          Welcome to <div className="font-bold">AlgoKit 🙂</div>
        </h1>
        <p className="py-6">
          This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
        </p>

        <div className="grid">
          <div className="divider" />
          <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
            Wallet Connection
          </button>

          {activeAddress && (
            <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
              Transactions Demo
            </button>
          )}

          {activeAddress && (
            <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
              Contract Interactions Demo
            </button>
          )}
        </div>
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
        <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
      </div>
    </div>
  )
}

export default AlgokitDefault
