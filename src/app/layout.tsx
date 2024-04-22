import "./styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { resolver, theme } from "@/app/theme";
import { ApolloWrapper } from "./provider/ApolloWrapper";
import { AtomProvider } from "./provider/AtomProvider";

const space = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const details = {
  description:
    "Stream and buy music. Buy NFTs art using crypto and fiat currency. Built on the algorand blockchain. Web3 music streaming platform. Discover new artists, stream your favorite songs and earn instant rewards. Buy NFTs",
  image: [
    {
      url: "/aurally-image.jpeg",
      width: 1000,
      height: 1000,
    },
  ],
};

export const metadata: Metadata = {
  title: "The Best NFT and Music Streaming platform",
  description: details.description,
  icons: ["/icon.svg"],
  metadataBase: new URL("https://aurally.xyz"),
  openGraph: {
    title: "Aurally",
    description: details.description,
    images: details.image,
    siteName: "Aurally",
    url: "https://aurally.xyz",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    title: "Aurally",
    card: "summary_large_image",
    description: details.description,
    images: details.image,
  },
  keywords: [
    "NFT",
    "nft",
    "Algorand",
    "Marketplace",
    "Aurally",
    "aurally",
    "art",
    "song",
    "sounds",
    "audio",
    "Music",
    "Videos",
  ] as string[],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body className={`${space.variable} ${roboto.variable} font-space`}>
        <ApolloWrapper>
          <AtomProvider>
            <MantineProvider
              forceColorScheme="dark"
              theme={theme}
              cssVariablesResolver={resolver}
            >
              {children}
            </MantineProvider>
          </AtomProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
