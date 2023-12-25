import { ArtNft, SoundNft, Bo } from '../contracts/Aurally'

type BoxData = {
  name: BoxName
  value: Uint8Array
}

type SoundType = {
  type: 'sound'
  data: SoundNft
}

type ArtType = {
  type: 'art'
  data: ArtNft
}
