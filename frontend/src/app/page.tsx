import { AnimatedGradientStats } from "@/components/landing-page/animated-gradient-stats";
import DemoSection from "@/components/landing-page/demo-section";
import FAQSection from "@/components/landing-page/faq-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import { Hero } from "@/components/landing-page/hero-with-group-of-images-text-and-two-buttons";
import HowItWorksSection from "@/components/landing-page/how-it-works";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Hero/>
      <FeaturesSection />
      <DemoSection />
      <HowItWorksSection />
      <AnimatedGradientStats />
      <FAQSection />
      <Footer />
    </main>
  );
}
