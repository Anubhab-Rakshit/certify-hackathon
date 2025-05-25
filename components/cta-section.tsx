"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-br from-primary/90 to-blue-600/90 rounded-3xl p-8 md:p-12 lg:p-16 text-white text-center max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Make Your Website Accessible to Everyone?
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Join thousands of websites that have improved their accessibility and reached more users with AccessAdvisor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-primary" asChild>
              <Link href="/analyze">
                Analyze Your Website <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/playground">Try Demo</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
