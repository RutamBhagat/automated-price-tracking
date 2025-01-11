import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="Footer" className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">PriceTracker</h3>
            <p className="mb-6 max-w-md text-neutral-400">
              Stay updated on price drops for your favorite products with our
              automated tracking system.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 transition-colors hover:text-white"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
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
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="text-neutral-400">support@pricetracker.com</li>
              <li className="text-neutral-400">Documentation</li>
              <li className="text-neutral-400">Privacy Policy</li>
              <li className="text-neutral-400">Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
          <p className="text-neutral-400">
            Built with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="#"
              className="text-blue-400 transition-colors hover:text-blue-300"
            >
              Your Name
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
