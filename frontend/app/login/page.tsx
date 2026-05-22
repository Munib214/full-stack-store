import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In — Storefront",
  description: "Sign in to your Storefront account or create a new one.",
};

export default function LoginPage() {
  return <AuthForm />;
}
