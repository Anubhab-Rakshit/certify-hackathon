"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, Zap } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const staggerDelay = 0.1

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-gray-50 rounded-full blur-3xl opacity-60" />
        </motion.div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container-xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 lg:pr-8">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Trusted by Fortune 500 companies</span>
            </motion.div>

            {/* Main headline */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: staggerDelay }}
                className="text-hero mb-4"
              >
                AI-Powered Web
                <br />
                Accessibility That
                <br />
                <span className="relative inline-block">
                  Actually Works
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 -z-10 origin-left"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: staggerDelay * 2 }}
                className="text-body max-w-xl"
              >
                Scan, analyze, and fix accessibility issues in seconds. Enterprise-grade WCAG compliance powered by
                advanced AI that understands context, not just rules.
              </motion.p>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: staggerDelay * 3 }}
              className="flex flex-col sm:flex-row items-start gap-6 mb-12"
            >
              <div className="relative w-full sm:max-w-md">
                <input
                  type="url"
                  placeholder="Enter your website URL"
                  className="w-full px-6 py-4 pr-36 text-base bg-white border-2 border-gray-200 focus:border-blue-600 transition-all duration-300 outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 group">
                  Scan Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free for personal use</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: staggerDelay * 4 }}
              className="pt-8 border-t border-gray-100"
            >
              <p className="text-sm text-gray-500 mb-4">Trusted by leading companies worldwide</p>
              <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale">
                {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map((company, i) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: staggerDelay * 5 + i * 0.1 }}
                    className="text-lg font-bold"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: staggerDelay * 2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg -z-10" />
              <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=800&query=accessibility%20dashboard%20with%20charts%20and%20metrics"
                  alt="AccessiScan Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 right-10 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">WCAG AA Compliant</div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-10 left-10 bg-blue-600 text-white p-3 rounded-lg shadow-lg"
                >
                  <div className="text-sm font-medium">Score: 98/100</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
