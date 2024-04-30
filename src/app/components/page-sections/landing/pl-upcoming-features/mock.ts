export interface Feature {
  title: string;
  img: string;
  desc: string;
  link: string;
}

export const UPCOMING_FEATURES: readonly Feature[] = [
  {
    title: "Fractional NFTs",
    desc:
      "Creators can tokenize their project(art, music or videos) allowing fans purchase fractions of it and earn royalties from the project sales.",
    img: "/images/fractional_nfts.svg",
    link: "#",
  },
  {
    title: "P2P Integration",
    img: "/images/p2p.svg",
    desc:
      "Seamlessly top up your Algo balance with our Peer-to-Peer feature.",
    link: "#",
  },
  {
    title: "Video Streaming",
    img: "/images/video_streaming.svg",
    desc:
      "Stream high quality videos for top and fast rising creators across diverse genres.",
    link: "#",
  },
] as const;
