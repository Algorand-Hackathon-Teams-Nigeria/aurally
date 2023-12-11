import algosdk from "algosdk"

export function encodeText(text: string): Uint8Array {
  return new Uint8Array(new TextEncoder().encode(text))
}

/**
 * Generates the assetKey for easy identification and searching
 */
export function generateAssetKey(type: "Sound" | "Art", title: string, address: string): string {
  const subTitle = title.substring(0, 8)
  const ellipse = title.length > 0 ? "..." : ""
  const date = new Date().toLocaleDateString()
  const creator = (address ?? "").slice(0, 25)

  const assetKey = `${type}:${subTitle}${ellipse}-On:${date}-By:${creator}`
  console.log(assetKey.length, assetKey)
  return assetKey
}


export function filterByKeyCreator(key: string, address: string): boolean {
  const creatorSection = key.split("-").pop()
  if (creatorSection && creatorSection.startsWith("By")) {
    const creator = creatorSection.split(":").pop()
    return creator?.startsWith(address.slice(0, 25))
  }
  return false
}


export type ArtNFTTupple = [bigint, string, string, string, bigint, string, string, bigint, bigint, string, boolean]
export const artNFTDecoder = algosdk.ABIType.from("(uint64,string,string,string,uint64,string,string,uint64,uint64,address,bool)");


export type SoundNFTTupple = [bigint, string, bigint, string, string, string, bigint, string, bigint, string, string, string, string, boolean]
export const soundNFTDecoder = algosdk.ABIType.from("(uint64,string,uint64,string,string,string,uint64,string,uint64,string,string,string,address,bool)")
