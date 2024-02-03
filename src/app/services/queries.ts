import { gql } from "@apollo/client";

export const a = gql`
  query GetNfts {
    soundNfts {
      artist
      assetId
      assetKey
      coverImageUrl
      creator {
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
