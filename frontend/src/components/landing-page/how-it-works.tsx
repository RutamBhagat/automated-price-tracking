import { Link, PlusCircle, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InView } from "@/components/ui/in-view";
import { TextEffect } from "@/components/ui/text-effect";

const steps = [
  {
    icon: Link,
    title: "Add Product URLs",
    description: "Paste the link to the product you want to track.",
  },
  {
    icon: PlusCircle,
    title: "Set Your Target Price",
    description: "Enter your desired price and we'll notify you when it drops below that threshold.",
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
        <InView>
          <div className="mb-16 text-center">
            <TextEffect
              as="h2"
              preset="fade-in-blur"
              className="mb-4 text-4xl font-bold text-neutral-900"
            >
              How It Works in 3 Easy Steps
            </TextEffect>
            <div className="mx-auto h-1 w-24 bg-blue-600"></div>
          </div>
        </InView>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <InView
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="relative overflow-hidden">
                <div className="relative rounded-xl bg-neutral-50 p-8 transition-shadow hover:shadow-xl">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-br-xl bg-blue-600 text-xl font-bold text-white">
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
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
