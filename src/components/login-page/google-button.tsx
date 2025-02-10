'use client';

import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full justify-center gap-3 border-zinc-300 bg-white py-5 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-zinc-50 sm:py-6 sm:text-base"
      onClick={() => {
        void signIn('google', {
          callbackUrl: '/dashboard'
        });
      }}
    >
      <Image
        src="/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="h-5 w-5"
      />
      Continue with Google
    </Button>
  );
}
