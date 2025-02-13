export interface BlogPost {
  img: string;
  title: string;
  desc: string;
  link: string;
}

const BLOG_POSTS: BlogPost[] = [
 
  {
    img: "/images/join_and_earn.webp",
    title: "How to make your style standout",
    desc:
      "All you need to know about Aurally’s native token – Aura Are you ready to embark on a journey where music meets innovation, and creativity knows no bounds? Welcome to Aurally, the next frontier in the creator-",
    link: "https://aurally.medium.com/join-early-earn-big-d9fdaf7ffa93",
  },
  {
    img: "/images/we_are_live.webp",
    title:
      "Aurally: The No. 1 NFT Marketplace for Creatives and Fans is Now Live!",
    desc:
      "We are thrilled to announce that Aurally, the pioneering force at the forefront of music streaming, is now live! Step into the future of music with us and experience the ultimate convergence of music and Web3 brilliance.",
    link:
      "https://aurally.medium.com/aurally-the-no-1-nft-marketplace-for-creatives-and-fans-is-now-live-fc0a51e79534",
  },
];

export default BLOG_POSTS;
