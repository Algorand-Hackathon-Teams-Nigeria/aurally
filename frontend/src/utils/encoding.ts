import algosdk from 'algosdk'

export function encodeText(text: string): Uint8Array {
  return new Uint8Array(new TextEncoder().encode(text))
}

/**
 * Generates the box key for easy identification and searching
 */
export function generateBoxKey(type: 'Sound' | 'Art' | 'Event', title: string, creatorAddress: string): string {
  const subTitle = title.substring(0, 12)
  const date = new Date().toLocaleDateString()
  const creator = (creatorAddress ?? '').slice(0, 25)

  const assetKey = `${type}:${subTitle}-On:${date}-By:${creator}`
  return assetKey
}

interface UnknownAsset {
  type: 'Unknown'
}

export interface AssetKeyData {
  type: 'Sound' | 'Art'
  dateCreated: string
  addressSlice: string
}

export function parseAssetKey(key: string): AssetKeyData | UnknownAsset {
  const parts = key.split('-')
  if (parts.length === 3) {
    const val: AssetKeyData = {
      type: parts[0].split(':')[0] as 'Sound' | 'Art',
      dateCreated: parts[1].split(':')[1],
      addressSlice: parts[2].split(':')[1],
    }
    return val
  } else {
    return {
      type: 'Unknown',
    }
  }
}

export function filterByKeyCreator(key: string, address: string) {
  const creatorSection = key.split('-').pop()
  if (creatorSection && creatorSection.startsWith('By')) {
    const creator = creatorSection.split(':').pop()
    return !!creator?.startsWith(address.slice(0, 25))
  }
  return false
}

export type ArtNFTTupple = [bigint, string, string, string, bigint, string, string, bigint, bigint, string, boolean]
export const artNFTDecoder = algosdk.ABIType.from('(uint64,string,string,string,uint64,string,string,uint64,uint64,address,bool)')

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
  boolean,
]
export const soundNFTDecoder = algosdk.ABIType.from(
  '(uint64,string,uint64,string,string,string,uint64,string,uint64,string,string,string,address,bool)',
)

export type AurallyCreativeTupple = [boolean, boolean, bigint, string, string, bigint]
export const aurallyCreativeDecoder = algosdk.ABIType.from('(bool,bool,uint64,string,string,uint64)')

export type EventTupple = [bigint, string, string, bigint, bigint, string, bigint, string]
export const eventDecoder = algosdk.ABIType.from('(uint64,string,string,uint64,uint64,string,uint64,address)')
