type SoundNftType = {
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

type ArtNftType = {
  id: number
  title: string
  artist: string
  supply: number
  desc: string
  price: number
  imgUrl: string
  type: 'art'
}

type CommunityCardType = {
  id: number
  name: string
  imgUrl: string
  desc?: string
  members: number
  creator: string
}

type EventCardType = {
  id: number
  title: string
  imgUrl: string
  desc: string
  price: number
  date: string
  creator: string
  no_left: number
}