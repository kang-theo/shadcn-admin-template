import { Metadata } from "next";
import React from "react";
import TermAndPrivacy from "@/components/common/TermAndPrivacy";

import { UserAuthForm } from "@/components/auth/AuthForm";

// SEO
export const metadata: Metadata = {
  title: "Shadcn admin starter authentication",
  description:
    "Authentication forms built using the shadcn, tailwind, next.js etc.",
};

function Login() {
  return (
    <div className='container h-full flex-col items-center justify-center md:grid lg:max-w-none p-8'>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your username and password below
            </p>
          </div>
          {/* abstract into a component including client-side operations, which is declared by "use client"  */}
          <UserAuthForm type='signin' />
          {/* a dummy component */}
          <TermAndPrivacy />
        </div>
      </div>
    </div>
  );
}

export default Login;
