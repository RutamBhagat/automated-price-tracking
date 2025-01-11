import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section id="CallToAction" className="bg-neutral-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0L100 100M100 0L0 100"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div className="relative px-6 py-16 sm:px-12 lg:px-20">
            <div className="animate-fadeIn mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Ready to Save Money on Your Favorite Products?
              </h2>

              <p className="mb-10 text-xl text-blue-100">
                Join the savvy shoppers already using this app to get the best
                deals.
              </p>

              <div className="space-y-6">
                <Button
                  size="lg"
                  className="animate-pulse bg-white text-blue-600 hover:bg-blue-50"
                >
                  Start Tracking Now – It&apos;s Free!
                </Button>

                <div className="flex items-center justify-center gap-2 text-blue-100">
                  <Clock className="h-5 w-5" />
                  <p className="text-sm">
                    No sign-up required. Start tracking in less than 5 minutes.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { value: "1000+", label: "Active Users" },
                  { value: "50K+", label: "Products Tracked" },
                  { value: "₹2M+", label: "Money Saved" },
                  { value: "99%", label: "Happy Users" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
