import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const { results, url } = await request.json()

    if (!results) {
      return NextResponse.json({ error: "No analysis results provided" }, { status: 400 })
    }

    // Create new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold = false, color = "#000000") => {
      pdf.setFontSize(fontSize)
      pdf.setFont("helvetica", isBold ? "bold" : "normal")
      pdf.setTextColor(color)

      const lines = pdf.splitTextToSize(text, contentWidth)
      const lineHeight = fontSize * 0.4

      checkPageBreak(lines.length * lineHeight + 5)

      lines.forEach((line: string) => {
        pdf.text(line, margin, yPosition)
        yPosition += lineHeight
      })
      yPosition += 5
    }

    // Helper function to add section header
    const addSectionHeader = (title: string) => {
      checkPageBreak(15)
      pdf.setFillColor(79, 70, 229) // Indigo background
      pdf.rect(margin, yPosition - 5, contentWidth, 12, "F")
      pdf.setTextColor("#FFFFFF")
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text(title, margin + 5, yPosition + 3)
      yPosition += 15
      pdf.setTextColor("#000000")
    }

    // Add header with logo area
    pdf.setFillColor(15, 23, 42) // Dark background
    pdf.rect(0, 0, pageWidth, 40, "F")

    pdf.setTextColor("#FFFFFF")
    pdf.setFontSize(24)
    pdf.setFont("helvetica", "bold")
    pdf.text("Accessibility Analysis Report", margin, 25)

    pdf.setFontSize(12)
    pdf.setFont("helvetica", "normal")
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 35)

    yPosition = 50

    // Website Information
    addSectionHeader("Website Information")
    addText(`URL: ${url}`, 12, true)
    addText(`Title: ${results.websitePreview?.title || "N/A"}`, 11)
    addText(`Language: ${results.websiteMetadata?.language || "en"}`, 11)
    addText(`Analysis Date: ${new Date().toLocaleString()}`, 11)
    addText(`Processing Time: ${results.processingTime}`, 11)

    // Overall Score Section
    addSectionHeader("Overall Accessibility Score")

    // Score visualization
    checkPageBreak(30)
    const scoreColor = results.analysis.score >= 80 ? "#10B981" : results.analysis.score >= 60 ? "#F59E0B" : "#EF4444"
    pdf.setFillColor(scoreColor)
    pdf.circle(margin + 30, yPosition + 15, 20, "F")

    pdf.setTextColor("#FFFFFF")
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text(`${results.analysis.score}`, margin + 25, yPosition + 18)

    pdf.setTextColor("#000000")
    pdf.setFontSize(16)
    pdf.text(`Grade: ${results.analysis.grade}`, margin + 60, yPosition + 10)
    pdf.setFontSize(12)
    pdf.text(`Out of 100 points`, margin + 60, yPosition + 20)

    yPosition += 35

    // Issues Summary
    addSectionHeader("Issues Summary")
    const issues = results.analysis.issuesCount
    addText(`Critical Issues: ${issues.critical}`, 12, true, issues.critical > 0 ? "#DC2626" : "#059669")
    addText(`Serious Issues: ${issues.serious}`, 12, true, issues.serious > 0 ? "#EA580C" : "#059669")
    addText(`Moderate Issues: ${issues.moderate}`, 12, true, issues.moderate > 0 ? "#D97706" : "#059669")
    addText(`Minor Issues: ${issues.minor}`, 12, true, issues.minor > 0 ? "#2563EB" : "#059669")

    // WCAG Categories
    addSectionHeader("WCAG 2.1 Categories Performance")
    const categories = results.analysis.categories
    Object.entries(categories).forEach(([category, score]) => {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
      const color = score >= 80 ? "#059669" : score >= 60 ? "#D97706" : "#DC2626"
      addText(`${categoryName}: ${score}%`, 12, false, color)
    })

    // Detailed Issues
    if (results.analysis.issues && results.analysis.issues.length > 0) {
      addSectionHeader("Detailed Issues")

      results.analysis.issues.forEach((issue: any, index: number) => {
        checkPageBreak(25)

        // Issue header
        const priorityColor =
          issue.type === "critical"
            ? "#DC2626"
            : issue.type === "serious"
              ? "#EA580C"
              : issue.type === "moderate"
                ? "#D97706"
                : "#2563EB"

        pdf.setFillColor(priorityColor)
        pdf.rect(margin, yPosition, contentWidth, 8, "F")
        pdf.setTextColor("#FFFFFF")
        pdf.setFontSize(12)
        pdf.setFont("helvetica", "bold")
        pdf.text(`${index + 1}. ${issue.title}`, margin + 2, yPosition + 5)
        yPosition += 12

        pdf.setTextColor("#000000")
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")

        addText(`Type: ${issue.type.toUpperCase()}`, 10, true)
        addText(`WCAG Criteria: ${issue.wcagCriteria}`, 10)
        addText(`Description: ${issue.description}`, 10)
        addText(`Impact: ${issue.impact}`, 10)
        addText(`How to Fix: ${issue.howToFix}`, 10)
        yPosition += 5
      })
    }

    // Positive Features
    if (results.analysis.positives && results.analysis.positives.length > 0) {
      addSectionHeader("Positive Accessibility Features")

      results.analysis.positives.forEach((positive: any, index: number) => {
        checkPageBreak(15)
        pdf.setTextColor("#059669")
        pdf.setFontSize(11)
        pdf.setFont("helvetica", "bold")
        pdf.text(`✓ ${positive.title}`, margin, yPosition)
        yPosition += 5

        pdf.setTextColor("#000000")
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        addText(positive.description, 10)
      })
    }

    // Recommendations
    addSectionHeader("Recommendations")
    addText(results.analysis.summary.overview, 11)
    addText(`Critical Findings: ${results.analysis.summary.criticalFindings}`, 11, true)
    addText(`Estimated Fix Time: ${results.analysis.summary.estimatedFixTime}`, 11, true)

    if (results.analysis.summary.recommendations) {
      addText("Action Items:", 12, true)
      results.analysis.summary.recommendations.forEach((rec: string, index: number) => {
        addText(`${index + 1}. ${rec}`, 10)
      })
    }

    // Technical Details
    addSectionHeader("Technical Analysis Details")
    const automated = results.analysis.automatedChecks
    addText(`Elements Analyzed: ${results.analysis.elementDetails?.totalElements || 0}`, 11)
    addText(`Visible Elements: ${results.analysis.elementDetails?.visibleElements || 0}`, 11)
    addText(`Images Missing Alt Text: ${automated.altTextMissing}`, 11)
    addText(`Empty Links: ${automated.emptyLinks}`, 11)
    addText(`Missing Form Labels: ${automated.missingLabels}`, 11)
    addText(`Heading Structure: ${automated.headingStructure}`, 11)
    addText(`Color Contrast Issues: ${automated.colorContrastIssues}`, 11)

    // Footer
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(8)
      pdf.setTextColor("#666666")
      pdf.text(
        `Page ${i} of ${totalPages} | Generated by Accessibility Advisor | ${new Date().toLocaleDateString()}`,
        margin,
        pageHeight - 10,
      )
    }

    // Generate PDF buffer
    const pdfBuffer = pdf.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="accessibility-report-${new Date().toISOString().split("T")[0]}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF", details: error.message }, { status: 500 })
  }
}
