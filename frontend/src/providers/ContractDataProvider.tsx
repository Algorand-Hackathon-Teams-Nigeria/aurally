import React from 'react'
// import { useAtom } from 'jotai'
// import { appClientAtom, appRefAtom, userAccountAtom } from '../store/contractAtom'
// import { useWallet } from '@txnlab/use-wallet'
// import { createAppClient, getAlgodClient } from '../utils/network/contract-config'
// import toast from 'react-hot-toast'
// import { deployParams } from '../utils/network/algo-constants'

interface AppDataProviderProps {
  children: React.ReactNode
}

export const ContractDataProvider = ({ children }: AppDataProviderProps) => {
  // const [, setAppRef] = useAtom(appRefAtom)
  // const [, setAppClient] = useAtom(appClientAtom)
  // const [, setUserAccount] = useAtom(userAccountAtom)
  // const { signer, activeAddress, activeAccount } = useWallet()

  // React.useEffect(() => {
  //   const getGlobalAppState = async () => {
  //     const algodClient = getAlgodClient()
  //     if (activeAddress && activeAccount) {
  //       const newAppClient = createAppClient({ address: activeAddress, signer })
  //       const newAppRef = await newAppClient.appClient.getAppReference()
  //       const account = await algodClient.accountInformation(activeAccount.address).do()

  //       try {
  //         const result = await newAppClient.deploy(deployParams)
  //         setAppClient(newAppClient)
  //         setAppRef(newAppRef)
  //         setUserAccount(account as WalletAccountType)
  //         console.log(result, newAppClient)
  //       } catch (err) {
  //         // console.log(err)
  //         toast.error(`Deploy Error: ${err}`)
  //       }
  //     }
  //   }
  //   getGlobalAppState()
  // }, [activeAddress])
  return <React.Fragment>{children}</React.Fragment>
}
