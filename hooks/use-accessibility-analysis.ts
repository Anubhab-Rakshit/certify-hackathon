"use client"

import { useState } from "react"

interface AccessibilityIssueElement {
  selector: string
  html: string
  suggestion: string
}

interface AccessibilityIssue {
  id: string
  type: "critical" | "serious" | "moderate" | "minor"
  title: string
  description: string
  elements: AccessibilityIssueElement[]
  wcagCriteria: string
  impact: string
}

interface AccessibilityAnalysisResult {
  score: number
  issuesCount: {
    critical: number
    serious: number
    moderate: number
    minor: number
  }
  categories: {
    perceivable: number
    operable: number
    understandable: number
    robust: number
  }
  issues: AccessibilityIssue[]
}

export function useAccessibilityAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<AccessibilityAnalysisResult | null>(null)
  const [progress, setProgress] = useState(0)

  const analyzeWebsite = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setProgress(0)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 5
      })
    }, 200)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze website")
      }

      const data = await response.json()
      clearInterval(progressInterval)
      setProgress(100)
      setResults(data)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    analyzeWebsite,
    isLoading,
    error,
    results,
    progress,
  }
}
