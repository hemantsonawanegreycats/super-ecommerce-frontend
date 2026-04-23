"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema, type ResetPasswordInput } from "@/features/auth/validators/auth.schema";

export default function MagicLinkPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    await new Promise((r) => setTimeout(r, 800));
    setEmail(data.email);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthCard
        title="Magic link sent"
        description={`Click the link we just sent to ${email} to sign in. The link expires in 15 minutes.`}
      >
        <div className="flex justify-center text-primary py-2">
          <div className="rounded-full bg-primary/10 p-4">
            <Mail className="h-8 w-8" />
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
      title="Sign in with a magic link"
      description="We'll email you a one-tap link to sign in. No password needed."
      footer={
        <Link href="/login" className="flex items-center justify-center gap-2 hover:text-foreground">
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
        <Button type="submit" className="w-full h-11 gap-2" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              Email me a magic link
            </>
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
