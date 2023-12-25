import {
  getAlgoIndexerClient,
  getAlgoClient,
} from "@algorandfoundation/algokit-utils";
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client";
import { AurallyClient } from "../contracts/Aurally";
import {
  getAlgodConfigFromViteEnvironment,
  getAppRefrenceFromViteEnvironment,
  getIndexerConfigFromViteEnvironment,
} from "./algo-constants";

export const getAlgodClient = () => {
  const algodConfig = getAlgodConfigFromViteEnvironment();
  const algodClient = getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  });
  return algodClient;
};

export const getIndexer = () => {
  const indexerConfig = getIndexerConfigFromViteEnvironment();
  const indexer = getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  });
  return indexer;
};

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export const createAppClient = (sender?: TransactionSignerAccount) => {
  const appRef = getAppRefrenceFromViteEnvironment();
  const appDetails: AppDetails = {
    resolveBy: "id",
    id: Number(appRef.appId),
    sender,
  };
  return new AurallyClient(appDetails, getAlgodClient());
};
