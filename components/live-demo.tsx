"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AlertTriangle, Check, ChevronRight, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function LiveDemo() {
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [url, setUrl] = useState("https://example.com")
  const [isValidUrl, setIsValidUrl] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    try {
      new URL(e.target.value)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  const handleScan = () => {
    if (!isValidUrl) return

    setIsScanning(true)
    setShowResults(false)

    setTimeout(() => {
      setIsScanning(false)
      setShowResults(true)
    }, 3000)
  }

  const staggerDelay = 0.1

  return (
    <section id="demo" className="py-32 relative bg-gray-50" ref={containerRef}>
      <div className="container-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4">
            <span className="text-sm font-medium text-blue-600">Interactive Demo</span>
          </div>
          <h2 className="text-display mb-4">See It In Action</h2>
          <p className="text-body max-w-2xl mx-auto">
            Experience the power of AI-driven accessibility analysis. Try our live demo and see instant results.
          </p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: staggerDelay }}
          className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-lg"
        >
          {/* URL Input */}
          <div className="p-8 border-b border-gray-200">
            <label className="block text-sm font-medium mb-3">Website URL</label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  className={cn(
                    "w-full px-6 py-4 text-base bg-white border-2 transition-all duration-300 outline-none",
                    isValidUrl ? "border-gray-200 focus:border-blue-600" : "border-red-300 focus:border-red-500",
                  )}
                />
                {url && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isValidUrl ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-500" />}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={isScanning || !isValidUrl}
                className="px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  "Start Scan"
                )}
              </motion.button>
            </div>
            {!isValidUrl && url && (
              <p className="mt-2 text-sm text-red-500">Please enter a valid URL including http:// or https://</p>
            )}
          </div>

          {/* Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-16 flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{ pathLength: 1, rotate: 270 }}
                        transition={{
                          pathLength: { duration: 3, ease: "easeInOut" },
                          rotate: { duration: 3, ease: "linear" },
                        }}
                        style={{ transformOrigin: "center" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                      >
                        <span className="text-blue-600 font-bold">AI</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="space-y-3 text-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-600"
                    >
                      Analyzing HTML structure...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-gray-600"
                    >
                      Checking WCAG compliance...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="text-gray-600"
                    >
                      Generating recommendations...
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Score Overview */}
                <div className="p-8 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white border border-gray-200 p-6 text-center"
                    >
                      <div className="relative mb-2">
                        <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="283"
                            initial={{ strokeDashoffset: 283 }}
                            animate={{ strokeDashoffset: 283 - (283 * 68) / 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-3xl font-bold"
                          >
                            68
                          </motion.span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </motion.div>

                    {[
                      { label: "Critical Issues", value: 3, color: "red", icon: X },
                      { label: "Warnings", value: 8, color: "orange", icon: AlertTriangle },
                      { label: "Passed Checks", value: 24, color: "green", icon: Check },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="bg-white border border-gray-200 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              item.color === "red" && "bg-red-100",
                              item.color === "orange" && "bg-orange-100",
                              item.color === "green" && "bg-green-100",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "w-5 h-5",
                                item.color === "red" && "text-red-600",
                                item.color === "orange" && "text-orange-600",
                                item.color === "green" && "text-green-600",
                              )}
                            />
                          </div>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="text-3xl font-bold"
                          >
                            {item.value}
                          </motion.span>
                        </div>
                        <div className="text-sm text-gray-600">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Detailed Results Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {["Overview", "Issues", "Suggestions"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={cn(
                          "px-6 py-4 font-medium transition-colors relative",
                          activeTab === tab.toLowerCase() ? "text-blue-600" : "text-gray-500 hover:text-gray-900",
                        )}
                      >
                        {tab}
                        {activeTab === tab.toLowerCase() && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-xl font-medium mb-4">Accessibility Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">WCAG Compliance</h4>
                            <div className="space-y-3">
                              {["Perceivable", "Operable", "Understandable", "Robust"].map((principle, i) => (
                                <div key={principle} className="flex items-center justify-between">
                                  <span className="text-sm">{principle}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${65 + i * 5}%` }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                        className="h-full bg-blue-600"
                                      />
                                    </div>
                                    <span className="text-sm font-medium">{65 + i * 5}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Top Issues</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <X className="w-4 h-4 text-red-500 mt-0.5" />
                                <span className="text-sm">Missing alt text on 12 images</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                                <span className="text-sm">Low contrast text in navigation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                                <span className="text-sm">Form inputs missing labels</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                                <span className="text-sm">Keyboard navigation issues</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "issues" && (
                      <motion.div
                        key="issues"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-xl font-medium mb-4">Detailed Issues</h3>
                        <div className="space-y-4">
                          {[
                            {
                              type: "critical",
                              title: "Images missing alt text",
                              count: 12,
                              impact: "Screen readers cannot describe images",
                              wcag: "1.1.1 Non-text Content (Level A)",
                            },
                            {
                              type: "warning",
                              title: "Insufficient color contrast",
                              count: 5,
                              impact: "Text may be hard to read for users with low vision",
                              wcag: "1.4.3 Contrast (Minimum) (Level AA)",
                            },
                            {
                              type: "warning",
                              title: "Missing form labels",
                              count: 3,
                              impact: "Screen reader users may not understand form purpose",
                              wcag: "3.3.2 Labels or Instructions (Level A)",
                            },
                          ].map((issue, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                              <div className="p-4 flex items-start justify-between cursor-pointer">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      "w-2 h-2 rounded-full mt-2",
                                      issue.type === "critical" ? "bg-red-500" : "bg-orange-500",
                                    )}
                                  />
                                  <div>
                                    <h4 className="font-medium">{issue.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{issue.impact}</p>
                                    <p className="text-xs text-gray-500 mt-1">{issue.wcag}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{issue.count} instances</span>
                                  <ChevronRight className="w-4 h-4" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "suggestions" && (
                      <motion.div
                        key="suggestions"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-xl font-medium mb-4">AI-Powered Suggestions</h3>
                        <div className="space-y-6">
                          <div className="bg-blue-50 p-6 border border-blue-100">
                            <h4 className="font-medium mb-3">Quick Wins (Implement Today)</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Add descriptive alt text to all images</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    This will immediately improve screen reader experience
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Increase text contrast in navigation menu</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Change text color from #999 to #666 for WCAG AA compliance
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-gray-50 p-6 border border-gray-200">
                            <h4 className="font-medium mb-3">Code Example</h4>
                            <div className="bg-white p-4 border border-gray-200 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Before</span>
                                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                                  Copy
                                </button>
                              </div>
                              <pre className="text-sm font-mono overflow-x-auto p-2 bg-gray-50 rounded">
                                {`<img src="hero.jpg">`}
                              </pre>
                            </div>
                            <div className="mt-4 bg-white p-4 border border-gray-200 rounded">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">After</span>
                                <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                                  Copy
                                </button>
                              </div>
                              <pre className="text-sm font-mono overflow-x-auto p-2 bg-gray-50 rounded">
                                {`<img src="hero.jpg" alt="Team collaborating in modern office space">`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
