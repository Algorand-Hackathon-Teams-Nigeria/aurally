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
    "The Largest NFTs Marketplace. Automatic and truly unique digital creation. Signed and issued by the creator, made possible by Algorand blockchain technology",
  image: [
    {
      url: "https://aurally.xyz/aurally-image.jpeg",
      width: 1000,
      height: 1000,
    },
  ],
};

export const metadata: Metadata = {
  title: "Aurally",
  description: details.description,
  icons: ["https://aurally.xyz/logo.svg"],
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
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  } as const,
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
