"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

interface Rule {
  label: string;
  test: (s: string) => boolean;
}

const RULES: Rule[] = [
  { label: "At least 8 characters", test: (s) => s.length >= 8 },
  { label: "One uppercase letter", test: (s) => /[A-Z]/.test(s) },
  { label: "One number", test: (s) => /[0-9]/.test(s) },
  { label: "One symbol", test: (s) => /[^A-Za-z0-9]/.test(s) },
];

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, label, color } = useMemo(() => {
    const passed = RULES.filter((r) => r.test(password)).length;
    const map = [
      { label: "Very weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-emerald-500" },
      { label: "Strong", color: "bg-emerald-600" },
    ];
    return { score: passed, ...map[passed] };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < score ? color : "bg-muted"
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Strength: {label}</span>
      </div>
      <ul className="space-y-1 pt-1">
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.label} className="flex items-center gap-2 text-xs">
              {ok ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span className={ok ? "text-foreground" : "text-muted-foreground"}>
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
