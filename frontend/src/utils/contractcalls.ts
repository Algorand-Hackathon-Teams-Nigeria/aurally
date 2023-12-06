import { Aurally } from '../contracts/AurallyClient'
import { deployParams } from './network/algo-constants'
import { AppClientProps, createAppClient as getAppClient } from './network/contract-config'

export const deployCall = async (props: AppClientProps) => {
  const appClient = getAppClient(props)
  try {
    await appClient.deploy(deployParams)
    // await appClient.create.createApplication({})
  } catch (error) {
    console.log(error)
    throw new Error(`Error deploying the contract`)
  }
}

export const createArtNFT = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['createArtNFT']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.createArtNft(props)
  }
}

export const createSoundNFT = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['createSoundNFT']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.createSoundNft(props)
  }
}

export const startAuction = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['startAuction']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.startAuction(props)
  }
}

export const bidOnArtAuction = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['bidOnArtAuction']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.bidOnArtAuction(props)
  }
}

export const endArtAuction = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['endArtAuction']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.endArtAuction(props)
  }
}

export const purchaseNFT = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['purchaseNFT']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.purchaseNft(props)
  }
}

export const transferNFT = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['transferNFT']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.transferNft(props)
  }
}

export const voteOnProposal = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['voteOnProposal']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.voteOnProposal(props)
  }
}

export const createProposal = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['createProposal']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.createProposal(props)
  }
}

export const streamNFT = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['streamNFT']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.streamNft(props)
  }
}

export const optInToAsset = (appclientProps: AppClientProps) => {
  return async (props: Aurally['methods']['optInToAsset']['argsObj']) => {
    const appClient = getAppClient(appclientProps)
    return await appClient.optInToAsset(props)
  }
}
