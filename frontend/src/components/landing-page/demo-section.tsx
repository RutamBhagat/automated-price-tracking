import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart2, Bell } from "lucide-react";
import { Card } from "../ui/card";

export default function DemoSection() {
  return (
    <section id="Demo" className="bg-neutral-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fadeIn mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            See It in Action!
          </h2>
          <div className="mx-auto h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="animate-fadeInUp relative mb-12 rounded-xl bg-neutral-800 p-4 shadow-2xl">
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-neutral-700">
              <div className="p-8 text-center">
                <svg
                  className="mx-auto mb-4 h-20 w-20 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg text-neutral-400">Demo Video</p>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: PlusCircle,
                title: "Add Products",
                description: "Quick and easy product tracking setup",
              },
              {
                icon: BarChart2,
                title: "View Charts",
                description: "Interactive price history visualization",
              },
              {
                icon: Bell,
                title: "Get Alerts",
                description: "Instant price drop notifications",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="animate-fadeInUp h-full text-center text-white"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-full rounded-xl bg-neutral-800 p-6 transition-colors hover:bg-neutral-700">
                  <feature.icon className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div
            className="animate-fadeInUp text-center"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Start Tracking Prices Today!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
