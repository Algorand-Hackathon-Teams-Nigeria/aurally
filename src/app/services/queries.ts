import { gql } from "@apollo/client";

export const a = gql`
  query GetNfts {
    soundNfts {
      title
      price
      creatorAddress
      coverImageIpfs
      assetId
      assetKey
    }
    artNfts {
      title
      price
      creatorsAddress
      ipfsLocation
      assetId
      assetKey
    }
  }
`;

export const getCreator = (owner: string): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve("Brahm"), 1000));
};