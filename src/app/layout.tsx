import "./styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { resolver, theme } from "@/app/theme";

const space = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Aurally",
  description:
    "The Largest NFTs Marketplace. Automatic and truly unique digital creation. Signed and issued by the creator, made possible by Algorand blockchain technology",
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
      <body className={`${space.variable} font-space`}>
        <MantineProvider
          forceColorScheme="dark"
          theme={theme}
          cssVariablesResolver={resolver}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
