import { AnimatedGradientStats } from "@/components/landing-page/animated-gradient-stats";
import DemoSection from "@/components/landing-page/demo-section";
import FAQSection from "@/components/landing-page/faq-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import { HeroWithImages } from "@/components/landing-page/hero-with-images";
import { HeroWithLamp } from "@/components/landing-page/hero-with-lamp";
import HowItWorksSection from "@/components/landing-page/how-it-works";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroWithLamp/>
      <HeroWithImages/>
      <FeaturesSection />
      <DemoSection />
      <HowItWorksSection />
      <AnimatedGradientStats />
      <FAQSection />
      <Footer />
    </main>
  );
}
