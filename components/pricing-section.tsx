"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for personal projects",
    features: ["5 website scans per month", "Basic accessibility reports", "WCAG 2.1 Level A checks", "Email support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 99, annual: 79 },
    description: "For growing businesses",
    features: [
      "Unlimited website scans",
      "Advanced AI analysis",
      "WCAG 2.1 Level AA checks",
      "Priority support",
      "Team collaboration (5 users)",
      "API access",
      "Custom reports",
    ],
    cta: "Start Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "WCAG 2.1 Level AAA checks",
      "Unlimited team members",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section id="pricing" className="py-32 bg-gray-50" ref={containerRef}>
      <div className="container-xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display mb-6">
            Simple, Transparent
            <br />
            Pricing
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all",
                billingCycle === "monthly" ? "bg-white text-black shadow-sm" : "text-gray-600",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all",
                billingCycle === "annual" ? "bg-white text-black shadow-sm" : "text-gray-600",
              )}
            >
              Annual
              <span className="ml-2 text-xs text-green-600">Save 20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={plan.popular ? {} : { y: -8 }}
              className={cn(
                "relative bg-white p-8 transition-all duration-300",
                plan.popular
                  ? "border-2 border-blue-600 shadow-2xl scale-105 z-10"
                  : "border border-gray-200 hover:shadow-xl",
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full flex items-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  Most Popular
                </motion.div>
              )}

              {/* Plan details */}
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        ${billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                      </span>
                      <span className="text-gray-600">/month</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-medium">Custom Pricing</div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-3 font-medium transition-colors",
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-black border-2 border-black hover:bg-gray-50",
                  )}
                >
                  {plan.cta}
                </motion.button>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.1 + idx * 0.05 + 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <p className="text-sm text-gray-500">
            Questions?{" "}
            <a href="#" className="underline hover:text-black transition-colors">
              Talk to our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
