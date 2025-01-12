import Link from "next/link";
import { InView } from "@/components/ui/in-view";
import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Footer() {
  return (
    <footer id="Footer" className="bg-slate-950 pb-6 pt-48 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 space-y-6 md:col-span-2">
            <InView
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextEffect as="h3" preset="fade" className="text-3xl font-bold">
                PriceTracker
              </TextEffect>
              <TextShimmer className="mt-4 max-w-md text-lg text-slate-400">
                Stay updated on price drops for your favorite products with our
                automated tracking system.
              </TextShimmer>
            </InView>
          </div>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4">
              <TextEffect as="h4" className="text-xl font-semibold">
                Quick Links
              </TextEffect>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#Features"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#HowItWorks"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#Demo"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    Try the App
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    GitHub Repo
                  </a>
                </li>
              </ul>
            </div>
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <TextEffect as="h4" className="text-xl font-semibold">
                Contact
              </TextEffect>
              <ul className="space-y-3 text-slate-400">
                <li className="text-slate-400">rutambhagat@gmail.com</li>
                <li className="text-slate-400">Documentation</li>
                <li className="text-slate-400">Privacy Policy</li>
                <li className="text-slate-400">Terms of Service</li>
              </ul>
            </div>
          </InView>
        </div>

        <InView
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="select-none bg-gradient-to-b from-slate-700 to-slate-900 bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl lg:text-[10rem]">
            PriceTracker
          </h1>
        </InView>
      </div>
    </footer>
  );
}
