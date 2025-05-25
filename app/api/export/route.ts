import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"
import ExcelJS from "exceljs"

export async function POST(request: NextRequest) {
  try {
    const { analysisData, format = "pdf", options = {} } = await request.json()

    if (!analysisData) {
      return NextResponse.json({ error: "Analysis data is required" }, { status: 400 })
    }

    let fileData: any
    let contentType: string
    let filename: string

    switch (format.toLowerCase()) {
      case "pdf":
        fileData = await generatePDF(analysisData, options)
        contentType = "application/pdf"
        filename = `accessibility-report-${Date.now()}.pdf`
        break

      case "excel":
      case "xlsx":
        fileData = await generateExcel(analysisData, options)
        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        filename = `accessibility-report-${Date.now()}.xlsx`
        break

      case "json":
        fileData = JSON.stringify(analysisData, null, 2)
        contentType = "application/json"
        filename = `accessibility-report-${Date.now()}.json`
        break

      case "csv":
        fileData = await generateCSV(analysisData)
        contentType = "text/csv"
        filename = `accessibility-report-${Date.now()}.csv`
        break

      default:
        return NextResponse.json({ error: "Unsupported format. Use: pdf, excel, json, or csv" }, { status: 400 })
    }

    // Return file as base64
    const base64 = Buffer.from(fileData).toString("base64")

    return NextResponse.json({
      success: true,
      format,
      filename,
      contentType,
      data: base64,
      size: fileData.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export report", details: error.message }, { status: 500 })
  }
}

async function generatePDF(data: any, options: any) {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(24)
  doc.text("Accessibility Analysis Report", 20, 20)

  // URL and Date
  doc.setFontSize(12)
  doc.text(`URL: ${data.url}`, 20, 35)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42)

  // Score
  doc.setFontSize(18)
  doc.text(`Overall Score: ${data.analysis.score}/100`, 20, 60)

  // Issues Summary
  doc.setFontSize(14)
  doc.text("Issues Summary:", 20, 80)
  doc.setFontSize(12)
  doc.text(`Critical: ${data.analysis.issuesCount.critical}`, 30, 90)
  doc.text(`Serious: ${data.analysis.issuesCount.serious}`, 30, 97)
  doc.text(`Moderate: ${data.analysis.issuesCount.moderate}`, 30, 104)
  doc.text(`Minor: ${data.analysis.issuesCount.minor}`, 30, 111)

  // Add more pages for detailed issues
  if (data.analysis.issues && data.analysis.issues.length > 0) {
    doc.addPage()
    doc.setFontSize(16)
    doc.text("Detailed Issues", 20, 20)

    let yPosition = 35
    data.analysis.issues.forEach((issue: any, index: number) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(12)
      doc.text(`${index + 1}. ${issue.title}`, 20, yPosition)
      doc.setFontSize(10)
      doc.text(`Type: ${issue.type} | WCAG: ${issue.wcagCriteria}`, 30, yPosition + 7)
      yPosition += 20
    })
  }

  return doc.output("arraybuffer")
}

async function generateExcel(data: any, options: any) {
  const workbook = new ExcelJS.Workbook()

  // Summary Sheet
  const summarySheet = workbook.addWorksheet("Summary")
  summarySheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 20 },
  ]

  summarySheet.addRows([
    { metric: "URL", value: data.url },
    { metric: "Overall Score", value: data.analysis.score },
    { metric: "Critical Issues", value: data.analysis.issuesCount.critical },
    { metric: "Serious Issues", value: data.analysis.issuesCount.serious },
    { metric: "Moderate Issues", value: data.analysis.issuesCount.moderate },
    { metric: "Minor Issues", value: data.analysis.issuesCount.minor },
  ])

  // Issues Sheet
  const issuesSheet = workbook.addWorksheet("Issues")
  issuesSheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Type", key: "type", width: 15 },
    { header: "Title", key: "title", width: 40 },
    { header: "WCAG Criteria", key: "wcagCriteria", width: 20 },
    { header: "Description", key: "description", width: 50 },
    { header: "Impact", key: "impact", width: 40 },
  ]

  if (data.analysis.issues) {
    issuesSheet.addRows(data.analysis.issues)
  }
  // Style the headers
  ;[summarySheet, issuesSheet].forEach((sheet) => {
    sheet.getRow(1).font = { bold: true }
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4472C4" },
    }
  })

  const buffer = await workbook.xlsx.writeBuffer()
  return buffer
}

async function generateCSV(data: any) {
  const issues = data.analysis.issues || []
  const headers = ["ID", "Type", "Title", "WCAG Criteria", "Description", "Impact"]

  const rows = issues.map((issue: any) => [
    issue.id,
    issue.type,
    issue.title,
    issue.wcagCriteria,
    issue.description.replace(/,/g, ";"),
    issue.impact.replace(/,/g, ";"),
  ])

  const csv = [headers.join(","), ...rows.map((row: any[]) => row.join(","))].join("\n")

  return csv
}
