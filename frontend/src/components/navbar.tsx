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
  Menu 
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
    <nav className="fixed z-50 w-full bg-slate-950 border-b border-slate-800 backdrop-blur-sm">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
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
                    className="flex items-center gap-2 text-slate-950 bg-white hover:bg-slate-200 hover:text-slate-950"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-slate-950 bg-white hover:bg-slate-200 hover:text-slate-950"
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
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-72 p-0 min-h-[100dvh] max-h-[100dvh] bg-slate-900 border-slate-800"
              >
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b border-slate-800">
                    <SheetTitle className="text-xl font-bold text-white">
                      🔥 PriceTracker
                    </SheetTitle>
                  </SheetHeader>
                  
                  <nav className="flex-1 px-2 py-4 overflow-y-auto">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        {item.href.includes('Hero') && <Home className="h-5 w-5" />}
                        {item.href.includes('Stats') && <BarChart className="h-5 w-5" />}
                        {item.href.includes('dashboard') && <LayoutDashboard className="h-5 w-5" />}
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="p-4 border-t border-slate-800">
                    {status === "authenticated" ? (
                      <Button
                        onClick={() => signOut()}
                        className="w-full bg-white text-slate-900 hover:bg-slate-200 transition-colors"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign out
                      </Button>
                    ) : (
                      <Link href="/auth/signin" className="w-full block">
                        <Button
                          className="w-full bg-white text-slate-900 hover:bg-slate-200 transition-colors"
                        >
                          <LogIn className="h-5 w-5 mr-2" />
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
