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
  title: "Aurally",
  description:
    "The Largest NFTs Marketplace. Automatic and truly unique digital creation. Signed and issued by the creator, made possible by Algorand blockchain technology",
} as const;

export const metadata: Metadata = {
  ...details,
  openGraph: {
    ...details,
    images: ["/aurally-image.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    ...details,
    images: ["/aurally-image.jpeg"],
  },
  keywords: ["NFT", "Algorand", "Marketplace", "Aurally"],
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
