"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#Hero", label: "Home" },
    { href: "#Features", label: "Features" },
    { href: "#Demo", label: "Demo" },
    { href: "#HowItWorks", label: "How It Works" },
    { href: "#FAQ", label: "FAQ" },
  ];

  return (
    <nav className="fixed z-50 w-full bg-neutral-900/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <Flame className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-white">PriceTracker</span>
          </div>
          <div className="hidden md:block">
            <div className="rounded-lg">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-id={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-24 border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="default"
                      className="w-24 bg-neutral-200 text-neutral-900 hover:bg-white"
                    >
                      Try it Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="bg-neutral-900 md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="#Hero"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="#Features"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#Demo"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Demo
            </Link>
            <Link
              href="#HowItWorks"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#FAQ"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              FAQ
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="w-full border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="default"
                  className="w-full bg-neutral-200 text-neutral-900 hover:bg-white"
                >
                  Try it Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
