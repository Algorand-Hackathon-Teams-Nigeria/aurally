/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.aurally.xyz",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "yellow-calm-mink-490.mypinata.cloud",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "aurally-images.s3.eu-west-3.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/fans',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;