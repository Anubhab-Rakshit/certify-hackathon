import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { PageLoader } from "@/components/page-loader"
import { ProgressIndicator } from "@/components/progress-indicator"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "AccessiScan | AI-Powered Web Accessibility That Actually Works",
  description: "Scan, analyze, and fix accessibility issues in seconds. Trusted by Fortune 500 companies.",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased selection:bg-blue-600 selection:text-white",
          inter.variable,
          manrope.variable,
        )}
      >
        <PageLoader />
        <ProgressIndicator />
        {children}
      </body>
    </html>
  )
}
