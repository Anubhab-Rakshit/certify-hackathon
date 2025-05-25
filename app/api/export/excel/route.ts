import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function POST(request: NextRequest) {
  try {
    const { results, url } = await request.json()

    if (!results) {
      return NextResponse.json({ error: "No analysis results provided" }, { status: 400 })
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // 1. Summary Sheet
    const summaryData = [
      ["Accessibility Analysis Report"],
      [""],
      ["Website Information"],
      ["URL", url],
      ["Title", results.websitePreview?.title || "N/A"],
      ["Language", results.websiteMetadata?.language || "en"],
      ["Analysis Date", new Date().toLocaleString()],
      ["Processing Time", results.processingTime],
      [""],
      ["Overall Score"],
      ["Score", results.analysis.score],
      ["Grade", results.analysis.grade],
      [""],
      ["Issues Summary"],
      ["Critical Issues", results.analysis.issuesCount.critical],
      ["Serious Issues", results.analysis.issuesCount.serious],
      ["Moderate Issues", results.analysis.issuesCount.moderate],
      ["Minor Issues", results.analysis.issuesCount.minor],
      ["Total Issues", Object.values(results.analysis.issuesCount).reduce((a: number, b: number) => a + b, 0)],
      [""],
      ["WCAG Categories"],
      ["Perceivable", `${results.analysis.categories.perceivable}%`],
      ["Operable", `${results.analysis.categories.operable}%`],
      ["Understandable", `${results.analysis.categories.understandable}%`],
      ["Robust", `${results.analysis.categories.robust}%`],
      [""],
      ["Technical Details"],
      ["Total Elements", results.analysis.elementDetails?.totalElements || 0],
      ["Visible Elements", results.analysis.elementDetails?.visibleElements || 0],
      ["Images Missing Alt", results.analysis.automatedChecks.altTextMissing],
      ["Empty Links", results.analysis.automatedChecks.emptyLinks],
      ["Missing Labels", results.analysis.automatedChecks.missingLabels],
      ["Heading Structure", results.analysis.automatedChecks.headingStructure],
      ["Color Contrast Issues", results.analysis.automatedChecks.colorContrastIssues],
    ]

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)

    // Style the summary sheet
    summarySheet["!cols"] = [{ width: 25 }, { width: 40 }]

    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

    // 2. Detailed Issues Sheet
    if (results.analysis.issues && results.analysis.issues.length > 0) {
      const issuesData = [["ID", "Type", "Title", "WCAG Criteria", "Description", "Impact", "How to Fix", "Priority"]]

      results.analysis.issues.forEach((issue: any) => {
        issuesData.push([
          issue.id || "",
          issue.type || "",
          issue.title || "",
          issue.wcagCriteria || "",
          issue.description || "",
          issue.impact || "",
          issue.howToFix || "",
          issue.priority || "",
        ])
      })

      const issuesSheet = XLSX.utils.aoa_to_sheet(issuesData)
      issuesSheet["!cols"] = [
        { width: 20 }, // ID
        { width: 12 }, // Type
        { width: 30 }, // Title
        { width: 15 }, // WCAG
        { width: 50 }, // Description
        { width: 40 }, // Impact
        { width: 50 }, // How to Fix
        { width: 12 }, // Priority
      ]

      XLSX.utils.book_append_sheet(workbook, issuesSheet, "Issues")
    }

    // 3. Positive Features Sheet
    if (results.analysis.positives && results.analysis.positives.length > 0) {
      const positivesData = [["Title", "Description", "WCAG Criteria"]]

      results.analysis.positives.forEach((positive: any) => {
        positivesData.push([positive.title || "", positive.description || "", positive.wcagCriteria || ""])
      })

      const positivesSheet = XLSX.utils.aoa_to_sheet(positivesData)
      positivesSheet["!cols"] = [
        { width: 30 }, // Title
        { width: 60 }, // Description
        { width: 15 }, // WCAG
      ]

      XLSX.utils.book_append_sheet(workbook, positivesSheet, "Positive Features")
    }

    // 4. Element Analysis Sheet
    const elementData = [
      ["Element Analysis"],
      [""],
      ["Images Analysis"],
      ["Total Images", results.analysis.elementDetails?.capturedImages || 0],
      ["Images Missing Alt Text", results.analysis.automatedChecks.altTextMissing],
      [""],
      ["Links Analysis"],
      ["Total Links", results.analysis.elementDetails?.capturedLinks || 0],
      ["Empty Links", results.analysis.automatedChecks.emptyLinks],
      [""],
      ["Forms Analysis"],
      ["Total Forms", results.analysis.elementDetails?.capturedForms || 0],
      ["Missing Labels", results.analysis.automatedChecks.missingLabels],
      [""],
      ["Headings Analysis"],
      ["Total Headings", results.analysis.elementDetails?.capturedHeadings || 0],
      ["Heading Structure", results.analysis.automatedChecks.headingStructure],
      [""],
      ["Page Structure"],
      ["Has Main Element", results.websiteMetadata?.structure?.hasMain ? "Yes" : "No"],
      ["Has Navigation", results.websiteMetadata?.structure?.hasNav ? "Yes" : "No"],
      ["Has Header", results.websiteMetadata?.structure?.hasHeader ? "Yes" : "No"],
      ["Has Footer", results.websiteMetadata?.structure?.hasFooter ? "Yes" : "No"],
      ["Landmark Count", results.websiteMetadata?.structure?.landmarkCount || 0],
      [""],
      ["Page Dimensions"],
      ["Page Width", results.analysis.elementDetails?.pageDimensions?.scrollWidth || 0],
      ["Page Height", results.analysis.elementDetails?.pageDimensions?.scrollHeight || 0],
      ["Viewport Width", results.analysis.elementDetails?.pageDimensions?.viewportWidth || 0],
      ["Viewport Height", results.analysis.elementDetails?.pageDimensions?.viewportHeight || 0],
    ]

    const elementSheet = XLSX.utils.aoa_to_sheet(elementData)
    elementSheet["!cols"] = [{ width: 25 }, { width: 30 }]

    XLSX.utils.book_append_sheet(workbook, elementSheet, "Element Analysis")

    // 5. Recommendations Sheet
    const recommendationsData = [
      ["Accessibility Recommendations"],
      [""],
      ["Overview"],
      [results.analysis.summary.overview || ""],
      [""],
      ["Critical Findings"],
      [results.analysis.summary.criticalFindings || ""],
      [""],
      ["Estimated Fix Time"],
      [results.analysis.summary.estimatedFixTime || ""],
      [""],
      ["Action Items"],
    ]

    if (results.analysis.summary.recommendations) {
      results.analysis.summary.recommendations.forEach((rec: string, index: number) => {
        recommendationsData.push([`${index + 1}. ${rec}`])
      })
    }

    recommendationsData.push(
      [""],
      ["WCAG 2.1 Guidelines"],
      ["Level A - Critical accessibility requirements"],
      ["Level AA - Standard accessibility requirements (recommended)"],
      ["Level AAA - Enhanced accessibility requirements"],
      [""],
      ["Common Fixes"],
      ["1. Add alt text to all informative images"],
      ["2. Ensure all form inputs have labels"],
      ["3. Use proper heading hierarchy (h1, h2, h3...)"],
      ["4. Ensure sufficient color contrast (4.5:1 for normal text)"],
      ["5. Make all interactive elements keyboard accessible"],
      ["6. Provide skip links for navigation"],
      ["7. Use semantic HTML elements (main, nav, header, footer)"],
      ["8. Test with screen readers"],
    )

    const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
    recommendationsSheet["!cols"] = [{ width: 80 }]

    XLSX.utils.book_append_sheet(workbook, recommendationsSheet, "Recommendations")

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
      compression: true,
    })

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="accessibility-analysis-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    })
  } catch (error: any) {
    console.error("Excel generation error:", error)
    return NextResponse.json({ error: "Failed to generate Excel file", details: error.message }, { status: 500 })
  }
}
