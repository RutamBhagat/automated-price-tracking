"use client"
import { Toaster } from './ui/sonner';

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
