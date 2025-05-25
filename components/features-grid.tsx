"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Code2, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning understands context, not just rules. Get intelligent suggestions that actually make sense.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Scan entire websites in seconds. Our distributed architecture processes thousands of pages simultaneously.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "WCAG 2.1 Compliant",
    description:
      "Full coverage of Level A, AA, and AAA guidelines. Stay compliant with international accessibility standards.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description:
      "Beautiful, actionable reports that developers love. Export to PDF, share with stakeholders, track progress.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Code2,
    title: "Code Suggestions",
    description: "Get exact code fixes, not vague recommendations. Copy-paste solutions that work in your framework.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams. Assign issues, track fixes, and celebrate improvements together.",
    gradient: "from-indigo-500 to-blue-500",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-display mb-6">
              Features That Actually
              <br />
              Make a Difference
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              We've obsessed over every detail to create the most powerful accessibility platform on the market.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-8 hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient border on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient.split(" ")[1]}, ${feature.gradient.split(" ")[3]})`,
                  }}
                />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-2.5 mb-6`}>
                  <feature.icon className="w-full h-full text-white" />
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
      </div>
    </section>
  )
}
