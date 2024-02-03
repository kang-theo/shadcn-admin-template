"use client";

import React, { useCallback, useState, useRef } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { signInWithGithubAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useAuthToast } from "@/hooks/useUtilsToast";

// put components associated with DOM in components directory, put functions related to logic in hooks directory
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signing, setSigning] = useState(false);
  const githubSSORef = useRef(null);
  const { type } = props;
  const router = useRouter();
  const { showAuthToast } = useAuthToast();

  async function onSubmit(event: React.SyntheticEvent) {
    // const onSubmit = async (event: React.SyntheticEvent) => {
    setIsLoading(true);

    // use original form submit
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    // currently, next-auth.js has no signUp function
    if (type === "signup") {
      const passwordVal = form.get("password");
      const passwordConfirmationVal = form.get("passwordConfirmation");
      if (passwordVal !== passwordConfirmationVal) {
        showAuthToast({
          title: "Password mismatch",
          description: "Please check your input and try again.",
        });
        setIsLoading(false);

        return null;
      }

      // send to api server for register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // send in JSON string
        body: JSON.stringify({
          // csrfToken: form.get("csrfToken"),
          username: form.get("username"),
          email: form.get("email"),
          password: passwordVal,
          passwordConfirmation: passwordConfirmationVal,
        }),
      });

      try {
        const data: any = await res.json();

        if (res.ok) {
          const metaData = data.meta;

          if (metaData.code !== "OK") {
            // Handle the error, e.g., show an error message to the user
            showAuthToast({
              title: "Server Error",
              description:
                metaData.message ||
                "An unexpected error occurred on the server. Please try again later or contact support for assistance.",
            });
          }
          else {
            router.push('/auth/login');
          }
        } else {
          // Handle HTTP error status (e.g., res.status is not 2xx)
          // Corner case, edge case
          // Event or User Behavior Tracking (埋点): RPC(Remote Procedure Call) submit logs to server for analysis in case of server down
          // console.error(`HTTP Error: ${res.statusText}`);
          showAuthToast({
            title: "Internet Error",
            description:
              "Please try again later or contact support for assistance.",
          });
        }
      } catch (error) {
        // Handle JSON parsing error
        console.error("Error parsing JSON:", error);
      } finally {
        // Always set loading to false, whether there was an error or not
        setIsLoading(false);
        return null;
      }
    }

    // after register successfully
    // next-auth.js provided signIn function; it sends credentials and next-auth.js will use prisma client to find in mysql
    try {
      const result = await signIn("credentials", {
        username: form.get("username"),
        password: form.get("password"),
        callbackUrl: "/dashboard",
      });

      if (result && result.error) {
        // Handle authentication error
        // alert("Authentication failed: " + result.error);
      } else {
        // Authentication succeeded, result contains session object
        // alert("Authentication successful: " + JSON.stringify(result));
        // Redirect or perform other actions
      }

      // console.log("Authentication successful");
    } catch (err) {
      console.error("Authentication failed", err);
      // alert(err);
      if (err instanceof Error) {
        showAuthToast({
          title: "Sign In Error",
          description: err.message || "Please check your input and try again.",
        });
      } else {
        console.error('An unexpected error occurred.', err);
      }

      setIsLoading(false);
    };
  }

  const handleSigning = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setSigning(true);
    const formEl: HTMLFormElement = githubSSORef.current!;
    formEl.submit();
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* use ajax to call API */}
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          {type === "signup" && (
            <div className='grid gap-1'>
              <Label className='sr-only' htmlFor='email'>
                Email
              </Label>
              <Input
                id='email'
                name='email'
                placeholder='name@example.com'
                type='email'
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect='off'
                disabled={isLoading}
              />
            </div>
          )}

          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              Username
            </Label>
            <Input
              id='username'
              name='username'
              placeholder='username'
              type='input'
              autoCapitalize='none'
              autoComplete='input'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              name='password'
              placeholder='password'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          {type === "signup" && (
            <div className='grid gap-1'>
              <Label className='sr-only' htmlFor='passwordConfirmation'>
                Password Confirmation
              </Label>
              <Input
                name='passwordConfirmation'
                id='passwordConfirmation'
                placeholder='Confirm password'
                type='password'
                autoCapitalize='none'
                autoComplete='password'
                autoCorrect='off'
                disabled={isLoading}
              />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          {type === "signin" ? (
            <p className='text-sm text-center'>
              Don&apos;t have an account?{" "}
              <Link href='/auth/register' className='font-semibold'>
                Sign up
              </Link>
            </p>
          ) : (
            <p className='text-sm text-center'>
              Do you already have an account?{" "}
              <Link href='/auth/login' className='font-semibold'>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or</span>
        </div>
      </div>
      <form ref={githubSSORef} action={signInWithGithubAction}>
        <Button
          className='w-full'
          variant='outline'
          disabled={signing}
          onClick={handleSigning}
        >
          {signing ? (
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Icons.gitHub className='mr-2 h-4 w-4' />
          )}{" "}
          GitHub
        </Button>
      </form>
    </div>
  );
}