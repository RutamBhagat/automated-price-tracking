"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What products can I track?",
    answer:
      "You can track products from major e-commerce platforms including Amazon, Flipkart, and other popular online retailers. Our system supports tracking of most consumer products available on these platforms.",
  },
  {
    question: "How do email notifications work?",
    answer:
      "Once you set a target price for a product, our system monitors the price continuously. When the price drops below your target, you'll receive an instant email notification with the current price and a direct link to the product.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, your data is completely secure. We only store essential information needed for price tracking and notifications. We don't share your data with third parties or use it for any other purpose.",
  },
  {
    question: "How often are prices checked?",
    answer:
      "We check prices multiple times daily. You can customize the frequency of price checks to hourly, daily, or weekly based on your preferences and urgency.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="FAQ" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fadeIn mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-neutral-900">
            Have Questions?
          </h2>
          <div className="mx-auto h-1 w-24 bg-blue-600"></div>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="animate-fadeInUp rounded-lg bg-neutral-50 p-6 transition-shadow hover:shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <button
                className="flex w-full items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-xl font-semibold text-neutral-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 transform text-blue-600 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="animate-fadeIn mt-4 text-neutral-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
