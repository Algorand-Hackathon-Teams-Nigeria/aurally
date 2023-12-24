import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom, aurallyCreativeAtom, auraTokenAtom } from '../store/contractAtom'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../utils/network/contract-config'
import { getAuraTokenInfo, getUserFromAddressSlice } from '../utils/queries'
import { WalletAccountType } from '../types/account'

interface AppDataProviderProps {
  children: React.ReactNode
}

export const ContractDataProvider = ({ children }: AppDataProviderProps) => {
  const [, setAppRef] = useAtom(appRefAtom)
  const [, setAppClient] = useAtom(appClientAtom)
  const [, setUserAccount] = useAtom(userAccountAtom)
  const [, setAurallyCreative] = useAtom(aurallyCreativeAtom)
  const [, setAuraTokens] = useAtom(auraTokenAtom)
  const { activeAddress, activeAccount, signer } = useWallet()

  React.useEffect(() => {
    const getGlobalAppState = async () => {
      const algodClient = getAlgodClient()
      if (activeAddress && activeAccount) {
        const newAppClient = createAppClient({ addr: activeAddress, signer })
        const account = await algodClient.accountInformation(activeAccount.address).do()
        const newAppRef = await newAppClient.appClient.getAppReference()
        console.log(newAppRef)

        // await createAuraTokens(newAppClient, Number(newAppRef.appId))
        setAppClient(newAppClient)
        setAppRef(newAppRef)
        setUserAccount(account as WalletAccountType)

        // Get registred User Information
        const registredUser = await getUserFromAddressSlice(activeAddress, newAppClient)
        setAurallyCreative(registredUser?.data)

        const auras = await getAuraTokenInfo(newAppClient)
        setAuraTokens(auras)
      } else {
        const newAppClient = createAppClient()
        setAppClient(newAppClient)
        const newAppRef = await newAppClient.appClient.getAppReference()
        const auras = await getAuraTokenInfo(newAppClient)
        console.log(newAppRef,auras)
      }
    }
    getGlobalAppState()
  }, [activeAddress])
  return <React.Fragment>{children}</React.Fragment>
}
