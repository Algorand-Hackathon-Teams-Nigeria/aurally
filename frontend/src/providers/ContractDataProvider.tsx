import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom } from '../store/contractAtom'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../utils/network/contract-config'
import algosdk from 'algosdk'
import { auraAtom } from '../store/auraAtoms'

interface AppDataProviderProps {
  children: React.ReactNode
}

export const ContractDataProvider = ({ children }: AppDataProviderProps) => {
  const [, setAppRef] = useAtom(appRefAtom)
  const [, setAppClient] = useAtom(appClientAtom)
  const [, setUserAccount] = useAtom(userAccountAtom)
  const [, setAuraTokens] = useAtom(auraAtom)
  const { activeAddress, activeAccount, signer } = useWallet()

  React.useEffect(() => {
    const getGlobalAppState = async () => {
      const algodClient = getAlgodClient()
      if (activeAddress && activeAccount) {
        const newAppClient = createAppClient({ addr: activeAddress, signer })
        const account = await algodClient.accountInformation(activeAccount.address).do()
        const newAppRef = await newAppClient.appClient.getAppReference();

        setAppClient(newAppClient)
        setAppRef(newAppRef)
        setUserAccount(account as WalletAccountType)
        const auras_result = await newAppClient.createAuraTokens({}, { boxes: [{ appId: newAppRef.appId, name: new Uint8Array(new TextEncoder().encode("aura")) }] })
        const auras = auras_result.return
        setAuraTokens(auras)
      }
    }
    getGlobalAppState()
  }, [activeAddress])
  return <React.Fragment>{children}</React.Fragment>
}
