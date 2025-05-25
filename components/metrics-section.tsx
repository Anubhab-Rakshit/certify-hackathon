"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  decimals?: number
  duration?: number
}

function AnimatedCounter({ value, suffix = "", decimals = 0, duration = 2 }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)

      setDisplayValue(progress * value)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-6xl font-bold"
    >
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}

const metrics = [
  { value: 98.7, suffix: "%", label: "Accuracy Rate", decimals: 1 },
  { value: 2500, suffix: "+", label: "Companies Trust Us", decimals: 0 },
  { value: 1.2, suffix: "M", label: "Websites Scanned", decimals: 1 },
  { value: 4.9, suffix: "/5", label: "Customer Rating", decimals: 1 },
]

export function MetricsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,white_0%,transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-display mb-6">
            Numbers That
            <br />
            Speak Volumes
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            We're not just another tool. We're the industry standard for web accessibility analysis.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
              </div>
              <p className="text-gray-400">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-medium mb-8 text-center">Accessibility Improvement Over Time</h3>
          <div className="h-64 relative">
            {/* Chart bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-4 pb-10">
              {[45, 58, 67, 72, 80, 88, 95].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-blue-600 rounded-t"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${height}%` } : { height: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => (
                <div key={month} className="text-center">
                  {month}
                </div>
              ))}
            </div>

            {/* Y-axis */}
            <div className="absolute top-0 left-0 bottom-10 w-10 flex flex-col justify-between items-end pr-2">
              {[0, 25, 50, 75, 100].map((value) => (
                <div key={value} className="text-xs text-gray-400">
                  {value}%
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-xl mb-8 opacity-80">Join thousands of companies making the web accessible</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary">
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
