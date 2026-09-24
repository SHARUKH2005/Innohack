import { AuthCard } from "@/components/auth/auth-card";

export default function SignInPage() {
  return <AuthCard initialMode="login" redirectUrl="/dashboard" />;
}