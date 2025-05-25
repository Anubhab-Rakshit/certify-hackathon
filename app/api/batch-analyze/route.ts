import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function POST(request: NextRequest) {
  try {
    const { urls, options = {} } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required" }, { status: 400 })
    }

    // Limit batch size to prevent timeout
    const maxBatchSize = 5
    if (urls.length > maxBatchSize) {
      return NextResponse.json({ error: `Maximum ${maxBatchSize} URLs allowed per batch` }, { status: 400 })
    }

    const results = []

    // Process URLs in parallel
    const promises = urls.map(async (url: string) => {
      try {
        // Reuse the analyze logic from main route
        const response = await fetch(`${request.nextUrl.origin}/api/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, options }),
        })

        const data = await response.json()
        return { url, success: true, data }
      } catch (error: any) {
        return {
          url,
          success: false,
          error: error.message || "Analysis failed",
        }
      }
    })

    const batchResults = await Promise.all(promises)

    // Generate comparative analysis
    const successfulResults = batchResults.filter((r) => r.success)
    let comparativeAnalysis = null

    if (successfulResults.length > 1) {
      comparativeAnalysis = await generateComparativeAnalysis(successfulResults)
    }

    return NextResponse.json({
      success: true,
      totalUrls: urls.length,
      successfulAnalyses: successfulResults.length,
      failedAnalyses: batchResults.filter((r) => !r.success).length,
      results: batchResults,
      comparativeAnalysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Batch analysis error:", error)
    return NextResponse.json({ error: "Failed to perform batch analysis", details: error.message }, { status: 500 })
  }
}

async function generateComparativeAnalysis(results: any[]) {
  const prompt = `
Compare the accessibility analysis results for these websites and provide insights:

${JSON.stringify(
  results.map((r) => ({
    url: r.url,
    score: r.data.analysis.score,
    issues: r.data.analysis.issuesCount,
  })),
  null,
  2,
)}

Provide comparative analysis in JSON format:
{
  "bestPerforming": {
    "url": "<url>",
    "score": <score>,
    "strengths": ["<strength1>", "<strength2>"]
  },
  "worstPerforming": {
    "url": "<url>",
    "score": <score>,
    "improvements": ["<improvement1>", "<improvement2>"]
  },
  "commonIssues": [
    {
      "issue": "<common issue>",
      "affectedSites": <count>,
      "severity": "<critical|serious|moderate|minor>"
    }
  ],
  "recommendations": {
    "forAll": ["<recommendation1>", "<recommendation2>"],
    "specific": [
      {
        "url": "<url>",
        "priority": "<recommendation>"
      }
    ]
  },
  "industryBenchmark": {
    "averageScore": <average>,
    "medianScore": <median>,
    "insights": "<insights about the group performance>"
  }
}
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return null
  } catch (error) {
    console.error("Comparative analysis error:", error)
    return null
  }
}
