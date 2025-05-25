import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { PageLoader } from "@/components/page-loader"
import { ProgressIndicator } from "@/components/progress-indicator"
import { CustomCursor } from "@/components/custom-cursor"
import { WebGLBackground } from "@/components/webgl-background"
import { FloatingElements } from "@/components/floating-elements"
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-gradient-to-b from-gray-950 to-black font-sans antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden",
          inter.variable,
          manrope.variable,
        )}
      >
        <PageLoader />
        <ProgressIndicator />
        <CustomCursor />
        <WebGLBackground intensity={0.3} speed={0.8} colorScheme="blue" className="opacity-15" />
        <FloatingElements />
        {children}
      </body>
    </html>
  )
}
