import { ReactNode, useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom } from '../../store/atoms'
import { useWallet } from '@txnlab/use-wallet'
import { Account } from '../../types/dataTypes'
import { algodClient, getAppClient } from '../../utils/contract-config'
import toast from 'react-hot-toast'
import { deployParams } from '../../utils/algo-constants'

interface AppDataProviderProps {
  children: ReactNode
}

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const setAppRef = useSetAtom(appRefAtom)
  const setAppClient = useSetAtom(appClientAtom)
  const setUserAccount = useSetAtom(userAccountAtom)
  const { signer, activeAddress, activeAccount } = useWallet()

  useEffect(() => {
    const getGlobalAppState = async () => {
      if (activeAddress && activeAccount) {
        const newAppClient = getAppClient({ signer, address: activeAddress })
        const newAppRef = await newAppClient.appClient.getAppReference()
        const account = await algodClient.accountInformation(activeAccount.address).do()

        await newAppClient.deploy(deployParams).catch((err) => {
          toast.error(`Deploy Error: ${err}`)
          return
        })
        setAppClient(newAppClient)
        setAppRef(newAppRef)
        setUserAccount(account as Account)
      }
    }
    getGlobalAppState()
  }, [activeAddress])
  return children
}
