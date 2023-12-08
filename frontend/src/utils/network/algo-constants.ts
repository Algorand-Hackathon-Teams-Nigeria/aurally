import { AlgoViteClientConfig, AlgoViteKMDConfig } from '../../interfaces/network'
import type { AppRefrence } from "../../interfaces/application"

export function getAppRefrenceFromViteEnvironment(): AppRefrence {
  if (!import.meta.env.VITE_APPLICATION_ID) {
    throw new Error("Attempt to get application id failed: VITE_APPLICATION_ID env variable not set")
  }
  if (!import.meta.env.VITE_APPLICATION_ADDRESS) {
    throw new Error("Attempt to get application address failed: VITE_APPLICATION_ADDRESS env variable not set")
  }

  return {
    appId: import.meta.env.VITE_APPLICATION_ID,
    appAddress: import.meta.env.VITE_APPLICATION_ADDRESS,
    creatorAddress: import.meta.env.VITE_CREATOR_ADDRESS
  }
}

export function getAlgodConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!import.meta.env.VITE_ALGOD_SERVER) {
    throw new Error('Attempt to get default algod configuration without specifying VITE_ALGOD_SERVER in the environment variables')
  }

  return {
    server: import.meta.env.VITE_ALGOD_SERVER,
    port: import.meta.env.VITE_ALGOD_PORT,
    token: import.meta.env.VITE_ALGOD_TOKEN,
    network: import.meta.env.VITE_ALGOD_NETWORK,
  }
}

export function getIndexerConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!import.meta.env.VITE_INDEXER_SERVER) {
    throw new Error('Attempt to get default algod configuration without specifying VITE_INDEXER_SERVER in the environment variables')
  }

  return {
    server: import.meta.env.VITE_INDEXER_SERVER,
    port: import.meta.env.VITE_INDEXER_PORT,
    token: import.meta.env.VITE_INDEXER_TOKEN,
    network: import.meta.env.VITE_ALGOD_NETWORK,
  }
}

export function getKmdConfigFromViteEnvironment(): AlgoViteKMDConfig {
  if (!import.meta.env.VITE_KMD_SERVER) {
    throw new Error('Attempt to get default kmd configuration without specifying VITE_KMD_SERVER in the environment variables')
  }

  return {
    server: import.meta.env.VITE_KMD_SERVER,
    port: import.meta.env.VITE_KMD_PORT,
    token: import.meta.env.VITE_KMD_TOKEN,
    wallet: import.meta.env.VITE_KMD_WALLET,
    password: import.meta.env.VITE_KMD_PASSWORD,
  }
}

export const deployParams = {
  onSchemaBreak: 'append',
  onUpdate: 'append',
} as const
