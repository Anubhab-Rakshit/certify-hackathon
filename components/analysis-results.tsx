"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Code,
  Copy,
  ExternalLink,
  Info,
  XCircle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for the analysis results
const mockResults = {
  score: 68,
  issuesCount: {
    critical: 3,
    serious: 5,
    moderate: 8,
    minor: 12,
  },
  categories: {
    perceivable: 72,
    operable: 65,
    understandable: 80,
    robust: 55,
  },
  issues: [
    {
      id: "1",
      type: "critical",
      title: "Missing alt text on images",
      description: "Images must have alt text to be accessible to screen reader users.",
      elements: [
        {
          selector: "img.hero-image",
          html: '<img class="hero-image" src="/images/hero.jpg">',
          suggestion:
            '<img class="hero-image" src="/images/hero.jpg" alt="Person using a laptop with accessibility tools">',
        },
        {
          selector: "img.product-image",
          html: '<img class="product-image" src="/images/product.jpg">',
          suggestion:
            '<img class="product-image" src="/images/product.jpg" alt="Product showcase with features highlighted">',
        },
      ],
      wcagCriteria: "1.1.1 Non-text Content (Level A)",
      impact: "Screen reader users cannot understand the content of images.",
    },
    {
      id: "2",
      type: "serious",
      title: "Insufficient color contrast",
      description: "Text must have sufficient contrast with its background to be readable.",
      elements: [
        {
          selector: ".nav-link",
          html: '<a class="nav-link" style="color: #777777; background-color: #EEEEEE;">Products</a>',
          suggestion: '<a class="nav-link" style="color: #555555; background-color: #EEEEEE;">Products</a>',
        },
      ],
      wcagCriteria: "1.4.3 Contrast (Minimum) (Level AA)",
      impact: "Users with low vision may have difficulty reading text with low contrast.",
    },
    {
      id: "3",
      type: "moderate",
      title: "Missing form labels",
      description: "Form inputs must have associated labels.",
      elements: [
        {
          selector: "#search",
          html: '<input type="text" id="search" placeholder="Search...">',
          suggestion: '<label for="search">Search</label>\n<input type="text" id="search" placeholder="Search...">',
        },
      ],
      wcagCriteria: "3.3.2 Labels or Instructions (Level A)",
      impact: "Screen reader users may not understand the purpose of form inputs.",
    },
  ],
}

interface AnalysisResultsProps {
  url: string
}

export function AnalysisResults({ url }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success"
    if (score >= 70) return "text-amber-500"
    if (score >= 50) return "text-orange-500"
    return "text-destructive"
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "serious":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "moderate":
        return <Info className="h-5 w-5 text-amber-500" />
      case "minor":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background rounded-xl border shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Accessibility Analysis Results</h2>
            <p className="text-muted-foreground">
              <span className="font-medium">{url}</span>
            </p>
          </div>
          <Button variant="outline" size="sm" className="md:w-auto" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">
              Issues (
              {mockResults.issuesCount.critical +
                mockResults.issuesCount.serious +
                mockResults.issuesCount.moderate +
                mockResults.issuesCount.minor}
              )
            </TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent/50 rounded-lg p-6 text-center">
                <div className="text-6xl font-bold mb-2 flex justify-center">
                  <span className={getScoreColor(mockResults.score)}>{mockResults.score}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <p className="text-muted-foreground">Overall Accessibility Score</p>
              </div>

              <div className="bg-accent/50 rounded-lg p-6">
                <h3 className="font-bold mb-4">Issues by Severity</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-destructive" /> Critical
                      </span>
                      <span>{mockResults.issuesCount.critical}</span>
                    </div>
                    <Progress
                      value={mockResults.issuesCount.critical * 10}
                      className="h-2 bg-secondary"
                      indicatorClassName="bg-destructive"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" /> Serious
                      </span>
                      <span>{mockResults.issuesCount.serious}</span>
                    </div>
                    <Progress
                      value={mockResults.issuesCount.serious * 5}
                      className="h-2 bg-secondary"
                      indicatorClassName="bg-orange-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Info className="h-4 w-4 text-amber-500" /> Moderate
                      </span>
                      <span>{mockResults.issuesCount.moderate}</span>
                    </div>
                    <Progress
                      value={mockResults.issuesCount.moderate * 3}
                      className="h-2 bg-secondary"
                      indicatorClassName="bg-amber-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-1">
                        <Info className="h-4 w-4 text-blue-500" /> Minor
                      </span>
                      <span>{mockResults.issuesCount.minor}</span>
                    </div>
                    <Progress
                      value={mockResults.issuesCount.minor * 2}
                      className="h-2 bg-secondary"
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-accent/50 rounded-lg p-6">
                <h3 className="font-bold mb-4">WCAG Categories</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Perceivable</span>
                      <span>{mockResults.categories.perceivable}%</span>
                    </div>
                    <Progress value={mockResults.categories.perceivable} className="h-2 bg-secondary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Operable</span>
                      <span>{mockResults.categories.operable}%</span>
                    </div>
                    <Progress value={mockResults.categories.operable} className="h-2 bg-secondary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Understandable</span>
                      <span>{mockResults.categories.understandable}%</span>
                    </div>
                    <Progress value={mockResults.categories.understandable} className="h-2 bg-secondary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Robust</span>
                      <span>{mockResults.categories.robust}%</span>
                    </div>
                    <Progress value={mockResults.categories.robust} className="h-2 bg-secondary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">Summary</h3>
              <p className="text-muted-foreground mb-4">
                Your website has several accessibility issues that should be addressed to improve usability for all
                users. The most critical issues include missing alt text on images, insufficient color contrast, and
                missing form labels.
              </p>
              <div className="bg-accent/50 rounded-lg p-4 border border-primary/20">
                <div className="flex gap-3">
                  <div className="mt-1 text-primary">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Recommendation</p>
                    <p className="text-muted-foreground">
                      Focus on fixing critical issues first, particularly adding alt text to images and improving color
                      contrast for better readability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="issues" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">All Issues</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filter by:</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    All <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {mockResults.issues.map((issue) => (
                  <AccordionItem key={issue.id} value={issue.id} className="border rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
                      <div className="flex items-center gap-3 text-left">
                        {getIssueIcon(issue.type)}
                        <div>
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-sm text-muted-foreground">{issue.wcagCriteria}</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-2">
                      <div className="space-y-4">
                        <p>{issue.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">Impact</h4>
                          <p className="text-muted-foreground">{issue.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Affected Elements</h4>
                          <div className="space-y-4">
                            {issue.elements.map((element, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="text-sm font-medium text-muted-foreground">
                                  Selector: <code className="bg-accent/50 px-1 py-0.5 rounded">{element.selector}</code>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-accent/50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium">Current Code</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 gap-1"
                                        onClick={() => handleCopyCode(element.html, `${issue.id}-${idx}-current`)}
                                      >
                                        {copiedIndex === `${issue.id}-${idx}-current` ? (
                                          <CheckCircle className="h-3.5 w-3.5" />
                                        ) : (
                                          <Copy className="h-3.5 w-3.5" />
                                        )}
                                        <span className="text-xs">
                                          {copiedIndex === `${issue.id}-${idx}-current` ? "Copied" : "Copy"}
                                        </span>
                                      </Button>
                                    </div>
                                    <pre className="text-xs overflow-x-auto p-2 bg-background rounded border">
                                      <code>{element.html}</code>
                                    </pre>
                                  </div>
                                  <div className="bg-accent/50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-medium">Suggested Fix</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 gap-1"
                                        onClick={() =>
                                          handleCopyCode(element.suggestion, `${issue.id}-${idx}-suggestion`)
                                        }
                                      >
                                        {copiedIndex === `${issue.id}-${idx}-suggestion` ? (
                                          <CheckCircle className="h-3.5 w-3.5" />
                                        ) : (
                                          <Copy className="h-3.5 w-3.5" />
                                        )}
                                        <span className="text-xs">
                                          {copiedIndex === `${issue.id}-${idx}-suggestion` ? "Copied" : "Copy"}
                                        </span>
                                      </Button>
                                    </div>
                                    <pre className="text-xs overflow-x-auto p-2 bg-background rounded border">
                                      <code>{element.suggestion}</code>
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="pt-6">
            <div className="space-y-6">
              <h3 className="font-bold text-lg">Recommended Fixes</h3>
              <p className="text-muted-foreground">
                Based on our analysis, here are the top recommendations to improve your website's accessibility:
              </p>

              <div className="space-y-6">
                <div className="bg-accent/50 rounded-lg p-6 border border-l-4 border-l-destructive">
                  <h4 className="text-lg font-bold mb-2">1. Add Alt Text to All Images</h4>
                  <p className="mb-4">
                    All images should have descriptive alt text to make them accessible to screen reader users.
                  </p>
                  <div className="bg-background rounded-lg p-4 border">
                    <h5 className="font-medium text-sm mb-2">Example Fix:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Before:</div>
                        <pre className="text-xs overflow-x-auto p-2 bg-accent/50 rounded">
                          <code>{`<img src="product.jpg">`}</code>
                        </pre>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">After:</div>
                        <pre className="text-xs overflow-x-auto p-2 bg-accent/50 rounded">
                          <code>{`<img src="product.jpg" alt="Product description here">`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-6 border border-l-4 border-l-orange-500">
                  <h4 className="text-lg font-bold mb-2">2. Improve Color Contrast</h4>
                  <p className="mb-4">
                    Ensure text has sufficient contrast with its background to be readable by users with low vision.
                  </p>
                  <div className="bg-background rounded-lg p-4 border">
                    <h5 className="font-medium text-sm mb-2">Example Fix:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Before:</div>
                        <div className="p-4 bg-[#EEEEEE] rounded">
                          <span className="text-[#777777]">Low contrast text</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">After:</div>
                        <div className="p-4 bg-[#EEEEEE] rounded">
                          <span className="text-[#555555]">Improved contrast text</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-6 border border-l-4 border-l-amber-500">
                  <h4 className="text-lg font-bold mb-2">3. Add Labels to Form Inputs</h4>
                  <p className="mb-4">
                    All form inputs should have associated labels to help screen reader users understand their purpose.
                  </p>
                  <div className="bg-background rounded-lg p-4 border">
                    <h5 className="font-medium text-sm mb-2">Example Fix:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Before:</div>
                        <pre className="text-xs overflow-x-auto p-2 bg-accent/50 rounded">
                          <code>{`<input type="text" id="search" placeholder="Search...">`}</code>
                        </pre>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">After:</div>
                        <pre className="text-xs overflow-x-auto p-2 bg-accent/50 rounded">
                          <code>{`<label for="search">Search</label>\n<input type="text" id="search" placeholder="Search...">`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                <div className="flex gap-4">
                  <div className="mt-1 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Next Steps</h4>
                    <p className="mb-4">
                      Implementing these recommendations will significantly improve your website's accessibility and
                      user experience for all visitors.
                    </p>
                    <Button className="gap-2">
                      <Code className="h-4 w-4" />
                      Generate Implementation Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-6 bg-accent/50 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Analysis completed on {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Download Report
            </Button>
            <Button size="sm">Fix Issues</Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
