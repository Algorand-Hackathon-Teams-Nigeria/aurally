
type SoundType = {
  type: "sound";
  data: {
    assetId: number;
    assetKey: string;
    title: string;
    artist: string;
    price: number;
    coverImageIpfs: string;
    creatorAddress: string;
  };
};

type ArtType = {
  type: "art";
  data: {
    assetId: number;
    assetKey: string;
    title: string;
    ipfsLocation: string;
    price: number;
    creatorAddress: string;
  };
};
