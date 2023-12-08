import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom } from '../store/contractAtom'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../utils/network/contract-config'
import toast from 'react-hot-toast'
import algosdk from 'algosdk'

interface AppDataProviderProps {
  children: React.ReactNode
}

export const ContractDataProvider = ({ children }: AppDataProviderProps) => {
  const [, setAppRef] = useAtom(appRefAtom)
  const [, setAppClient] = useAtom(appClientAtom)
  const [, setUserAccount] = useAtom(userAccountAtom)
  const { signer, activeAddress, activeAccount, signTransactions } = useWallet()

  const getGlobalAppState = async () => {
    const algodClient = getAlgodClient()
    if (activeAddress && activeAccount) {
      const newAppClient = createAppClient()
      // const transaction = algosdk.make
      try {
        const sender = { signer: signer, addr: activeAddress }
        const params = await getAlgodClient().getTransactionParams().do()
        // const result = await newAppClient.appClient.optIn({ sender, sendParams: params })
        const transaction = algosdk.makeApplicationOptInTxnFromObject({
          suggestedParams: {
            ...params,
          },
          from: activeAddress,
          appIndex: 494102763,
        })
        const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
        const result = await signTransactions([encodedTransaction])
        setAppClient(newAppClient)
        const newAppRef = await newAppClient.appClient.getAppReference()
        const account = await algodClient.accountInformation(activeAccount.address).do()
        setAppRef(newAppRef)
        setUserAccount(account as WalletAccountType)
        console.log(result)
      } catch (err) {
        console.log(err)
        toast.error(`Deploy Error: ${err}`)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="fixed top-10 right-10 z-50 px-5 py-3 bg-white rounded-md text-black" onClick={getGlobalAppState}>
        OPT-IN
      </div>
      {children}
    </React.Fragment>
  )
}
