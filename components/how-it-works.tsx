"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Code, FileSearch, Lightbulb, Sparkles } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: "Enter Your Website URL",
    description: "Simply paste your website URL into our analyzer and let our AI do the rest.",
    image: "/placeholder.svg?height=400&width=600&query=website%20url%20input%20field%20with%20modern%20UI",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI Analyzes Your Website",
    description: "Our AI scans your website for accessibility issues according to WCAG guidelines.",
    image: "/placeholder.svg?height=400&width=600&query=AI%20scanning%20website%20with%20visual%20analysis%20interface",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Review Detailed Report",
    description: "Get a comprehensive report with all accessibility issues categorized by severity.",
    image:
      "/placeholder.svg?height=400&width=600&query=accessibility%20report%20dashboard%20with%20charts%20and%20metrics",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Implement Suggestions",
    description: "Follow our AI-powered recommendations to fix accessibility issues on your website.",
    image: "/placeholder.svg?height=400&width=600&query=code%20editor%20with%20accessibility%20fix%20suggestions",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Apply Code Fixes",
    description: "Use our generated code snippets to quickly implement accessibility improvements.",
    image: "/placeholder.svg?height=400&width=600&query=developer%20implementing%20accessibility%20code%20fixes",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">How AccessAdvisor Works</h2>

          <p className="text-lg text-muted-foreground">
            Our platform makes it easy to identify and fix accessibility issues on your website in just a few simple
            steps.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16`}
            >
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <div className="text-xl font-bold">Step {index + 1}</div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block">
                    <ArrowRight
                      className={`h-8 w-8 text-primary ${index % 2 === 0 ? "ml-auto transform rotate-90 lg:rotate-0" : "transform rotate-90 lg:rotate-180"}`}
                    />
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border shadow-lg">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
