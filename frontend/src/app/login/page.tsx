import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full gap-10 min-h-screen lg:grid lg:grid-cols-2 lg:gap-0">
      <div className="relative flex flex-col bg-[#18181B] p-8">
        <div className="mb-auto">
          <Image
            src="https://dummyimage.com/720x400"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col items-start justify-end space-y-8">
          <div className="flex w-full flex-col items-start space-y-8">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <blockquote className="text-xl font-medium leading-relaxed text-white">
              &quot;Shadcn UI Kit for Figma has completely transformed our
              design process. It&apos;s incredibly intuitive and saves us so
              much time. The components are beautifully crafted and
              customizable.&quot;
            </blockquote>
            <div className="space-y-1">
              <div className="text-base font-medium text-white">
                Sarah Thompson
              </div>
              <div className="text-sm text-zinc-400">
                Lead UX Designer at BrightWave Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
            <p className="text-zinc-500">
              Log in to unlock tailored content and stay connected with your
              community.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-center gap-2 border-zinc-200 bg-white py-6 text-base shadow-none transition-colors hover:bg-zinc-50"
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
            Sign in with Google
          </Button>
          <div className="text-sm text-zinc-500">
            Join thousands of smart shoppers saving money effortlessly with
            price tracking and notifications
          </div>
        </div>
      </div>
    </div>
  );
}
