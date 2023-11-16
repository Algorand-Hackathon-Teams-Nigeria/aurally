import * as algokit from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import { useWallet } from '@txnlab/use-wallet'
import { AurallyClient } from '../contracts/AurallyClient'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import toast from 'react-hot-toast'
import algosdk from 'algosdk'

const useAppClient = () => {
  const { signer, activeAddress } = useWallet()

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })

  const indexerConfig = getIndexerConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  })

  const appDetails = {
    resolveBy: 'creatorAndName',
    sender: { signer, addr: activeAddress } as TransactionSignerAccount,
    creatorAddress: activeAddress,
    findExistingUsing: indexer,
  } as AppDetails

  const appClient = new AurallyClient(appDetails, algodClient)

  const deployParams = {
    onSchemaBreak: 'append',
    onUpdate: 'append',
  } as const

  const deployCall = async () => {
    try {
      await appClient.deploy(deployParams)
    } catch (error) {
      toast.error(`Error deploying the contract`)
    }
  }

  async function getBalance(address?: string) {
    if (!address) {
      return {
        name: 'ALGO',
        amount: 0,
        price: 0,
      }
    }

    const accountInfo = await algodClient.accountInformation(address).do()
    console.log(accountInfo)
    const balance = algosdk.microalgosToAlgos(accountInfo.amount)
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd')
    const algoData = await response.json()

    return {
      name: 'ALGO',
      amount: balance || 0,
      price: algoData.algorand.usd || 0,
    }
  }

  return { appClient, deployCall, getBalance }
}

export default useAppClient
