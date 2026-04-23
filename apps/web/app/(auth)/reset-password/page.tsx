"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { PasswordStrengthMeter } from "@/features/auth/components/PasswordStrengthMeter";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/features/auth/actions";

const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

type NewPasswordInput = z.infer<typeof newPasswordSchema>;

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirm: "" },
  });
  const password = form.watch("password");

  if (!token) {
    return (
      <AuthCard
        title="Invalid or expired link"
        description="Reset links expire after 30 minutes. Request a new one to continue."
      >
        <Link href="/forgot-password" className={cn(buttonVariants({ size: "lg" }), "w-full h-11")}>
          Request a new link
        </Link>
      </AuthCard>
    );
  }

  if (done) {
    return (
      <AuthCard title="Password updated" description="You can now sign in with your new password.">
        <div className="rounded-lg border bg-emerald-500/5 border-emerald-500/20 p-4 flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-700 leading-relaxed">
            For security, all other sessions have been signed out.
          </div>
        </div>
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "w-full h-11")}>
          Continue to sign in
        </Link>
      </AuthCard>
    );
  }

  const onSubmit = async (data: NewPasswordInput) => {
    const result = await resetPassword(token as string, data.password);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  };

  return (
    <AuthCard title="Set a new password" description="Choose a strong password to secure your account.">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
          <PasswordStrengthMeter password={password} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...form.register("confirm")}
          />
          {form.formState.errors.confirm && (
            <p className="text-xs text-destructive">{form.formState.errors.confirm.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update password"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
