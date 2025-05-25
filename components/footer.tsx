"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"

const footerLinks = {
  Product: ["Features", "Pricing", "API Docs", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Guides", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Compliance"],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "GitHub", icon: Github, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
]

export function Footer() {
  const [emailValue, setEmailValue] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailValue) {
      setIsSubmitted(true)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block text-2xl font-bold mb-6">
              AccessiScan
            </Link>
            <p className="text-gray-600 mb-8 max-w-md">
              Making the web accessible for everyone. Join our newsletter to get the latest updates and accessibility
              tips.
            </p>

            {/* Newsletter form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-gray-200 focus:border-blue-600 transition-all duration-300 outline-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 p-4 text-green-800 max-w-md"
              >
                Thank you for subscribing! We'll be in touch soon.
              </motion.div>
            )}
          </div>

          {/* Links */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="font-medium mb-4">{category}</h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-blue-600 transition-colors inline-block relative group"
                        >
                          {link}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} AccessiScan. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="flex justify-center mt-12">
          <motion.a
            href="#top"
            whileHover={{ y: -5 }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
