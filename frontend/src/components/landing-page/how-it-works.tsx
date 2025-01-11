import { Link, PlusCircle, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Link,
    title: "Add Product URLs",
    description: "Paste the link to the product you want to track.",
  },
  {
    icon: PlusCircle,
    title: "Set Your Target Price",
    description: "Enter the price threshold to get notified.",
  },
  {
    icon: Bell,
    title: "Get Alerts",
    description: "Receive email notifications when the price drops!",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="HowItWorks" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fadeIn mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-neutral-900">
            How It Works in 3 Easy Steps
          </h2>
          <div className="mx-auto h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="relative flex flex-col items-start justify-center gap-8 md:flex-row">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="animate-fadeInUp w-full md:w-[320px]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-[280px] rounded-xl bg-neutral-50 p-8 transition-shadow hover:shadow-xl">
                <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {index + 1}
                </div>
                <div className="mb-6 text-center">
                  <step.icon className="mx-auto h-16 w-16 text-blue-600" />
                </div>
                <h3 className="mb-4 text-center text-xl font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-center text-neutral-600">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
