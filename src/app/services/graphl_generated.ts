import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ArtNftFilter = {
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArtNftFilterPaginated = {
  filter?: InputMaybe<ArtNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtNftInput = {
  assetId: Scalars['Int']['input'];
  assetKey: Scalars['String']['input'];
  creator: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  ipfsLocation: Scalars['String']['input'];
  metadataHash: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type ArtNftType = {
  __typename?: 'ArtNFTType';
  assetId: Scalars['Int']['output'];
  assetKey: Scalars['String']['output'];
  creatorsAddress: Scalars['String']['output'];
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  forSale: Scalars['Boolean']['output'];
  ipfsLocation: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  metadataHash: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  ownersAddress: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type AurallyCreativeInput = {
  address: Scalars['String']['input'];
  dNftId: Scalars['Int']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  isArtCreative?: Scalars['Boolean']['input'];
  isMusicCreative?: Scalars['Boolean']['input'];
  minted?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};

export type AurallyCreativeType = {
  __typename?: 'AurallyCreativeType';
  address: Scalars['String']['output'];
  dNftId: Scalars['Int']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  isArtCreative: Scalars['Boolean']['output'];
  isMusicCreative: Scalars['Boolean']['output'];
  minted: Scalars['Int']['output'];
  nftMetatdataHash: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type AuthInput = {
  net: NetworkType;
  txnId: Scalars['String']['input'];
};

export type AuthTokenType = {
  __typename?: 'AuthTokenType';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: AurallyCreativeType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArtNft: ArtNftType;
  createSoundNft: SoundNftType;
  newAurallyCreative: AurallyCreativeType;
  newNftPurchase: NftTxnType;
  refreshToken: AuthTokenType;
  signIn: AuthTokenType;
};


export type MutationCreateArtNftArgs = {
  input: ArtNftInput;
};


export type MutationCreateSoundNftArgs = {
  input: SoundNftInput;
};


export type MutationNewAurallyCreativeArgs = {
  input: AurallyCreativeInput;
};


export type MutationNewNftPurchaseArgs = {
  input: NftTxnInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input: AuthInput;
};

export type NftTxnFilter = {
  assetId?: InputMaybe<Scalars['Int']['input']>;
  nftType?: InputMaybe<NftType>;
  usersAddress: Scalars['String']['input'];
};

export type NftTxnFilterPaginated = {
  filter?: InputMaybe<NftTxnFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type NftTxnInput = {
  assetId: Scalars['Int']['input'];
  buyersAddress: Scalars['String']['input'];
  dateAdded: Scalars['DateTime']['input'];
  nftType: NftType;
  sellersAddress: Scalars['String']['input'];
  txnId: Scalars['String']['input'];
};

export type NftTxnType = {
  __typename?: 'NFTTxnType';
  assetId: Scalars['Int']['output'];
  buyer: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  nftType: NftType;
  seller: AurallyCreativeType;
  txnId: Scalars['String']['output'];
};

export enum NftType {
  Art = 'ART',
  Sound = 'SOUND'
}

export enum NetworkType {
  Betanet = 'BETANET',
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET'
}

export type Query = {
  __typename?: 'Query';
  artNfts: Array<ArtNftType>;
  me?: Maybe<AurallyCreativeType>;
  soundNfts: Array<SoundNftType>;
  userNftPurchases: Array<NftTxnType>;
  userNftSales: Array<NftTxnType>;
  version: Scalars['String']['output'];
};


export type QueryArtNftsArgs = {
  opts?: InputMaybe<ArtNftFilterPaginated>;
};


export type QuerySoundNftsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};


export type QueryUserNftPurchasesArgs = {
  opts: NftTxnFilterPaginated;
};


export type QueryUserNftSalesArgs = {
  opts: NftTxnFilterPaginated;
};

export type SoundNftFilter = {
  artist?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  minSupply?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SoundNftFilterPaginated = {
  filter?: InputMaybe<SoundNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SoundNftInput = {
  artist: Scalars['String']['input'];
  assetId: Scalars['Int']['input'];
  assetKey: Scalars['String']['input'];
  audioSampleIpfs: Scalars['String']['input'];
  coverImageIpfs: Scalars['String']['input'];
  creator: Scalars['String']['input'];
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  fullTrackIpfs: Scalars['String']['input'];
  genre: Scalars['String']['input'];
  label: Scalars['String']['input'];
  metadataHash: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  releaseDate: Scalars['DateTime']['input'];
  supply: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type SoundNftType = {
  __typename?: 'SoundNFTType';
  artist: Scalars['String']['output'];
  assetId: Scalars['Int']['output'];
  assetKey: Scalars['String']['output'];
  audioSampleIpfs: Scalars['String']['output'];
  coverImageIpfs: Scalars['String']['output'];
  creatorAddress: Scalars['String']['output'];
  dateAdded: Scalars['DateTime']['output'];
  forSale: Scalars['Boolean']['output'];
  fullTrackIpfs: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  label: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  metadataHash: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  releaseDate: Scalars['DateTime']['output'];
  supply: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GetNftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNftsQuery = { __typename?: 'Query', soundNfts: Array<{ __typename?: 'SoundNFTType', title: string, price: number, creatorAddress: string, coverImageIpfs: string, assetId: number, assetKey: string }>, artNfts: Array<{ __typename?: 'ArtNFTType', title: string, price: number, creatorsAddress: string, ipfsLocation: string, assetId: number, assetKey: string }> };


export const GetNftsDocument = gql`
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

/**
 * __useGetNftsQuery__
 *
 * To run a query within a React component, call `useGetNftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNftsQuery(baseOptions?: Apollo.QueryHookOptions<GetNftsQuery, GetNftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNftsQuery, GetNftsQueryVariables>(GetNftsDocument, options);
      }
export function useGetNftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftsQuery, GetNftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNftsQuery, GetNftsQueryVariables>(GetNftsDocument, options);
        }
export function useGetNftsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNftsQuery, GetNftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNftsQuery, GetNftsQueryVariables>(GetNftsDocument, options);
        }
export type GetNftsQueryHookResult = ReturnType<typeof useGetNftsQuery>;
export type GetNftsLazyQueryHookResult = ReturnType<typeof useGetNftsLazyQuery>;
export type GetNftsSuspenseQueryHookResult = ReturnType<typeof useGetNftsSuspenseQuery>;
export type GetNftsQueryResult = Apollo.QueryResult<GetNftsQuery, GetNftsQueryVariables>;