"use server";

import { signIn } from "@/auth";

async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export { signInWithGitHub };
