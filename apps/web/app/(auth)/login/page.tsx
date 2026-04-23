import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue to your dashboard."
      footer={
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
      </Suspense>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialAuthButtons callbackUrl="/" />

      <p className="text-center text-xs text-muted-foreground pt-2">
        Prefer no password?{" "}
        <Link href="/magic-link" className="font-medium underline-offset-4 hover:underline">
          Send me a magic link
        </Link>
      </p>
    </AuthCard>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
