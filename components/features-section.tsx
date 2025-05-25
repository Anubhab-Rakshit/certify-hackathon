"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Code2, Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning understands context, not just rules. Get intelligent suggestions that actually make sense.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Scan entire websites in seconds. Our distributed architecture processes thousands of pages simultaneously.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "WCAG 2.1 Compliant",
    description:
      "Full coverage of Level A, AA, and AAA guidelines. Stay compliant with international accessibility standards.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description:
      "Beautiful, actionable reports that developers love. Export to PDF, share with stakeholders, track progress.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Code2,
    title: "Code Suggestions",
    description: "Get exact code fixes, not vague recommendations. Copy-paste solutions that work in your framework.",
    gradient: "from-red-500 to-rose-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams. Assign issues, track fixes, and celebrate improvements together.",
    gradient: "from-sky-500 to-blue-600",
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-32 relative" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />

      <div className="container-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Powerful Features</span>
          </div>
          <h2 className="text-display mb-4">
            Features That Actually
            <br />
            Make a Difference
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            We've obsessed over every detail to create the most powerful accessibility platform on the market.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${feature.gradient.split(" ")[1]}, ${feature.gradient.split(" ")[3]})`,
                }}
              />

              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-lg p-2.5 mb-6 relative overflow-hidden",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:opacity-100",
                  feature.gradient,
                )}
              >
                <feature.icon className="w-full h-full text-white relative z-10" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              {/* Hover indicator */}
              <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
