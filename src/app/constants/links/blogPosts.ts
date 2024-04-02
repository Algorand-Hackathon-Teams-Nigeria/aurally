export interface BlogPost {
  img: string;
  title: string;
  desc: string;
  link: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    img:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*_UqWoztB6_I4AUQlqA6hFw@2x.jpeg",
    title:
      "Aurally: The No. 1 NFT Marketplace for Creatives and Fans is Now Live!",
    desc:
      "We are thrilled to announce that Aurally, the pioneering force at the forefront of music streaming, is now live! Step into the future of music with us and experience the ultimate convergence of music and Web3 brilliance.",
    link:
      "https://aurally.medium.com/aurally-the-no-1-nft-marketplace-for-creatives-and-fans-is-now-live-fc0a51e79534",
  },
  {
    img:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*1AnCMaxD0_svFtaxoGqTUA@2x.jpeg",
    title: "All you need to know about Aurally’s native token – Aura",
    desc:
      "Are you ready to embark on a journey where music meets innovation, and creativity knows no bounds? Welcome to Aurally, the next frontier in the creator-verse where every beat and every melody sings of endless potential. At the heart of this revolution lies the Aura token – the key to unlocking a world of rewards, opportunities, and boundless imagination.",
    link: "https://aurally.medium.com/join-early-earn-big-d9fdaf7ffa93",
  },
];

export default BLOG_POSTS;
