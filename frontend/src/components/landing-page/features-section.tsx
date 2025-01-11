import { Search, BarChart2, Mail, Layout, Zap } from "lucide-react";
import { Card } from "../ui/card";

const features = [
  {
    icon: Search,
    title: "Track Multiple Products",
    description:
      "Monitor prices from different e-commerce websites simultaneously with ease.",
  },
  {
    icon: BarChart2,
    title: "Interactive Price History Charts",
    description:
      "Analyze price trends over time with interactive and intuitive charts.",
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description:
      "Get notified when prices drop below your threshold instantly.",
  },
  {
    icon: Layout,
    title: "Easy-to-Use Interface",
    description: "Manage tracked products effortlessly with our sleek design.",
  },
  {
    icon: Zap,
    title: "Automated Price Checking",
    description: "Run hourly, daily, or weekly checks automatically.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="Features" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fadeIn mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-neutral-900">
            Why Choose Automated Price Tracking?
          </h2>
          <div className="mx-auto h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="animate-fadeInUp rounded-xl bg-neutral-50 p-6 transition-shadow duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-center text-neutral-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
