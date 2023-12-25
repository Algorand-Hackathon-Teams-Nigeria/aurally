import { ABIType } from "algosdk";

type KeyType = "Sound" | "Art" | "Event" | "Proposal";


interface UnknownAsset {
  type: "Unknown";
}

export interface BoxKeyData {
  type: KeyType;
  dateCreated: string;
  addressSlice: string;
}

export function parseBoxKey(key: string): BoxKeyData | UnknownAsset {
  const parts = key.split("-");
  if (parts.length === 3) {
    const val: BoxKeyData = {
      type: parts[0].split(":")[0] as KeyType,
      dateCreated: parts[1].split(":")[1],
      addressSlice: parts[2].split(":")[1],
    };
    return val;
  } else {
    return {
      type: "Unknown",
    };
  }
}

export type ArtNFTTupple = [
  bigint,
  string,
  string,
  string,
  bigint,
  string,
  string,
  bigint,
  bigint,
  string,
  boolean
];

export const artNFTDecoder = ABIType.from(
  "(uint64,string,string,string,uint64,string,string,uint64,uint64,address,bool)"
);

export type SoundNFTTupple = [
  bigint,
  string,
  bigint,
  string,
  string,
  string,
  bigint,
  string,
  bigint,
  string,
  string,
  string,
  string,
  boolean
];
export const soundNFTDecoder = ABIType.from(
  "(uint64,string,uint64,string,string,string,uint64,string,uint64,string,string,string,address,bool)"
);

export type AurallyCreativeTupple = [
  boolean,
  boolean,
  bigint,
  string,
  string,
  bigint
];
export const aurallyCreativeDecoder = ABIType.from(
  "(bool,bool,uint64,string,string,uint64)"
);
