import { UrlAnalyzer } from "@/components/url-analyzer"

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Website Accessibility Analysis</h1>

        <UrlAnalyzer />
      </div>
    </main>
  )
}
