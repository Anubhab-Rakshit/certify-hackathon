import { UrlAnalyzer } from "@/components/url-analyzer"
import { ClientPageWrapper, ClientBackgroundWrapper } from "@/components/client-page-wrapper"

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative">
        {/* Background with reduced opacity for better text visibility */}
        <ClientBackgroundWrapper />

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                AI-Powered Web
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Accessibility That Works
              </span>
            </h1>

            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 mb-8">
              <p className="text-xl text-white font-medium">
                Scan, analyze, and fix accessibility issues in <span className="text-blue-400 font-bold">seconds</span>
              </p>
              <p className="mt-2 text-white/90">
                Enterprise-grade WCAG compliance powered by advanced AI that understands{" "}
                <span className="text-purple-400 font-bold">context</span>, not just rules.
              </p>
            </div>
          </div>

          <UrlAnalyzer />
        </div>
      </main>

      <ClientPageWrapper />
    </>
  )
}
