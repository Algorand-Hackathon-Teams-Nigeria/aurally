import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom, auraTokenAtom, aurallyCreativeAtom } from '../store/contractAtom'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../utils/network/contract-config'
import { toast } from 'react-hot-toast'
import { encodeText } from '../utils/encoding'
import algosdk from 'algosdk'

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
        const newAppRef = await newAppClient.appClient.getAppReference();

        setAppClient(newAppClient)
        setAppRef(newAppRef)
        setUserAccount(account as WalletAccountType)

        // Get / Create Aura Tokens
        try {
          const auras_result = await newAppClient.createAuraTokens({}, {
            boxes: [{ appId: newAppRef.appId, name: encodeText("aura") }]
          })
          setAuraTokens(auras_result.return)
        } catch (err) {
          toast.error(JSON.stringify(err))
        }

        // Get registred User Information
        try {
          const registredUser = await newAppClient?.getRegisteredCreative(
            { addr: activeAddress },
            {
              boxes: [
                { appId: newAppRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress).publicKey }
              ]
            }
          )
          setAurallyCreative(registredUser?.return);
        } catch (err) {
          toast.error(JSON.stringify(err))
        }
      }
    }
    getGlobalAppState()
  }, [activeAddress])
  return <React.Fragment>{children}</React.Fragment>
}
