import type React from "react"
import "@/app/styles/admin-dashboard.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aurally Dashboard",
  description: "Music platform dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="relative overflow-hidden font-space bg-dark01">
          
          <div className="min-h-screen">
            {children}
          </div>
          
        </div>
      );
}