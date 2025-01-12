import { AnimatedGradientStats } from "@/components/landing-page/animated-gradient-stats";
import Footer from "@/components/landing-page/footer";
import { HeroWithImages } from "@/components/landing-page/hero-with-images";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroWithImages/>
      <AnimatedGradientStats />
      <Footer />
    </main>
  );
}
