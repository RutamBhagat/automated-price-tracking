import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { InView } from "@/components/ui/in-view";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Page() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative flex flex-col bg-[#18181B] p-12">
        <div className="mb-12">
          <Image
            src="/logo.png" // Replace with your actual logo
            alt="Price Track Logo"
            width={120}
            height={40}
            className="rounded-lg"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[450px] flex-grow flex-col items-start justify-center space-y-10">
          <div className="flex w-full flex-col items-start space-y-8">
            <InView
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src="/avatar-sarah.jpg" // Replace with a real user photo or avatar
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="rounded-full ring-2 ring-zinc-700"
                />
                <div className="space-y-1">
                  <div className="text-base font-medium text-white">
                    Sarah M.
                  </div>
                  <div className="text-sm text-zinc-400">Verified Buyer</div>
                </div>
              </div>
              <blockquote className="text-2xl font-medium leading-relaxed text-white">
                <TextEffect preset="fade-in-blur" per="word" as="span">
                  This app makes saving money effortless! I never miss a deal on
                  my favorite items anymore. Saved over $200 last month!
                </TextEffect>
              </blockquote>
            </InView>
          </div>
          <div className="w-full border-t border-zinc-800 pt-8">
            <TextShimmer
              duration={3}
              spread={3}
              as="div"
              className="text-zinc-400"
            >
              Join over 10,000 smart shoppers already saving money
            </TextShimmer>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-zinc-50 p-8">
        <div className="mx-auto w-full max-w-[400px] space-y-8">
          <div className="space-y-3 text-center">
            <TextEffect
              preset="fade"
              per="word"
              as="h1"
              className="text-3xl font-bold tracking-tight"
            >
              Sign in to start saving!
            </TextEffect>
            <p className="text-lg text-zinc-600">
              Get notified about the best price drops for your favorite items
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-center gap-3 border-zinc-300 bg-white py-6 text-base font-medium shadow-sm transition-all duration-200 hover:bg-zinc-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>

          <div className="text-center">
            <p className="text-sm text-zinc-600">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="font-medium text-blue-600 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="font-medium text-blue-600 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
