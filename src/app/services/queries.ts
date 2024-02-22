import { gql } from "@apollo/client";

export const a = gql`
  query GetNfts {
    soundNfts(opts: { limit: 10, offset: 0,filter: {approved: true} }) {
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

export const getCreator = (owner: string): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve("Brahm"), 1000));
};
