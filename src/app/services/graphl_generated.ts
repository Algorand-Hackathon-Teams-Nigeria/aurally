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
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type AdminNftStatisticsType = {
  __typename?: 'AdminNFTStatisticsType';
  assetId: Scalars['String']['output'];
  creatorUsername: Scalars['String']['output'];
  likesCount: Scalars['Int']['output'];
  sampleTrackStreamCount: Scalars['Int']['output'];
  streamCount?: Maybe<Scalars['Int']['output']>;
  viewsCount?: Maybe<Scalars['Int']['output']>;
};

export type AlbumFilter = {
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AlbumInput = {
  coverPhotoUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AlbumOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AlbumOrderingAlbumFilterListData = {
  filter?: InputMaybe<AlbumFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<AlbumOrdering>;
};

export type AlbumType = {
  __typename?: 'AlbumType';
  coverPhotoUrl?: Maybe<Scalars['String']['output']>;
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  featuredArtists: Array<AurallyCreativeType>;
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sounds: Array<SoundNftType>;
};


export type AlbumTypeSoundsArgs = {
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};

export type AllNftInput = {
  artOpts?: InputMaybe<ArtNftOrderingArtNftFilterListData>;
  soundOpts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
  videoOpts?: InputMaybe<VideoNftOrderingVideoNftFilterListData>;
};

export enum AmountControl {
  Fixed = 'FIXED',
  Overpayment = 'OVERPAYMENT',
  Underpayment = 'UNDERPAYMENT'
}

export type ApplicationStatisticsType = {
  __typename?: 'ApplicationStatisticsType';
  newUsersToday: Scalars['Int']['output'];
  totalArtNfts: Scalars['Int']['output'];
  totalCreators: Scalars['Int']['output'];
  totalPurchases: Scalars['Int']['output'];
  totalRegisteredUsers: Scalars['Int']['output'];
  totalRevenue: Scalars['Float']['output'];
  totalSoundNfts: Scalars['Int']['output'];
};

export type ArtAuctionFilter = {
  auctioneer?: InputMaybe<Scalars['String']['input']>;
  closed?: InputMaybe<Scalars['Boolean']['input']>;
  endsBefore?: InputMaybe<Scalars['DateTime']['input']>;
  itemName?: InputMaybe<Scalars['String']['input']>;
  minBid?: InputMaybe<Scalars['Int']['input']>;
  startsAfter?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ArtAuctionInput = {
  auctionKey: Scalars['String']['input'];
  auctioneer: Scalars['String']['input'];
  closed: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  endsAt: Scalars['DateTime']['input'];
  highestBid: Scalars['BigInt']['input'];
  highestBidder: Scalars['String']['input'];
  itemAssetKey: Scalars['String']['input'];
  itemName: Scalars['String']['input'];
  minBid: Scalars['Int']['input'];
  startsAt: Scalars['DateTime']['input'];
};

export type ArtAuctionOrdering = {
  endsAt?: InputMaybe<Scalars['Boolean']['input']>;
  endsAtDesc?: InputMaybe<Scalars['Boolean']['input']>;
  highestBid?: InputMaybe<Scalars['Boolean']['input']>;
  highestBidDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArtAuctionOrderingArtAuctionFilterListData = {
  filter?: InputMaybe<ArtAuctionFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<ArtAuctionOrdering>;
};

export type ArtAuctionType = {
  __typename?: 'ArtAuctionType';
  artNft: ArtNftType;
  auctionKey: Scalars['String']['output'];
  auctioneer: AurallyCreativeType;
  closed: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  endsAt: Scalars['DateTime']['output'];
  highestBid: Scalars['Float']['output'];
  highestBidder?: Maybe<AurallyCreativeType>;
  id: Scalars['ID']['output'];
  itemName: Scalars['String']['output'];
  minBid: Scalars['Int']['output'];
  startsAt: Scalars['DateTime']['output'];
};

export type ArtNftFilter = {
  afterPeriod?: InputMaybe<Scalars['DateTime']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ArtNftOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  likes?: InputMaybe<Scalars['Boolean']['input']>;
  likesDesc?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Boolean']['input']>;
  priceDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArtNftOrderingArtNftFilterListData = {
  filter?: InputMaybe<ArtNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<ArtNftOrdering>;
};

export type ArtNftType = {
  __typename?: 'ArtNFTType';
  approved: Scalars['Boolean']['output'];
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
  onAuction: Scalars['Boolean']['output'];
  owner: AurallyCreativeType;
  price: Scalars['Float']['output'];
  purchased: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type ArtNftTypeSoundNftTypeVideoNftType = ArtNftType | SoundNftType | VideoNftType;

export type AssetIdUpdateInput = {
  assetId: Scalars['String']['input'];
  assetKey: Scalars['String']['input'];
};

export type AurallyCreativeFilter = {
  address?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  minted?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

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

export type AurallyCreativeOrdering = {
  minted?: InputMaybe<Scalars['Boolean']['input']>;
  mintedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  purchased?: InputMaybe<Scalars['Boolean']['input']>;
  purchasedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  sold?: InputMaybe<Scalars['Boolean']['input']>;
  soldDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AurallyCreativeOrderingAurallyCreativeFilterListData = {
  filter?: InputMaybe<AurallyCreativeFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<AurallyCreativeOrdering>;
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
  minted: Scalars['Int']['output'];
  purchased: Scalars['Int']['output'];
  sold?: Maybe<Scalars['Int']['output']>;
  syncedWithContract: Scalars['Boolean']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type AurallyCreativeTypeSoundNftTypePlaylistTypeAlbumType = AlbumType | AurallyCreativeType | PlaylistType | SoundNftType;

export type AurallyNftType = {
  __typename?: 'AurallyNFTType';
  art?: Maybe<ArtNftType>;
  sound?: Maybe<SoundNftType>;
  video?: Maybe<VideoNftType>;
};

export type AurallyWalletTransactionPinInput = {
  address: Scalars['String']['input'];
  mnemonicPhrase: Scalars['String']['input'];
  pin: Scalars['String']['input'];
};

export type AurallyWalletType = {
  __typename?: 'AurallyWalletType';
  address: Scalars['String']['output'];
  ciphertext?: Maybe<Scalars['String']['output']>;
  fingerprint?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isExisting: Scalars['Boolean']['output'];
  mnemonicPhrase?: Maybe<Scalars['String']['output']>;
};

export type AuthInput = {
  net: NetworkTypeEnum;
  txnId: Scalars['String']['input'];
};

export type AuthTokenType = {
  __typename?: 'AuthTokenType';
  id: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: AurallyCreativeType;
};

export type CommentInput = {
  assetKey: Scalars['String']['input'];
  commentType: CommentItem;
  content: Scalars['String']['input'];
  datetimeAdded: Scalars['DateTime']['input'];
};

export enum CommentItem {
  Art = 'ART',
  Sound = 'SOUND',
  Video = 'VIDEO'
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

export type EasyShareTransactionInput = {
  amountPaid: Scalars['Float']['input'];
  amountReceived: Scalars['Float']['input'];
  orderId: Scalars['String']['input'];
  receiveCurrency: Scalars['String']['input'];
  status?: InputMaybe<EasyShareTransactionSatus>;
  txReference: Scalars['String']['input'];
};

export enum EasyShareTransactionSatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type EasyShareTransactionSatusInput = {
  cryptoAmount?: InputMaybe<Scalars['Float']['input']>;
  orderId: Scalars['String']['input'];
  status: EasyShareTransactionSatus;
};

export type EasyShareTransactionType = {
  __typename?: 'EasyShareTransactionType';
  amountPaid: Scalars['Float']['output'];
  amountReceived: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  orderId: Scalars['String']['output'];
  receiveCurrency: Scalars['String']['output'];
  status: EasyShareTransactionSatus;
  txReference: Scalars['String']['output'];
};

export type EasyshareTransactionFilter = {
  receiveCurrency?: InputMaybe<Scalars['String']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
};

export type EasyshareTransactionOrdering = {
  amountPaid?: InputMaybe<Scalars['Boolean']['input']>;
  amountPaidDesc?: InputMaybe<Scalars['Boolean']['input']>;
  amountReceived?: InputMaybe<Scalars['Boolean']['input']>;
  amountReceivedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EasyshareTransactionOrderingEasyshareTransactionFilterListData = {
  filter?: InputMaybe<EasyshareTransactionFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<EasyshareTransactionOrdering>;
};

export type EmailPasswordLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LibraryType = {
  __typename?: 'LibraryType';
  albums: Array<AlbumType>;
  artists: Array<AurallyCreativeType>;
  nfts: Array<ArtNftTypeSoundNftTypeVideoNftType>;
  sounds: Array<SoundNftType>;
  user: AurallyCreativeType;
};


export type LibraryTypeAlbumsArgs = {
  opts?: InputMaybe<AlbumOrderingAlbumFilterListData>;
};


export type LibraryTypeArtistsArgs = {
  opts?: InputMaybe<AurallyCreativeOrderingAurallyCreativeFilterListData>;
};


export type LibraryTypeNftsArgs = {
  opts: AllNftInput;
};


export type LibraryTypeSoundsArgs = {
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};

export type MetadataArgs = {
  albumId?: InputMaybe<Scalars['Int']['input']>;
  assetKey?: InputMaybe<Scalars['String']['input']>;
  playlistId?: InputMaybe<Scalars['Int']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum MetadataChoices {
  Album = 'ALBUM',
  Creative = 'CREATIVE',
  Playlist = 'PLAYLIST',
  Sound = 'SOUND'
}

export type Mutation = {
  __typename?: 'Mutation';
  addSoundToPlaylist: PlaylistType;
  addSoundsToAlbum: AlbumType;
  bulkCreatePendingAppPayment: Array<PendingAppPaymentType>;
  bulkSyncAssetsWithContract?: Maybe<Scalars['Void']['output']>;
  claimCreatedArt: ArtNftType;
  completeArtAuction: ArtAuctionType;
  confirmAndFundCreatedWallet: Scalars['Boolean']['output'];
  createAlbum: AlbumType;
  createArtAuction: ArtAuctionType;
  createArtNft: ArtNftType;
  createSoundNft: SoundNftType;
  createUpdatePlaylist: PlaylistType;
  createVideoNft: VideoNftType;
  createVirtualAccount: VirtualAccountType;
  createWallet: AurallyWalletType;
  decryptTransactionPrivateKey: Scalars['String']['output'];
  deleteArtNft: Scalars['Boolean']['output'];
  likeAndUnlikeNft: AurallyNftType;
  newComment: CommentType;
  newNftPurchase: NftTxnType;
  placeArtAuctionBid: ArtAuctionType;
  placeArtNftOnSale: ArtNftType;
  recordEasyshareTransaction: RecordEasyShareTransactionStatusType;
  refreshAssets: Scalars['Boolean']['output'];
  refreshToken: AuthTokenType;
  registerStaff: StaffType;
  removeSoundsFromAlbum: AlbumType;
  saveAurallyCreative: AurallyCreativeType;
  setAurallyWalletTransactionPin: Scalars['Boolean']['output'];
  signIn: AuthTokenType;
  signOut: Scalars['Boolean']['output'];
  staffSignIn: AuthTokenType;
  updateEasyshareTransaction: EasyShareTransactionType;
  updateSoundApprovedStatus: SoundNftType;
  updateStaffRole: StaffType;
  updateVideoApprovedStatus: StaffVideoApprovalType;
  uploadFileToIpfs: Scalars['String']['output'];
  verifyWalletMnemonicPhrase: Scalars['Boolean']['output'];
};


export type MutationAddSoundToPlaylistArgs = {
  playlistId: Scalars['Int']['input'];
  soundNftAssetKey: Scalars['String']['input'];
};


export type MutationAddSoundsToAlbumArgs = {
  albumId: Scalars['Int']['input'];
  assetKeys: Array<Scalars['String']['input']>;
};


export type MutationBulkCreatePendingAppPaymentArgs = {
  input: Array<PendingAppPaymentInput>;
};


export type MutationBulkSyncAssetsWithContractArgs = {
  input: Array<AssetIdUpdateInput>;
};


export type MutationClaimCreatedArtArgs = {
  assetKey: Scalars['String']['input'];
};


export type MutationCompleteArtAuctionArgs = {
  auctionKey: Scalars['String']['input'];
};


export type MutationConfirmAndFundCreatedWalletArgs = {
  address: Scalars['String']['input'];
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


export type MutationCreateVideoNftArgs = {
  input: VideoNftInput;
};


export type MutationCreateVirtualAccountArgs = {
  input: VirtualAccountInput;
};


export type MutationCreateWalletArgs = {
  fingerprint?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDecryptTransactionPrivateKeyArgs = {
  input: SignAlgorandTransactionInput;
};


export type MutationDeleteArtNftArgs = {
  assetId: Scalars['Int']['input'];
};


export type MutationLikeAndUnlikeNftArgs = {
  assetKey: Scalars['String']['input'];
  nftType?: NftType;
};


export type MutationNewCommentArgs = {
  input: CommentInput;
};


export type MutationNewNftPurchaseArgs = {
  input: NftTxnInput;
};


export type MutationPlaceArtAuctionBidArgs = {
  input: PlaceArtAuctionBidInput;
};


export type MutationPlaceArtNftOnSaleArgs = {
  args: PlaceArtOnSaleInput;
};


export type MutationRecordEasyshareTransactionArgs = {
  input: EasyShareTransactionInput;
};


export type MutationRefreshAssetsArgs = {
  address: Scalars['String']['input'];
  net: NetworkTypeEnum;
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


export type MutationSetAurallyWalletTransactionPinArgs = {
  input: AurallyWalletTransactionPinInput;
};


export type MutationSignInArgs = {
  input: AuthInput;
};


export type MutationStaffSignInArgs = {
  input: EmailPasswordLoginInput;
};


export type MutationUpdateEasyshareTransactionArgs = {
  input: EasyShareTransactionSatusInput;
};


export type MutationUpdateSoundApprovedStatusArgs = {
  approved: Scalars['Boolean']['input'];
  assetKey: Scalars['String']['input'];
};


export type MutationUpdateStaffRoleArgs = {
  input: UpdateStaffRoleInput;
};


export type MutationUpdateVideoApprovedStatusArgs = {
  approved: Scalars['Boolean']['input'];
  assetId: Scalars['String']['input'];
};


export type MutationUploadFileToIpfsArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationVerifyWalletMnemonicPhraseArgs = {
  mnemonicPhrase: Scalars['String']['input'];
};

export type NftStatisticsType = {
  __typename?: 'NFTStatisticsType';
  assetId: Scalars['String']['output'];
  likesCount: Scalars['Int']['output'];
  streamCount?: Maybe<Scalars['Int']['output']>;
  viewsCount?: Maybe<Scalars['Int']['output']>;
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
  asset: ArtNftTypeSoundNftTypeVideoNftType;
  assetId: Scalars['String']['output'];
  buyer: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  nftType: NftType;
  seller: AurallyCreativeType;
  txnId: Scalars['String']['output'];
};

export enum NftType {
  Art = 'ART',
  Sound = 'SOUND',
  Video = 'VIDEO'
}

export enum NetworkTypeEnum {
  Betanet = 'BETANET',
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET'
}

export type PendingAppPaymentInput = {
  amount: Scalars['Int']['input'];
  assetId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};

export type PendingAppPaymentType = {
  __typename?: 'PendingAppPaymentType';
  amount: Scalars['Int']['output'];
  assetId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  user: AurallyCreativeType;
};

export type PlaceArtAuctionBidInput = {
  auctionKey: Scalars['String']['input'];
  highestBid: Scalars['BigFloat']['input'];
  highestBidder: Scalars['String']['input'];
};

export type PlaceArtOnSaleInput = {
  assetKey: Scalars['String']['input'];
  salePrice: Scalars['BigFloat']['input'];
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
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  soundNfts: Array<SoundNftType>;
};


export type PlaylistTypeSoundNftsArgs = {
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};

export type Query = {
  __typename?: 'Query';
  adminNftStatistics: AdminNftStatisticsType;
  album: AlbumType;
  albums: Array<AlbumType>;
  allNfts: Array<ArtNftTypeSoundNftTypeVideoNftType>;
  /** Get Aurally statistics information */
  appStatistics: ApplicationStatisticsType;
  artAuctions: Array<ArtAuctionType>;
  artNft?: Maybe<ArtNftType>;
  artNfts: Array<ArtNftType>;
  currentContractVersion: Scalars['Int']['output'];
  easyshareTransactions: Array<EasyShareTransactionType>;
  /** Get metadata (minimal info data) for a creative, sound, playlist or album */
  getMetadata: AurallyCreativeTypeSoundNftTypePlaylistTypeAlbumType;
  hasUnsyncedSounds: Scalars['Boolean']['output'];
  hasUserLikedNft: Scalars['Boolean']['output'];
  nftStatistics?: Maybe<NftStatisticsType>;
  openArtAuction?: Maybe<ArtAuctionType>;
  /** Get revenue data points over a time period */
  revenueOverTime: Array<RevenueDataPoint>;
  soundNft?: Maybe<SoundNftType>;
  soundNfts: Array<SoundNftType>;
  trendingSounds: Array<SoundNftType>;
  unsyncedSounds: Array<SoundNftType>;
  version: Scalars['String']['output'];
  videoNft?: Maybe<VideoNftType>;
  videoNfts: Array<VideoNftType>;
};


export type QueryAdminNftStatisticsArgs = {
  assetKey: Scalars['String']['input'];
  nftType?: NftType;
};


export type QueryAlbumArgs = {
  albumId: Scalars['Int']['input'];
};


export type QueryAlbumsArgs = {
  opts?: InputMaybe<AlbumOrderingAlbumFilterListData>;
};


export type QueryAllNftsArgs = {
  opts: AllNftInput;
};


export type QueryArtAuctionsArgs = {
  opts?: InputMaybe<ArtAuctionOrderingArtAuctionFilterListData>;
};


export type QueryArtNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QueryArtNftsArgs = {
  opts?: InputMaybe<ArtNftOrderingArtNftFilterListData>;
};


export type QueryEasyshareTransactionsArgs = {
  opts?: InputMaybe<EasyshareTransactionOrderingEasyshareTransactionFilterListData>;
};


export type QueryGetMetadataArgs = {
  args: MetadataArgs;
  choices: MetadataChoices;
};


export type QueryHasUserLikedNftArgs = {
  assetKey: Scalars['String']['input'];
  nftType?: NftType;
};


export type QueryNftStatisticsArgs = {
  assetKey: Scalars['String']['input'];
  nftType?: StatisticsItem;
};


export type QueryOpenArtAuctionArgs = {
  artAssetKey: Scalars['String']['input'];
};


export type QueryRevenueOverTimeArgs = {
  days: Scalars['Int']['input'];
};


export type QuerySoundNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QuerySoundNftsArgs = {
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};


export type QueryTrendingSoundsArgs = {
  milliseconds?: InputMaybe<Scalars['String']['input']>;
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};


export type QueryUnsyncedSoundsArgs = {
  opts?: InputMaybe<SoundNftOrderingSoundNftFilterListData>;
};


export type QueryVideoNftArgs = {
  assetKey: Scalars['String']['input'];
};


export type QueryVideoNftsArgs = {
  opts?: InputMaybe<VideoNftOrderingVideoNftFilterListData>;
};

export type RecordEasyShareTransactionStatusType = {
  __typename?: 'RecordEasyShareTransactionStatusType';
  data: EasyShareTransactionType;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RegisterStaffInput = {
  email: Scalars['String']['input'];
  password1: Scalars['String']['input'];
  password2: Scalars['String']['input'];
};

export type RevenueDataPoint = {
  __typename?: 'RevenueDataPoint';
  amount: Scalars['Float']['output'];
  date: Scalars['Date']['output'];
};

export type SignAlgorandTransactionInput = {
  address: Scalars['String']['input'];
  ciphertext: Scalars['String']['input'];
  pin: Scalars['String']['input'];
};

export type SoundNftFilter = {
  afterPeriod?: InputMaybe<Scalars['DateTime']['input']>;
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  artist?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  minSupply?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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
  duration?: InputMaybe<Scalars['Float']['input']>;
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  fullTrackFile: Scalars['Upload']['input'];
  genre: Scalars['String']['input'];
  label: Scalars['String']['input'];
  metadataHash: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  releaseDate: Scalars['DateTime']['input'];
  supply: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type SoundNftOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  likeCount?: InputMaybe<Scalars['Boolean']['input']>;
  likeCountDesc?: InputMaybe<Scalars['Boolean']['input']>;
  streamCount?: InputMaybe<Scalars['Boolean']['input']>;
  streamCountDesc?: InputMaybe<Scalars['Boolean']['input']>;
  supply?: InputMaybe<Scalars['Boolean']['input']>;
  supplyDesc?: InputMaybe<Scalars['Boolean']['input']>;
  trending?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SoundNftOrderingSoundNftFilterListData = {
  filter?: InputMaybe<SoundNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<SoundNftOrdering>;
};

export type SoundNftType = {
  __typename?: 'SoundNFTType';
  approved: Scalars['Boolean']['output'];
  artist: Scalars['String']['output'];
  assetId: Scalars['String']['output'];
  assetKey: Scalars['String']['output'];
  audioUrl: Scalars['String']['output'];
  claimed: Scalars['Boolean']['output'];
  coverImageUrl: Scalars['String']['output'];
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  forSale: Scalars['Boolean']['output'];
  genre: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  label: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  likeCount: Scalars['Int']['output'];
  liked: Scalars['Boolean']['output'];
  metadataHash?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  purchased: Scalars['Boolean']['output'];
  releaseDate: Scalars['DateTime']['output'];
  streamCount: Scalars['Int']['output'];
  supply: Scalars['String']['output'];
  syncedWithContract?: Maybe<Scalars['Boolean']['output']>;
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

export type StaffVideoApprovalType = {
  __typename?: 'StaffVideoApprovalType';
  approved: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  taskId?: Maybe<Scalars['String']['output']>;
};

export enum StatisticsItem {
  Sound = 'SOUND',
  Video = 'VIDEO'
}

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

export type VideoNftFilter = {
  afterPeriod?: InputMaybe<Scalars['DateTime']['input']>;
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  likeCount?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  releaseDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trailerViewsCount?: InputMaybe<Scalars['Int']['input']>;
  videoType?: InputMaybe<Scalars['String']['input']>;
  viewsCount?: InputMaybe<Scalars['Int']['input']>;
};

export type VideoNftInput = {
  assetId: Scalars['String']['input'];
  assetKey: Scalars['String']['input'];
  categories?: InputMaybe<Scalars['String']['input']>;
  claimed?: Scalars['Boolean']['input'];
  coverImageUrl: Scalars['String']['input'];
  creator: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  forSale?: InputMaybe<Scalars['Boolean']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  metadataHash: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  releaseDate: Scalars['DateTime']['input'];
  supply: Scalars['String']['input'];
  title: Scalars['String']['input'];
  trailerFile?: InputMaybe<Scalars['Upload']['input']>;
  videoFile: Scalars['Upload']['input'];
  videoType: Scalars['String']['input'];
};

export type VideoNftOrdering = {
  likes?: InputMaybe<Scalars['Boolean']['input']>;
  likesDesc?: InputMaybe<Scalars['Boolean']['input']>;
  supply?: InputMaybe<Scalars['Boolean']['input']>;
  supplyDesc?: InputMaybe<Scalars['Boolean']['input']>;
  trailerViewsCount?: InputMaybe<Scalars['Boolean']['input']>;
  trailerViewsCountDesc?: InputMaybe<Scalars['Boolean']['input']>;
  trending?: InputMaybe<Scalars['Boolean']['input']>;
  viewsCount?: InputMaybe<Scalars['Boolean']['input']>;
  viewsCountDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoNftOrderingVideoNftFilterListData = {
  filter?: InputMaybe<VideoNftFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<VideoNftOrdering>;
};

export type VideoNftType = {
  __typename?: 'VideoNFTType';
  approved: Scalars['Boolean']['output'];
  assetId: Scalars['String']['output'];
  assetKey: Scalars['String']['output'];
  categories: Array<Scalars['String']['output']>;
  claimed: Scalars['Boolean']['output'];
  coverImageUrl: Scalars['String']['output'];
  creator: AurallyCreativeType;
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  forSale: Scalars['Boolean']['output'];
  genre?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastUpdated: Scalars['DateTime']['output'];
  likeCount: Scalars['Int']['output'];
  metadataHash?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  purchased: Scalars['Boolean']['output'];
  syncedWithContract?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  trailerViewsCount: Scalars['Int']['output'];
  videoType: Scalars['String']['output'];
  videoUrl: Scalars['String']['output'];
  viewsCount: Scalars['Int']['output'];
};


export type VideoNftTypeVideoUrlArgs = {
  fullTrack?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VirtualAccountInput = {
  amount: Scalars['Float']['input'];
  amountControl?: AmountControl;
  callbackUrl?: Scalars['String']['input'];
  /** Valid for in minutes */
  validFor: Scalars['Int']['input'];
};

export type VirtualAccountType = {
  __typename?: 'VirtualAccountType';
  accountName: Scalars['String']['output'];
  accountNumber: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  amountControl: Scalars['String']['output'];
  bankCode: Scalars['String']['output'];
  callbackUrl: Scalars['String']['output'];
  client: Scalars['String']['output'];
  currencyCode: Scalars['String']['output'];
  expiryDate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
  validFor: Scalars['String']['output'];
};

export type GetNftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNftsQuery = { __typename?: 'Query', soundNfts: Array<{ __typename?: 'SoundNFTType', id?: number | null, artist: string, assetId: string, assetKey: string, coverImageUrl: string, dateAdded: any, price: number, title: string, creator: { __typename?: 'AurallyCreativeType', id?: number | null, address: string, username?: string | null, imageUrl?: string | null } }> };

export type AppStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppStatisticsQuery = { __typename?: 'Query', appStatistics: { __typename?: 'ApplicationStatisticsType', totalArtNfts: number, totalPurchases: number, totalRegisteredUsers: number, totalSoundNfts: number, totalCreators: number, totalRevenue: number, newUsersToday: number } };

export type RevenueOverTimeQueryVariables = Exact<{
  days: Scalars['Int']['input'];
}>;


export type RevenueOverTimeQuery = { __typename?: 'Query', revenueOverTime: Array<{ __typename?: 'RevenueDataPoint', date: any, amount: number }> };


export const GetNftsDocument = gql`
    query GetNfts {
  soundNfts(opts: {limit: 20, offset: 0, filter: {approved: true}}) {
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
export function useGetNftsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNftsQuery, GetNftsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNftsQuery, GetNftsQueryVariables>(GetNftsDocument, options);
        }
export type GetNftsQueryHookResult = ReturnType<typeof useGetNftsQuery>;
export type GetNftsLazyQueryHookResult = ReturnType<typeof useGetNftsLazyQuery>;
export type GetNftsSuspenseQueryHookResult = ReturnType<typeof useGetNftsSuspenseQuery>;
export type GetNftsQueryResult = Apollo.QueryResult<GetNftsQuery, GetNftsQueryVariables>;
export const AppStatisticsDocument = gql`
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

/**
 * __useAppStatisticsQuery__
 *
 * To run a query within a React component, call `useAppStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<AppStatisticsQuery, AppStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppStatisticsQuery, AppStatisticsQueryVariables>(AppStatisticsDocument, options);
      }
export function useAppStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppStatisticsQuery, AppStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppStatisticsQuery, AppStatisticsQueryVariables>(AppStatisticsDocument, options);
        }
export function useAppStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AppStatisticsQuery, AppStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppStatisticsQuery, AppStatisticsQueryVariables>(AppStatisticsDocument, options);
        }
export type AppStatisticsQueryHookResult = ReturnType<typeof useAppStatisticsQuery>;
export type AppStatisticsLazyQueryHookResult = ReturnType<typeof useAppStatisticsLazyQuery>;
export type AppStatisticsSuspenseQueryHookResult = ReturnType<typeof useAppStatisticsSuspenseQuery>;
export type AppStatisticsQueryResult = Apollo.QueryResult<AppStatisticsQuery, AppStatisticsQueryVariables>;
export const RevenueOverTimeDocument = gql`
    query RevenueOverTime($days: Int!) {
  revenueOverTime(days: $days) {
    date
    amount
  }
}
    `;

/**
 * __useRevenueOverTimeQuery__
 *
 * To run a query within a React component, call `useRevenueOverTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevenueOverTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevenueOverTimeQuery({
 *   variables: {
 *      days: // value for 'days'
 *   },
 * });
 */
export function useRevenueOverTimeQuery(baseOptions: Apollo.QueryHookOptions<RevenueOverTimeQuery, RevenueOverTimeQueryVariables> & ({ variables: RevenueOverTimeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>(RevenueOverTimeDocument, options);
      }
export function useRevenueOverTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>(RevenueOverTimeDocument, options);
        }
export function useRevenueOverTimeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>(RevenueOverTimeDocument, options);
        }
export type RevenueOverTimeQueryHookResult = ReturnType<typeof useRevenueOverTimeQuery>;
export type RevenueOverTimeLazyQueryHookResult = ReturnType<typeof useRevenueOverTimeLazyQuery>;
export type RevenueOverTimeSuspenseQueryHookResult = ReturnType<typeof useRevenueOverTimeSuspenseQuery>;
export type RevenueOverTimeQueryResult = Apollo.QueryResult<RevenueOverTimeQuery, RevenueOverTimeQueryVariables>;