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
      totalRevenue
      newUsersToday
    }
  }
`;

export const REVENUE_OVER_TIME = gql`
  query RevenueOverTime($days: Int!) { # Query name for frontend use
    revenueOverTime(days: $days) {     # Field name matching backend @strawberry.field
      date                             # Fields matching RevenueDataPoint type
      amount
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

// export const GET_USERS = gql`
//   query GetUsers {
//     users {
//       id
//       username
//       walletAddress
//       purchasedSongs
//       dateJoined
//     }
//   }
// `;
