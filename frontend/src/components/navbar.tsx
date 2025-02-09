"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LogIn,
  LogOut,
  Home,
  BarChart,
  LayoutDashboard,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const { status } = useSession();
  // Remove isMobileMenuOpen state as Sheet handles this internally

  const navItems = [
    { href: "/#Hero", label: "Home" },
    { href: "/#Stats", label: "Stats" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="fixed z-50 w-full bg-slate-950 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">
              🔥 PriceTracker
            </span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
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
              <div className="ml-4">
                {status === "authenticated" ? (
                  <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 hover:text-slate-950"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 hover:text-slate-950"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="max-h-[100dvh] min-h-[100dvh] w-72 border-slate-800 bg-slate-900 p-0"
              >
                <div className="flex h-full flex-col">
                  <SheetHeader className="border-b border-slate-800 p-6">
                    <SheetTitle className="text-xl font-bold text-white">
                      🔥 PriceTracker
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex-1 overflow-y-auto px-2 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-colors hover:bg-slate-800 hover:text-white"
                      >
                        {item.href.includes("Hero") && (
                          <Home className="h-5 w-5" />
                        )}
                        {item.href.includes("Stats") && (
                          <BarChart className="h-5 w-5" />
                        )}
                        {item.href.includes("dashboard") && (
                          <LayoutDashboard className="h-5 w-5" />
                        )}
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t border-slate-800 p-4">
                    {status === "authenticated" ? (
                      <Button
                        onClick={() => signOut()}
                        className="w-full bg-white text-slate-900 transition-colors hover:bg-slate-200"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign out
                      </Button>
                    ) : (
                      <Link href="/auth/signin" className="block w-full">
                        <Button className="w-full bg-white text-slate-900 transition-colors hover:bg-slate-200">
                          <LogIn className="mr-2 h-5 w-5" />
                          Sign in
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
