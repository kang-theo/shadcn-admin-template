"use client";

import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ToastActionProps {
  altText: string;
  children: React.ReactNode;
}

interface AuthToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "default" | "destructive";
  title: string;
  description: string;
  action?: ToastActionProps;
}

export function useAuthToast() {
  const { toast } = useToast();

  return {
    showAuthToast: ({
      type = "destructive",
      title,
      description,
      action = {
        altText: "Alt Text",
        children: "Try again",
      },
    }: AuthToastProps) =>
      toast({
        variant: type,
        title: title,
        description: description,
        action: (
          <ToastAction altText={action.altText}>{action.children}</ToastAction>
        ),
        /* position: shadcn/ui is moving to Sonner as the default toast soon and this has support for position.
                     Refer to https://github.com/shadcn-ui/ui/pull/552 */
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      }),
  };
}
