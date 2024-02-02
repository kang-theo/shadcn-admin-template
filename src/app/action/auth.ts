"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInWithGithubAction(formData: FormData) {
  await signIn("github", {
    redirectTo: "/dashboard",
  });
}
