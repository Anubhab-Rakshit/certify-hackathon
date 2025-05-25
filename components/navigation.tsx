"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Enterprise", href: "#enterprise" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled ? "glass py-4" : "py-8",
        )}
      >
        <div className="container-xl mx-auto flex items-center justify-between">
          <Link href="/" className="group relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-2"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-blue-600 text-white">
                <span className="text-lg font-bold">A</span>
                <motion.div
                  className="absolute inset-0 bg-blue-500"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xl font-bold">AccessiScan</span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="group relative text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <Link
                href="#login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log In
              </Link>
              <Link href="#signup" className="btn btn-primary">
                Start Free Scan
              </Link>
            </motion.div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-10 lg:hidden flex h-10 w-10 items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-5 w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full bg-black transition-all duration-300",
                  isMenuOpen ? "top-2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-0.5 w-full bg-black transition-all duration-300",
                  isMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full bg-black transition-all duration-300",
                  isMenuOpen ? "top-2 -rotate-45" : "top-4",
                )}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white pt-24 lg:hidden"
          >
            <div className="container-xl mx-auto py-8">
              <nav className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-medium"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="#login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 text-center text-gray-700"
                >
                  Log In
                </Link>
                <Link
                  href="#signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full py-3 text-center"
                >
                  Start Free Scan
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
