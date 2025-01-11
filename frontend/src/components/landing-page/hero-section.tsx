import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      id="Hero"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="animate-float absolute left-10 top-10 h-20 w-20 rounded-full bg-blue-500"></div>
        <div className="animate-float-delayed absolute right-20 top-40 h-16 w-16 rounded-full bg-teal-500"></div>
        <div className="animate-float-slow absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-orange-500"></div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:px-8">
        <div className="animate-fadeInLeft flex-1 text-center lg:text-left">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Save Money Effortlessly – Get Price Drop Alerts in Real-Time!
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            Track prices across multiple e-commerce sites, analyze trends, and
            never miss a deal again.
          </p>
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
        </div>

        <div className="animate-fadeInRight w-full flex-1 lg:w-auto">
          <div className="relative transform rounded-xl bg-neutral-800 p-2 shadow-2xl transition-transform duration-300 hover:scale-105">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-neutral-700">
              <div className="p-8 text-center text-gray-400">
                <svg
                  className="mx-auto mb-4 h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg">App Demo Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
