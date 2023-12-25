import { ArtType, BoxData, SoundType } from '../types/assets'
import { ArtNft, SoundNft } from '../contracts/Aurally'
import {
  ArtNFTTupple,
  SoundNFTTupple,
  artNFTDecoder,
  soundNFTDecoder,
} from './encoding'

export function getTimeStamp(dateTime: string): number | undefined {
  const date = new Date(dateTime)
  if (!isNaN(date.getTime())) {
    return date.getTime()
  }
  return undefined
}

export function parseNftBoxData(data: BoxData[]): (SoundType | ArtType)[] {
  const nftData: (SoundType | ArtType)[] = []
  for (const box of data ?? []) {
    if (box.name.name.startsWith('Art')) {
      const artNFT = ArtNft(artNFTDecoder.decode(box.value) as ArtNFTTupple)
      const artNFTData: ArtType = { type: 'art', data: artNFT }
      nftData.push(artNFTData)
    } else {
      const soundNFT = SoundNft(soundNFTDecoder.decode(box.value) as SoundNFTTupple)
      const soundNFTData: SoundType = { type: 'sound', data: soundNFT }
      nftData.push(soundNFTData)
    }
  }
  return nftData
}
