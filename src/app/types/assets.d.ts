type SoundCardType = {
  __typename?: "SoundNFTType" | undefined;
  title: string;
  price: number;
  coverImageUrl: string;
  assetId: string;
  assetKey: string;
  creator: {
    __typename?: "AurallyCreativeType" | undefined;
    username?: string | null;
    imageUrl?: string | null;
  };
};
