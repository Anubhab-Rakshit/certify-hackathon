import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

export async function POST(request: NextRequest) {
  let browser = null

  try {
    const { url, options = {} } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Launch headless browser
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })

    const page = await browser.newPage()

    // Set viewport
    await page.setViewport({
      width: options.width || 1920,
      height: options.height || 1080,
      deviceScaleFactor: options.deviceScaleFactor || 1,
    })

    // Navigate to URL
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    })

    // Take screenshots with different accessibility states
    const screenshots = {
      normal: await page.screenshot({
        encoding: "base64",
        fullPage: options.fullPage || false,
      }),
    }

    // Simulate color blindness
    if (options.includeColorBlindness) {
      await page.emulateVisionDeficiency("protanopia")
      screenshots.protanopia = await page.screenshot({ encoding: "base64" })

      await page.emulateVisionDeficiency("deuteranopia")
      screenshots.deuteranopia = await page.screenshot({ encoding: "base64" })

      await page.emulateVisionDeficiency("tritanopia")
      screenshots.tritanopia = await page.screenshot({ encoding: "base64" })
    }

    // Get accessibility tree
    const accessibilityTree = await page.accessibility.snapshot()

    await browser.close()

    return NextResponse.json({
      success: true,
      url,
      screenshots,
      accessibilityTree,
      metadata: {
        timestamp: new Date().toISOString(),
        viewport: {
          width: options.width || 1920,
          height: options.height || 1080,
        },
      },
    })
  } catch (error: any) {
    if (browser) await browser.close()

    console.error("Screenshot error:", error)
    return NextResponse.json({ error: "Failed to capture screenshot", details: error.message }, { status: 500 })
  }
}
