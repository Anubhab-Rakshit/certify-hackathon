import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// In production, this would use a database
const monitoringData = new Map()

export async function POST(request: NextRequest) {
  try {
    const { action, url, schedule, webhookUrl } = await request.json()

    switch (action) {
      case "start":
        if (!url || !schedule) {
          return NextResponse.json({ error: "URL and schedule are required" }, { status: 400 })
        }

        // Start monitoring
        const monitorId = `monitor_${Date.now()}`
        monitoringData.set(monitorId, {
          url,
          schedule,
          webhookUrl,
          status: "active",
          lastCheck: null,
          history: [],
          created: new Date().toISOString(),
        })

        return NextResponse.json({
          success: true,
          monitorId,
          message: "Monitoring started successfully",
        })

      case "stop":
        const { monitorId: stopId } = await request.json()
        if (!stopId || !monitoringData.has(stopId)) {
          return NextResponse.json({ error: "Invalid monitor ID" }, { status: 400 })
        }

        monitoringData.delete(stopId)
        return NextResponse.json({
          success: true,
          message: "Monitoring stopped successfully",
        })

      case "status":
        const { monitorId: statusId } = await request.json()
        if (!statusId || !monitoringData.has(statusId)) {
          return NextResponse.json({ error: "Invalid monitor ID" }, { status: 400 })
        }

        const monitorStatus = monitoringData.get(statusId)
        return NextResponse.json({
          success: true,
          monitor: monitorStatus,
        })

      case "check":
        // Perform immediate check
        const { monitorId: checkId } = await request.json()
        if (!checkId || !monitoringData.has(checkId)) {
          return NextResponse.json({ error: "Invalid monitor ID" }, { status: 400 })
        }

        const monitor = monitoringData.get(checkId)
        const checkResult = await performAccessibilityCheck(monitor.url)

        // Update monitor data
        monitor.lastCheck = new Date().toISOString()
        monitor.history.push({
          timestamp: monitor.lastCheck,
          score: checkResult.score,
          issues: checkResult.issuesCount,
        })

        // Keep only last 30 checks
        if (monitor.history.length > 30) {
          monitor.history = monitor.history.slice(-30)
        }

        monitoringData.set(checkId, monitor)

        // Send webhook if configured
        if (monitor.webhookUrl && checkResult.hasRegressions) {
          await sendWebhook(monitor.webhookUrl, {
            monitorId: checkId,
            url: monitor.url,
            regressions: checkResult.regressions,
            timestamp: monitor.lastCheck,
          })
        }

        return NextResponse.json({
          success: true,
          checkResult,
          monitor,
        })

      default:
        return NextResponse.json({ error: "Invalid action. Use: start, stop, status, or check" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Monitoring error:", error)
    return NextResponse.json({ error: "Monitoring operation failed", details: error.message }, { status: 500 })
  }
}

async function performAccessibilityCheck(url: string) {
  // Reuse analyze endpoint
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })

  const data = await response.json()

  // Check for regressions (simplified)
  const hasRegressions = data.analysis.score < 70
  const regressions = hasRegressions
    ? {
        scoreDropped: true,
        newCriticalIssues: data.analysis.issuesCount.critical > 0,
      }
    : null

  return {
    ...data.analysis,
    hasRegressions,
    regressions,
  }
}

async function sendWebhook(webhookUrl: string, data: any) {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error("Webhook error:", error)
  }
}

export async function GET() {
  // Return all active monitors
  const monitors = Array.from(monitoringData.entries()).map(([id, data]) => ({
    id,
    ...data,
  }))

  return NextResponse.json({
    success: true,
    totalMonitors: monitors.length,
    activeMonitors: monitors.filter((m) => m.status === "active").length,
    monitors,
  })
}
