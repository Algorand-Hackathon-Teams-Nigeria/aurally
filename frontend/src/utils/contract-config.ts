import * as algokit from '@algorandfoundation/algokit-utils'
import { TransactionSignerAccount } from '@algorandfoundation/algokit-utils/types/account'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { AurallyClient } from '../contracts/AurallyClient'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from './algo-constants'

const algodConfig = getAlgodConfigFromViteEnvironment()
export const algodClient = algokit.getAlgoClient({
  server: algodConfig.server,
  port: algodConfig.port,
  token: algodConfig.token,
})

const indexerConfig = getIndexerConfigFromViteEnvironment()
export const indexer = algokit.getAlgoIndexerClient({
  server: indexerConfig.server,
  port: indexerConfig.port,
  token: indexerConfig.token,
})

export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomError'
  }
}

export type AppClientProps = { address?: string; signer: TransactionSignerAccount['signer'] }

export const getAppClient = (props: AppClientProps) => {
  if (!props.signer || !props.address) {
    throw new CustomError('Connect your wallet')
  }
  const appDetails = {
    resolveBy: 'creatorAndName',
    sender: { signer: props.signer, addr: props.address },
    creatorAddress: props.address,
    findExistingUsing: indexer,
  } as AppDetails
  return new AurallyClient(appDetails, algodClient)
}
