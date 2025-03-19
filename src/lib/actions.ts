"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const credentials = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    redirect: false,
  };

  try {
    const result = await signIn("credentials", credentials);

    if (result?.error) {
      console.error("Login failed:", result.error);
      return "Invalid credentials.";
    }

    redirect("/admin");
  } catch (error) {
    console.error("Auth error:", error);
    if (error instanceof AuthError) {
      return error.type === "CredentialsSignin"
        ? "Invalid credentials."
        : "Something went wrong.";
    }
    throw error;
  }
}
