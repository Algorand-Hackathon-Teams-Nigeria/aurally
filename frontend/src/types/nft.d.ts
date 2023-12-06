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
  creator: string
  supply: number
  desc: string
  price: number
  imgUrl: string
  type: 'art'
}
