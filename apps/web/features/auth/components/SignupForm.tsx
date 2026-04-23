"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Store, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { signupSchema, type SignupInput } from "@/features/auth/validators/auth.schema";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
  });

  const role = form.watch("role");
  const password = form.watch("password");

  const onSubmit = async (data: SignupInput) => {
    // Simulated signup -> goes to OTP verification
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Account created", {
      description: "Check your email for a 6-digit verification code.",
    });
    router.push(`/otp?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="text-sm">I am signing up as</Label>
        <RadioGroup
          value={role}
          onValueChange={(v) => form.setValue("role", v as "CUSTOMER" | "VENDOR")}
          className="grid grid-cols-2 gap-3 mt-2"
        >
          <RoleCard value="CUSTOMER" current={role} icon={<User className="h-5 w-5" />} title="Customer" subtitle="Shop the marketplace" />
          <RoleCard value="VENDOR" current={role} icon={<Store className="h-5 w-5" />} title="Vendor" subtitle="Sell on the platform" />
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" autoComplete="given-name" {...form.register("firstName")} />
          {form.formState.errors.firstName && (
            <p className="text-xs text-destructive">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" autoComplete="family-name" {...form.register("lastName")} />
          {form.formState.errors.lastName && (
            <p className="text-xs text-destructive">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...form.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
        )}
        <PasswordStrengthMeter password={password} />
      </div>

      <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
        By creating an account you agree to our{" "}
        <a href="/legal/terms" className="underline hover:text-foreground">Terms</a> and{" "}
        <a href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
      </p>
    </form>
  );
}

function RoleCard({
  value,
  current,
  icon,
  title,
  subtitle,
}: {
  value: string;
  current: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const selected = current === value;
  return (
    <Label
      htmlFor={`role-${value}`}
      className={cn(
        "relative flex cursor-pointer flex-col items-start gap-1 rounded-lg border p-3 transition-colors",
        selected ? "border-primary bg-primary/5" : "border-input hover:bg-muted/50"
      )}
    >
      <RadioGroupItem value={value} id={`role-${value}`} className="sr-only" />
      <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{subtitle}</div>
      </div>
    </Label>
  );
}
