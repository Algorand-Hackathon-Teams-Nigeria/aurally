import { AppMetadata, AppReference } from '@algorandfoundation/algokit-utils/types/app'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { AurallyClient } from '../contracts/AurallyClient'
import { Account } from '../types/dataTypes'

const appRefAtom = atom<(AppMetadata | AppReference) | undefined>(undefined)
const appClientAtom = atom<AurallyClient | undefined>(undefined)
const userAccountAtom = atom<Account | undefined>(undefined)

type DaoType = {
  price: number
  proposal: string
  voters: number
  type: 'sound' | 'art'
  nftId: number
}

export type SoundNftType = {
  id: number
  title: string
  label: string
  artist: string
  supply: number
  desc: string
  price: number
  audio: string
  sample: string
  streams: number
  genre: string
  imgUrl: string
  type: 'sound'
}

export type ArtNftType = {
  id: number
  title: string
  creator: string
  supply: number
  desc: string
  price: number
  imgUrl: string
  type: 'art'
}

const template = [
  {
    desc: 'It is the first art for testing.',
    id: 0,
    imgUrl: 'https://gateway.pinata.cloud/ipfs/QmWAfbciqqq8CAqJ3Y5qZrC8jDBi2UF2RXn3nGvXT3a8YB',
    price: 0.1,
    supply: 10,
    title: 'Art 001',
    creator: '@user23456',
    type: 'art',
  },
  {
    desc: 'Testing art with number 002',
    id: 1,
    imgUrl: 'https://gateway.pinata.cloud/ipfs/QmWKnxbEMHbxAphymdk34J4frDpXf9RXnnvLCNDfXDRHDh',
    price: 0.1,
    supply: 10,
    title: 'Art 002',
    creator: '@user23456',
    type: 'art',
  },
  {
    artist: 'Brahms Anthony',
    audio: 'https://gateway.pinata.cloud/ipfs/QmTXqwCT9SzoKVoyws5Z2EH3aJsAiD9pectcx5nztdtFfN',
    desc: 'This is an interesting beat cam from the lowest point, sweat, and joy. I want my fans to stream and enjoy.',
    genre: 'Pop',
    id: 2,
    imgUrl: 'https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu',
    label: 'Beat Label',
    price: 0.1,
    sample: 'https://gateway.pinata.cloud/ipfs/QmTXqwCT9SzoKVoyws5Z2EH3aJsAiD9pectcx5nztdtFfN',
    streams: 0,
    supply: 1000000,
    title: 'Brahams Beat',
    type: 'sound',
  },
  {
    artist: 'Brahms',
    audio: 'https://gateway.pinata.cloud/ipfs/QmTXqwCT9SzoKVoyws5Z2EH3aJsAiD9pectcx5nztdtFfN',
    desc: 'This is music 002 for testing, enjoy and see for yourself the enjoyment of sound and its impact.',
    genre: 'Pop',
    id: 3,
    imgUrl: 'https://gateway.pinata.cloud/ipfs/QmbexdpyP8CHgNzmzAyPfBa6FW44EGDhuNapktfLVfobV9',
    label: 'Music Label',
    price: 1,
    sample: 'https://gateway.pinata.cloud/ipfs/QmTXqwCT9SzoKVoyws5Z2EH3aJsAiD9pectcx5nztdtFfN',
    streams: 0,
    supply: 1000000,
    title: 'Music 002',
    type: 'sound',
  },
] as Array<SoundNftType | ArtNftType>

const daoListAtom = atomWithStorage<DaoType[]>('daoList', [])
const nftListAtom = atomWithStorage<Array<SoundNftType | ArtNftType>>('nftList', template)

const soundListAtom = atom<SoundNftType[]>((get) => {
  const list = get(nftListAtom)
  return list.filter((nft) => nft.type === 'sound') as SoundNftType[]
})

const searchAtom = atom<string>('')

const filteredListAtom = atom<(SoundNftType | ArtNftType)[]>((get) => {
  const list = get(nftListAtom)
  const search = get(searchAtom)
  if (search === '') return list
  return list.filter((nft) => nft.title.toLowerCase().includes(search.toLowerCase()))
})

const collectedNftsAtom = atomWithStorage<Array<SoundNftType | ArtNftType>>('collectedNfts', template)
const myStreamAtom = atom((get) => {
  const list = get(collectedNftsAtom)
  return list.filter((nft) => nft.type === 'sound') as SoundNftType[]
})

const myArtAtom = atom((get) => {
  const list = get(collectedNftsAtom)
  return list.filter((nft) => nft.type === 'art') as ArtNftType[]
})

const createdNftsAtom = atomWithStorage<(SoundNftType | ArtNftType)[]>('createdNfts', template)

export {
  appRefAtom,
  appClientAtom,
  userAccountAtom,
  daoListAtom,
  soundListAtom,
  nftListAtom,
  searchAtom,
  filteredListAtom,
  collectedNftsAtom,
  createdNftsAtom,
  myStreamAtom,
  myArtAtom,
}
