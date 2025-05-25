import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function POST(request: NextRequest) {
  try {
    const { issue, currentCode, framework = "html" } = await request.json()

    if (!issue || !currentCode) {
      return NextResponse.json({ error: "Issue and current code are required" }, { status: 400 })
    }

    const prompt = `
You are an expert accessibility developer. Generate accessible code to fix the following issue:

Issue: ${issue.title}
Description: ${issue.description}
WCAG Criteria: ${issue.wcagCriteria}
Current Code: ${currentCode}
Framework: ${framework}

Generate the fixed code with:
1. Complete accessibility compliance
2. Best practices implementation
3. Comments explaining the changes
4. Multiple solutions if applicable

Return in JSON format:
{
  "primarySolution": {
    "code": "<fixed code>",
    "explanation": "<what was changed and why>",
    "additionalNotes": "<any important notes>"
  },
  "alternativeSolutions": [
    {
      "code": "<alternative fix>",
      "explanation": "<when to use this approach>",
      "pros": ["<advantage1>", "<advantage2>"],
      "cons": ["<disadvantage1>", "<disadvantage2>"]
    }
  ],
  "bestPractices": ["<practice1>", "<practice2>"],
  "testingGuidance": {
    "manual": ["<test1>", "<test2>"],
    "automated": ["<tool1>", "<tool2>"],
    "screenReaders": ["<NVDA test>", "<JAWS test>", "<VoiceOver test>"]
  },
  "relatedResources": [
    {
      "title": "<resource title>",
      "url": "<resource URL>",
      "type": "documentation|tutorial|tool"
    }
  ]
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const codeFixData = JSON.parse(jsonMatch[0])

      return NextResponse.json({
        success: true,
        issue: issue.title,
        framework,
        solutions: codeFixData,
        timestamp: new Date().toISOString(),
      })
    }

    throw new Error("Failed to generate code fix")
  } catch (error: any) {
    console.error("Code generation error:", error)
    return NextResponse.json({ error: "Failed to generate code fix", details: error.message }, { status: 500 })
  }
}
