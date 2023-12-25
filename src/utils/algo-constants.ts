import {
  AlgoViteClientConfig,
  AlgoViteKMDConfig,
} from "../interfaces/network";
import { AurallyToken } from "../contracts/Aurally";
import {
  AppMetadata,
  AppReference,
} from "@algorandfoundation/algokit-utils/types/app";

type AppRefrence =  {
  appId: string;
  creatorAddress: string
}

export function getAppRefrenceFromViteEnvironment(): AppRefrence {
  if (!process.env.NEXT_PUBLIC_APPLICATION_ID) {
    throw new Error(
      "Attempt to get application id failed: NEXT_PUBLIC_APPLICATION_ID env variable not set"
    );
  }

  return {
    appId: process.env.NEXT_PUBLIC_APPLICATION_ID,
    creatorAddress: process.env.NEXT_PUBLIC_CREATOR_ADDRESS ?? "",
  };
}

export function getAlgodConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!process.env.NEXT_PUBLIC_ALGOD_SERVER) {
    throw new Error(
      "Attempt to get default algod configuration without specifying NEXT_PUBLIC_ALGOD_SERVER in the environment variables"
    );
  }

  return {
    server: process.env.NEXT_PUBLIC_ALGOD_SERVER,
    port: process.env.NEXT_PUBLIC_ALGOD_PORT ?? "",
    token: process.env.NEXT_PUBLIC_ALGOD_TOKEN ?? "",
    network: process.env.NEXT_PUBLIC_ALGOD_NETWORK ?? "",
  };
}

export function getIndexerConfigFromViteEnvironment(): AlgoViteClientConfig {
  if (!process.env.NEXT_PUBLIC_INDEXER_SERVER) {
    throw new Error(
      "Attempt to get default algod configuration without specifying NEXT_PUBLIC_INDEXER_SERVER in the environment variables"
    );
  }

  return {
    server: process.env.NEXT_PUBLIC_INDEXER_SERVER,
    port: process.env.NEXT_PUBLIC_INDEXER_PORT ?? "",
    token: process.env.NEXT_PUBLIC_INDEXER_TOKEN ?? "",
    network: process.env.NEXT_PUBLIC_ALGOD_NETWORK ?? "",
  };
}

export function getKmdConfigFromViteEnvironment(): AlgoViteKMDConfig {
  if (!process.env.NEXT_PUBLIC_KMD_SERVER) {
    throw new Error(
      "Attempt to get default kmd configuration without specifying NEXT_PUBLIC_KMD_SERVER in the environment variables"
    );
  }

  return {
    server: process.env.NEXT_PUBLIC_KMD_SERVER,
    port: process.env.NEXT_PUBLIC_KMD_PORT ?? "",
    token: process.env.NEXT_PUBLIC_KMD_TOKEN ?? "",
    wallet: process.env.NEXT_PUBLIC_KMD_WALLET ?? "",
    password: process.env.NEXT_PUBLIC_KMD_PASSWORD ?? "",
  };
}

export const deployParams = {
  onSchemaBreak: "append",
  onUpdate: "append",
} as const;

export const auraToken = {
  asset_id: 504800855n,
  asset_key: "aura",
  asset_total: 999999999997n,
} as AurallyToken;

export const appRef = {
  appId: 504786048,
  appAddress: "Z3OFRYXAQWK43T3BJTU5GXPY65Z36SUYZNS6ELYZBVNMUURWWAOZDP74ZY",
} as AppReference | AppMetadata;
