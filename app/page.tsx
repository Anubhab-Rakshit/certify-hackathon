import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LiveDemo } from "@/components/live-demo"
import { FeaturesSection } from "@/components/features-section"
import { MetricsSection } from "@/components/metrics-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <LiveDemo />
      <FeaturesSection />
      <MetricsSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
