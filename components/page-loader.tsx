"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Ear, Hand, Loader2 } from "lucide-react"

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    // Change loading text
    const textTimers = [
      setTimeout(() => setLoadingText("Loading Assets..."), 1500),
      setTimeout(() => setLoadingText("Almost Ready..."), 3000),
    ]

    // Complete loading
    const completeTimer = setTimeout(() => {
      setLoading(false)
    }, 4000)

    return () => {
      clearInterval(interval)
      clearTimeout(skipTimer)
      clearTimeout(completeTimer)
      textTimers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  const handleSkip = () => {
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Floating accessibility icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute"
            >
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  rotate: [0, 5, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="absolute -top-32 -left-32"
              >
                <Eye className="h-12 w-12 text-blue-400/70" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 30, 0],
                  x: [0, -20, 0],
                  rotate: [0, -5, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                className="absolute -bottom-32 -left-32"
              >
                <Ear className="h-12 w-12 text-blue-400/70" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, -30, 0],
                  rotate: [0, -3, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                className="absolute -top-24 -right-32"
              >
                <Hand className="h-12 w-12 text-blue-400/70" />
              </motion.div>
            </motion.div>

            {/* Logo */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="mb-12 text-4xl font-bold text-white"
            >
              <span className="text-blue-400">Accessi</span>Scan
            </motion.div>

            {/* Progress counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 text-[72px] font-bold text-white"
            >
              {progress}%
            </motion.div>

            {/* Progress ring */}
            <div className="relative mb-8 h-40 w-40">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
              </div>
            </div>

            {/* Loading text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg text-gray-300"
            >
              {loadingText}
            </motion.div>

            {/* Skip button */}
            <AnimatePresence>
              {showSkip && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={handleSkip}
                  className="mt-8 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Skip Intro
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
