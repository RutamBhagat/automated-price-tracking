import Link from "next/link";
import { Github } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Footer() {
  return (
    <footer id="Footer" className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <InView
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <TextEffect as="h3" preset="fade" className="mb-4 text-2xl font-bold">
              PriceTracker
            </TextEffect>
            <TextShimmer className="mb-6 max-w-md text-neutral-400">
              Stay updated on price drops for your favorite products with our
              automated tracking system.
            </TextShimmer>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 transition-colors hover:text-white"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.2 }}
          >
            <TextEffect as="h4" className="mb-4 text-lg font-semibold">
              Quick Links
            </TextEffect>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#Features"
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#HowItWorks"
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#Demo"
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  Try the App
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  GitHub Repo
                </a>
              </li>
            </ul>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.3 }}
          >
            <TextEffect as="h4" className="mb-4 text-lg font-semibold">
              Contact
            </TextEffect>
            <ul className="space-y-2">
              <li className="text-neutral-400">rutambhagat@gmail.com</li>
              <li className="text-neutral-400">Documentation</li>
              <li className="text-neutral-400">Privacy Policy</li>
              <li className="text-neutral-400">Terms of Service</li>
            </ul>
          </InView>
        </div>

        <InView
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ delay: 0.4 }}
        >
          <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
            <p className="text-neutral-400">
              Built with <span className="text-red-500">❤️</span> by{" "}
              <a
                href="#"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                Rutam Bhagat
              </a>
            </p>
          </div>
        </InView>
      </div>
    </footer>
  );
}
