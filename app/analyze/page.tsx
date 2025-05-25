"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowRight, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnalysisResults } from "@/components/analysis-results"

export default function AnalyzePage() {
  const searchParams = useSearchParams()
  const urlParam = searchParams.get("url")

  const [url, setUrl] = useState(urlParam || "")
  const [isValid, setIsValid] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  useEffect(() => {
    if (urlParam) {
      setUrl(urlParam)
      validateUrl(urlParam)
    }
  }, [urlParam])

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input)
      const isValid = urlObj.protocol === "http:" || urlObj.protocol === "https:"
      setIsValid(isValid)
      return isValid
    } catch {
      setIsValid(false)
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUrl(input)
    validateUrl(input)
    setError("")
  }

  const handleAnalyze = async () => {
    if (!isValid) {
      setError("Please enter a valid URL")
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setError("")

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setIsAnalyzing(false)
      setIsComplete(true)
    }, 4000)
  }

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Analyze Your Website</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your website URL below to get a comprehensive accessibility analysis and improvement suggestions.
            </p>
          </div>

          <div className="bg-background rounded-xl border p-6 md:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  value={url}
                  onChange={handleUrlChange}
                  className="pr-10 h-12 text-base"
                  disabled={isAnalyzing}
                />
                {url && (
                  <div
                    className={cn(
                      "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors",
                      isValid ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive",
                    )}
                  >
                    {isValid ? <span className="text-xs">✓</span> : <span className="text-xs">!</span>}
                  </div>
                )}
              </div>

              <Button size="lg" onClick={handleAnalyze} disabled={!isValid || isAnalyzing} className="md:w-auto">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Now <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing website...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-primary h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {progress < 30 && "Scanning HTML structure..."}
                  {progress >= 30 && progress < 60 && "Analyzing accessibility issues..."}
                  {progress >= 60 && progress < 90 && "Generating suggestions..."}
                  {progress >= 90 && "Finalizing report..."}
                </div>
              </div>
            )}
          </div>

          {isComplete && <AnalysisResults url={url} />}
        </div>
      </section>

      <Footer />
    </main>
  )
}
