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
  Void: { input: any; output: any; }
};

export type AlbumFilter = {
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AlbumFilterPaginated = {
  filter?: InputMaybe<AlbumFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AlbumInput = {
  coverPhotoUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AlbumType = {
  __typename?: 'AlbumType';
  coverPhotoUrl?: Maybe<Scalars['String']['output']>;
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  featuredArtists: Array<AurallyCreativeType>;
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  sounds: Array<SoundNftType>;
};


export type AlbumTypeSoundsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
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
  id?: Maybe<Scalars['Int']['output']>;
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
  bio?: InputMaybe<Scalars['String']['input']>;
  coverPhotoUrl?: InputMaybe<Scalars['String']['input']>;
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
  bio?: Maybe<Scalars['String']['output']>;
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  dNftId?: Maybe<Scalars['Int']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
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
  id: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: AurallyCreativeType;
};

export type CommentFilter = {
  assetKey: Scalars['String']['input'];
  commentType: CommentItem;
};

export type CommentFilterPaginated = {
  filter?: InputMaybe<CommentFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CommentInput = {
  assetKey: Scalars['String']['input'];
  commentType: CommentItem;
  content: Scalars['String']['input'];
};

export enum CommentItem {
  Art = 'ART',
  Sound = 'SOUND'
}

export type CommentType = {
  __typename?: 'CommentType';
  artNft?: Maybe<ArtNftType>;
  author: AurallyCreativeType;
  content: Scalars['String']['output'];
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  soundNft?: Maybe<SoundNftType>;
};

export type EmailPasswordLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LibraryType = {
  __typename?: 'LibraryType';
  albums: Array<AlbumType>;
  sounds: Array<SoundNftType>;
  user: AurallyCreativeType;
};


export type LibraryTypeAlbumsArgs = {
  opts: NoneTypePaginated;
};


export type LibraryTypeSoundsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSoundToPlaylist: PlaylistType;
  /** @deprecated Is not needed since library is updated automagically. It's still here for insurance purposes */
  addSoundToUserLibrary: LibraryType;
  addSoundsToAlbum: AlbumType;
  createAlbum: AlbumType;
  createArtAuction: ArtAuctionType;
  createArtNft: ArtNftType;
  createSoundNft: SoundNftType;
  createUpdatePlaylist: PlaylistType;
  incrementStreamCount: Scalars['Int']['output'];
  likeAndUnlikeSoundNft: SoundNftType;
  newComment: CommentType;
  newNftPurchase: NftTxnType;
  refreshToken: AuthTokenType;
  registerStaff: StaffType;
  removeSoundsFromAlbum: AlbumType;
  saveAurallyCreative: AurallyCreativeType;
  signIn: AuthTokenType;
  signOut: Scalars['Boolean']['output'];
  staffSignIn: AuthTokenType;
  updateSoundApprovedStatus: SoundNftType;
  updateStaffRole: StaffType;
  uploadFileToIpfs: Scalars['String']['output'];
};


export type MutationAddSoundToPlaylistArgs = {
  playlistId: Scalars['Int']['input'];
  soundNftAssetId: Scalars['String']['input'];
};


export type MutationAddSoundToUserLibraryArgs = {
  assetId: Scalars['String']['input'];
};


export type MutationAddSoundsToAlbumArgs = {
  albumId: Scalars['Int']['input'];
  assetKeys: Array<Scalars['String']['input']>;
};


export type MutationCreateAlbumArgs = {
  input: AlbumInput;
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


export type MutationCreateUpdatePlaylistArgs = {
  input: PlaylistInput;
};


export type MutationIncrementStreamCountArgs = {
  assetId: Scalars['String']['input'];
  net: NetworkType;
};


export type MutationLikeAndUnlikeSoundNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type MutationNewCommentArgs = {
  input: CommentInput;
};


export type MutationNewNftPurchaseArgs = {
  input: NftTxnInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterStaffArgs = {
  input: RegisterStaffInput;
};


export type MutationRemoveSoundsFromAlbumArgs = {
  albumId: Scalars['Int']['input'];
  assetKeys: Array<Scalars['String']['input']>;
};


export type MutationSaveAurallyCreativeArgs = {
  input: AurallyCreativeInput;
};


export type MutationSignInArgs = {
  input: AuthInput;
};


export type MutationStaffSignInArgs = {
  input: EmailPasswordLoginInput;
};


export type MutationUpdateSoundApprovedStatusArgs = {
  approved: Scalars['Boolean']['input'];
  assetKey: Scalars['String']['input'];
};


export type MutationUpdateStaffRoleArgs = {
  input: UpdateStaffRoleInput;
};


export type MutationUploadFileToIpfsArgs = {
  file: Scalars['Upload']['input'];
};

export type NftTxnFilter = {
  assetId?: InputMaybe<Scalars['Int']['input']>;
  nftType?: InputMaybe<NftType>;
  usersAddress?: InputMaybe<Scalars['String']['input']>;
};

export type NftTxnFilterPaginated = {
  filter?: InputMaybe<NftTxnFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type NftTxnInput = {
  assetId: Scalars['String']['input'];
  buyersAddress: Scalars['String']['input'];
  dateAdded: Scalars['DateTime']['input'];
  nftType: NftType;
  sellersAddress: Scalars['String']['input'];
  txnId: Scalars['String']['input'];
};

export type NftTxnType = {
  __typename?: 'NFTTxnType';
  asset: ArtNftTypeSoundNftType;
  assetId: Scalars['String']['output'];
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

export type NoneTypePaginated = {
  filter?: InputMaybe<Scalars['Void']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PlaylistInput = {
  coverImageUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type PlaylistType = {
  __typename?: 'PlaylistType';
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  soundNfts: Array<SoundNftType>;
};


export type PlaylistTypeSoundNftsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};

export type Query = {
  __typename?: 'Query';
  album: AlbumType;
  albums: Array<AlbumType>;
  allNfts: Array<ArtNftTypeSoundNftType>;
  artAuctions: Array<ArtAuctionType>;
  artNft?: Maybe<ArtNftType>;
  artNfts: Array<ArtNftType>;
  assetHoldings: Scalars['String']['output'];
  creative?: Maybe<AurallyCreativeType>;
  getComments: Array<CommentType>;
  /** Get a single playlist */
  getPlaylist: PlaylistType;
  getPlaylistSounds: Array<SoundNftType>;
  /** Get all playlists */
  getPlaylists: Array<PlaylistType>;
  hasUserLikedSoundNft: Scalars['Boolean']['output'];
  me?: Maybe<AurallyCreativeType>;
  nftTransactions: Array<NftTxnType>;
  soundNft?: Maybe<SoundNftType>;
  soundNftStatistics?: Maybe<SoundNftStatisticsType>;
  soundNfts: Array<SoundNftType>;
  version: Scalars['String']['output'];
};


export type QueryAlbumArgs = {
  albumId: Scalars['Int']['input'];
};


export type QueryAlbumsArgs = {
  opts?: InputMaybe<AlbumFilterPaginated>;
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


export type QueryAssetHoldingsArgs = {
  address: Scalars['String']['input'];
  net: NetworkType;
};


export type QueryCreativeArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetCommentsArgs = {
  input: CommentFilterPaginated;
};


export type QueryGetPlaylistArgs = {
  playlistId: Scalars['Int']['input'];
};


export type QueryGetPlaylistSoundsArgs = {
  playlistId: Scalars['Int']['input'];
};


export type QueryHasUserLikedSoundNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QueryNftTransactionsArgs = {
  opts: NftTxnFilterPaginated;
};


export type QuerySoundNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QuerySoundNftStatisticsArgs = {
  assetKey: Scalars['String']['input'];
};


export type QuerySoundNftsArgs = {
  opts?: InputMaybe<SoundNftFilterPaginated>;
};

export type RegisterStaffInput = {
  email: Scalars['String']['input'];
  password1: Scalars['String']['input'];
  password2: Scalars['String']['input'];
};

export type SoundNftFilter = {
  afterPeriod?: InputMaybe<Scalars['DateTime']['input']>;
  approved?: InputMaybe<Scalars['Boolean']['input']>;
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

export type SoundNftStatisticsType = {
  __typename?: 'SoundNFTStatisticsType';
  assetId: Scalars['String']['output'];
  likesCount: Scalars['Int']['output'];
  streamCount: Scalars['Int']['output'];
};

export type SoundNftType = {
  __typename?: 'SoundNFTType';
  approved: Scalars['Boolean']['output'];
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
  id?: Maybe<Scalars['Int']['output']>;
  label: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  likeCount: Scalars['Int']['output'];
  metadataHash: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  purchased?: Maybe<Scalars['Boolean']['output']>;
  releaseDate: Scalars['DateTime']['output'];
  streamCount: Scalars['Int']['output'];
  supply: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export enum StaffRoleEnum {
  ArtModerator = 'ART_MODERATOR',
  SoundModerator = 'SOUND_MODERATOR',
  Superadmin = 'SUPERADMIN'
}

export type StaffType = {
  __typename?: 'StaffType';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  roles: Array<StaffRoleEnum>;
};

export enum UpdateRoleAction {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type UpdateStaffRoleInput = {
  action: UpdateRoleAction;
  roles: Array<StaffRoleEnum>;
  staffId: Scalars['Int']['input'];
  superSecretPassword?: InputMaybe<Scalars['String']['input']>;
};

export type GetNftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNftsQuery = { __typename?: 'Query', soundNfts: Array<{ __typename?: 'SoundNFTType', id?: number | null, artist: string, assetId: string, assetKey: string, coverImageUrl: string, dateAdded: any, price: number, title: string, creator: { __typename?: 'AurallyCreativeType', id?: number | null, address: string, username?: string | null, imageUrl?: string | null } }> };


export const GetNftsDocument = gql`
    query GetNfts {
  soundNfts(opts: {limit: 10, offset: 0, filter: {approved: true}}) {
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