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
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    img: "/images/fractional_nfts.svg",
    link: "#",
  },
  {
    title: "P2P Integration",
    img: "/images/p2p.svg",
    desc:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    link: "#",
  },
  {
    title: "Video Streaming",
    img: "/images/video_streaming.svg",
    desc:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    link: "#",
  },
] as const;
