"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema, type ResetPasswordInput } from "@/features/auth/validators/auth.schema";
import { requestPasswordReset } from "@/features/auth/actions";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    const result = await requestPasswordReset(data.email) as { success: boolean; message: string; error?: string };
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setEmail(data.email);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard
        title="Check your inbox"
        description={`We've sent a password reset link to ${email}.`}
      >
        <div className="rounded-lg border bg-emerald-500/5 border-emerald-500/20 p-4 flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-700 leading-relaxed">
            The link expires in 30 minutes. If you don&apos;t see the email, check your spam folder.
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
          Use a different email
        </Button>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter the email associated with your account and we'll send you a reset link."
      footer={
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
