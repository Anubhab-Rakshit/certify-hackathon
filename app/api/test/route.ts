import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test Gemini API connection
    const testUrl = "https://example.com"

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: testUrl }),
    })

    const result = await response.json()

    return NextResponse.json({
      status: "Backend Test Results",
      timestamp: new Date().toISOString(),
      apiConnection: response.ok ? "✅ Working" : "❌ Failed",
      geminiApiKey: !!process.env.GEMINI_API_KEY ? "✅ Configured" : "❌ Missing",
      testUrl,
      testResult: result,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextjsVersion: "15.2.4",
        geminiModel: "gemini-1.5-flash",
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "Backend Test Failed",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
