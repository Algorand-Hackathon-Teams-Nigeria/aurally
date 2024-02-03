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
  Upload: { input: any; output: any; }
};

export type AllNftInput = {
  artOpts?: InputMaybe<ArtNftFilterPaginated>;
  soundOpts?: InputMaybe<SoundNftFilterPaginated>;
};

export type ArtAuctionFilter = {
  auctioneer?: InputMaybe<Scalars['String']['input']>;
  closed?: InputMaybe<Scalars['Boolean']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  itemName?: InputMaybe<Scalars['String']['input']>;
  minBid?: InputMaybe<Scalars['Int']['input']>;
  startsAfter?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ArtAuctionFilterPaginated = {
  filter?: InputMaybe<ArtAuctionFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtAuctionInput = {
  auctionKey: Scalars['String']['input'];
  auctioneer: Scalars['String']['input'];
  closed: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  endsAt: Scalars['DateTime']['input'];
  highestBid: Scalars['Int']['input'];
  highestBidder: Scalars['String']['input'];
  itemAssetKey: Scalars['String']['input'];
  itemName: Scalars['String']['input'];
  minBid: Scalars['Int']['input'];
  startsAt: Scalars['DateTime']['input'];
};

export type ArtAuctionType = {
  __typename?: 'ArtAuctionType';
  artNft: ArtNftType;
  auctionKey: Scalars['String']['output'];
  auctioneer: AurallyCreativeType;
  closed: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  endsAt: Scalars['DateTime']['output'];
  highestBid: Scalars['Int']['output'];
  highestBidder: AurallyCreativeType;
  itemName: Scalars['String']['output'];
  minBid: Scalars['Int']['output'];
  startsAt: Scalars['DateTime']['output'];
};

export type ArtNftFilter = {
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  onAuction?: InputMaybe<Scalars['Boolean']['input']>;
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArtNftFilterPaginated = {
  filter?: InputMaybe<ArtNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ArtNftInput = {
  assetId: Scalars['String']['input'];
  assetKey: Scalars['String']['input'];
  claimed?: Scalars['Boolean']['input'];
  creator: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl: Scalars['String']['input'];
  metadataHash: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  onAuction?: InputMaybe<Scalars['Boolean']['input']>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type ArtNftType = {
  __typename?: 'ArtNFTType';
  assetId: Scalars['String']['output'];
  assetKey: Scalars['String']['output'];
  claimed: Scalars['Boolean']['output'];
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  forSale: Scalars['Boolean']['output'];
  imageUrl: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  metadataHash: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner: AurallyCreativeType;
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type ArtNftTypeSoundNftType = ArtNftType | SoundNftType;

export type AurallyCreativeInput = {
  address: Scalars['String']['input'];
  dNftId?: InputMaybe<Scalars['Int']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  minted?: InputMaybe<Scalars['Int']['input']>;
  purchased?: InputMaybe<Scalars['Int']['input']>;
  sold?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AurallyCreativeType = {
  __typename?: 'AurallyCreativeType';
  address: Scalars['String']['output'];
  dNftId?: Maybe<Scalars['Int']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  library: LibraryType;
  minted?: Maybe<Scalars['Int']['output']>;
  purchased?: Maybe<Scalars['Int']['output']>;
  sold?: Maybe<Scalars['Int']['output']>;
  username?: Maybe<Scalars['String']['output']>;
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

export type LibraryType = {
  __typename?: 'LibraryType';
  sounds: Array<SoundNftType>;
  user: AurallyCreativeType;
};


export type LibraryTypeSoundsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** @deprecated Is not needed since library is updated automagically. It's still here for insurance purposes */
  addSoundToUserLibrary: LibraryType;
  createArtAuction: ArtAuctionType;
  createArtNft: ArtNftType;
  createSoundNft: SoundNftType;
  newNftPurchase: NftTxnType;
  refreshToken: AuthTokenType;
  saveAurallyCreative: AurallyCreativeType;
  signIn: AuthTokenType;
  signOut: Scalars['Boolean']['output'];
};


export type MutationAddSoundToUserLibraryArgs = {
  assetId: Scalars['String']['input'];
};


export type MutationCreateArtAuctionArgs = {
  input: ArtAuctionInput;
};


export type MutationCreateArtNftArgs = {
  input: ArtNftInput;
};


export type MutationCreateSoundNftArgs = {
  input: SoundNftInput;
};


export type MutationNewNftPurchaseArgs = {
  input: NftTxnInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSaveAurallyCreativeArgs = {
  input: AurallyCreativeInput;
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
  asset: ArtNftTypeSoundNftType;
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
  allNfts: Array<ArtNftTypeSoundNftType>;
  artAuctions: Array<ArtAuctionType>;
  artNft?: Maybe<ArtNftType>;
  artNfts: Array<ArtNftType>;
  me?: Maybe<AurallyCreativeType>;
  nftTransactions: Array<NftTxnType>;
  soundNft?: Maybe<SoundNftType>;
  soundNfts: Array<SoundNftType>;
  version: Scalars['String']['output'];
};


export type QueryAllNftsArgs = {
  opts: AllNftInput;
};


export type QueryArtAuctionsArgs = {
  opts?: InputMaybe<ArtAuctionFilterPaginated>;
};


export type QueryArtNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QueryArtNftsArgs = {
  opts?: InputMaybe<ArtNftFilterPaginated>;
};


export type QueryNftTransactionsArgs = {
  opts: NftTxnFilterPaginated;
};


export type QuerySoundNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QuerySoundNftsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};

export type SoundNftFilter = {
  artist?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
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
  assetId: Scalars['String']['input'];
  assetKey: Scalars['String']['input'];
  audioSampleFile: Scalars['Upload']['input'];
  claimed?: Scalars['Boolean']['input'];
  coverImageUrl: Scalars['String']['input'];
  creator: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  fullTrackFile: Scalars['Upload']['input'];
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
  assetId: Scalars['String']['output'];
  assetKey: Scalars['String']['output'];
  claimed: Scalars['Boolean']['output'];
  coverImageUrl: Scalars['String']['output'];
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  forSale: Scalars['Boolean']['output'];
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


export type GetNftsQuery = { __typename?: 'Query', soundNfts: Array<{ __typename?: 'SoundNFTType', artist: string, assetId: string, assetKey: string, coverImageUrl: string, dateAdded: any, price: number, title: string, creator: { __typename?: 'AurallyCreativeType', address: string, username?: string | null, imageUrl?: string | null } }> };


export const GetNftsDocument = gql`
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