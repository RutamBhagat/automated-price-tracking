import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { TextEffect } from "@/components/ui/text-effect";

export default function HeroSection() {
  return (
    <section
      id="Hero"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="animate-float absolute left-10 top-10 h-20 w-20 rounded-full bg-blue-500"></div>
        <div className="animate-float-delayed absolute right-20 top-40 h-16 w-16 rounded-full bg-teal-500"></div>
        <div className="animate-float-slow absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-orange-500"></div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 sm:px-6 lg:flex-row">
        <InView
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 space-y-12 text-center lg:text-left">
            <TextEffect
              as="h1"
              preset="fade-in-blur"
              className="text-5xl max-w-2xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Get Price Drop Alerts in Real-Time!
            </TextEffect>
            <p className="text-lg text-gray-300 md:text-xl">
              Track prices across multiple e-commerce sites, analyze trends, and
              never miss a deal again.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="z-10 h-16 bg-blue-600 text-lg text-white hover:bg-blue-700"
            >
              Try it Now – It&apos;s Free!
            </Button>
            <Button
              size="lg"
              className="z-10 h-16 bg-gray-600 text-lg text-white hover:bg-white hover:text-blue-600"
            >
              Try it Now – It&apos;s Free!
            </Button>
          </div>
        </InView>

        <div className="flex-1">
          <InView
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative transform rounded-xl bg-neutral-800/50 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              {/* existing demo preview */}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
