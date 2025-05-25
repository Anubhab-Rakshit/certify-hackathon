"use client"

import { motion } from "framer-motion"
import { Quote, Star, Sparkles } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "AccessAdvisor helped us identify critical accessibility issues we had no idea existed. Our website is now fully WCAG compliant!",
    author: "Sarah Johnson",
    role: "Web Developer at TechCorp",
    avatar: "/placeholder.svg?height=100&width=100&query=professional%20woman%20headshot",
    rating: 5,
  },
  {
    quote:
      "The AI-powered suggestions were incredibly helpful. We improved our accessibility score by 85% in just one week.",
    author: "Michael Chen",
    role: "Product Manager at StartupX",
    avatar: "/placeholder.svg?height=100&width=100&query=professional%20asian%20man%20headshot",
    rating: 5,
  },
  {
    quote:
      "As someone with a visual impairment, I appreciate companies that use tools like AccessAdvisor to make the web more inclusive.",
    author: "David Rodriguez",
    role: "Accessibility Advocate",
    avatar: "/placeholder.svg?height=100&width=100&query=professional%20latino%20man%20headshot",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-accent/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Success Stories</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>

          <p className="text-lg text-muted-foreground">
            Discover how AccessAdvisor has helped organizations improve their website accessibility and reach more
            users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-background rounded-xl border p-8 relative"
            >
              <div className="absolute top-6 right-6 text-primary">
                <Quote className="h-10 w-10 opacity-20" />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-muted"}`}
                  />
                ))}
              </div>

              <p className="text-lg mb-6">{testimonial.quote}</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
