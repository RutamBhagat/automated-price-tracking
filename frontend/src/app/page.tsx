import CallToActionSection from "@/components/landing-page/call-to-action";
import DemoSection from "@/components/landing-page/demo-section";
import FAQSection from "@/components/landing-page/faq-section";
import FeaturesSection from "@/components/landing-page/features-section";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import HowItWorksSection from "@/components/landing-page/how-it-works";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <HowItWorksSection />
      <CallToActionSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
