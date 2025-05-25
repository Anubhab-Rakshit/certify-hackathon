import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Our Mission</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Making the Web Accessible for Everyone</h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe that everyone deserves equal access to digital content, regardless of their abilities or
              disabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                AccessAdvisor was born from a simple observation: despite the importance of web accessibility, most
                websites still have significant barriers that prevent people with disabilities from using them
                effectively.
              </p>
              <p className="text-muted-foreground mb-4">
                We set out to create a tool that would make it easy for developers and website owners to identify and
                fix accessibility issues, without requiring deep expertise in accessibility standards.
              </p>
              <p className="text-muted-foreground">
                By leveraging the power of AI, we've built a platform that provides instant, actionable insights to
                improve web accessibility for all users.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border shadow-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=diverse%20team%20working%20on%20accessibility%20project"
                alt="Our team working on accessibility solutions"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Accessibility Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">1B+</span>
                </div>
                <h3 className="text-xl font-bold mb-2">People with Disabilities</h3>
                <p className="text-muted-foreground">
                  Over 1 billion people worldwide have some form of disability that can affect how they use the web.
                </p>
              </div>
              <div className="bg-background rounded-xl border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">98%</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Websites Have Issues</h3>
                <p className="text-muted-foreground">
                  According to WebAIM, 98% of home pages have detectable WCAG 2 failures.
                </p>
              </div>
              <div className="bg-background rounded-xl border p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <span className="text-xl font-bold">$10T</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Market Opportunity</h3>
                <p className="text-muted-foreground">
                  People with disabilities and their families control over $10 trillion in annual disposable income.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Help us create a more inclusive web by making your website accessible to everyone.
            </p>
            <Button size="lg" asChild>
              <Link href="/analyze">Analyze Your Website</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
