import Link from "next/link";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Join the marketplace as a customer or vendor."
      footer={
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialAuthButtons callbackUrl="/" />
    </AuthCard>
  );
}
