import { gql } from "@apollo/client";

export const SOUND_NFTS = gql`
  query GetNfts {
    soundNfts(opts: { limit: 20, offset: 0,filter: {approved: true} }) {
      id
      artist
      assetId
      assetKey
      coverImageUrl
      creator {
        id
        address
        username
        imageUrl
      }
      dateAdded
      price
      title
    }
  }
`;

export const APP_STATISTICS = gql`
  query AppStatistics {
    appStatistics {
      totalArtNfts
      totalPurchases
      totalRegisteredUsers
      totalSoundNfts
      totalCreators
    }
  }
`;
