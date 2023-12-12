import { BoxName } from '@algorandfoundation/algokit-utils/types/app'
import { ArtType, BoxData, EventType, SoundType } from '../types/assets'
import { ArtNft, SoundNft, Event } from '../contracts/Aurally'
import { ArtNFTTupple, EventTupple, SoundNFTTupple, artNFTDecoder, eventDecoder, soundNFTDecoder } from './encoding'

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

export function parseEventBoxData(data: BoxData[]): EventType[] {
  const eventData: EventType[] = []
  for (const box of data ?? []) {
    if (box.name.name.startsWith('Event')) {
      const eventDetails = Event(eventDecoder.decode(box.value) as EventTupple)
      eventData.push({ type: "event", data: eventDetails })
    }
  }
  return eventData
}
