"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled,
  autoFocus = true,
  className,
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const setDigit = (index: number, digit: string) => {
    const cleaned = digit.replace(/\D/g, "").slice(0, 1);
    const arr = value.padEnd(length, " ").split("");
    arr[index] = cleaned || " ";
    onChange(arr.join("").trimEnd());
  };

  const handleChange = (index: number, raw: string) => {
    if (raw.length > 1) {
      // Likely a paste event into a single field
      const pasted = raw.replace(/\D/g, "").slice(0, length);
      onChange(pasted);
      const next = Math.min(pasted.length, length - 1);
      refs.current[next]?.focus();
      return;
    }
    setDigit(index, raw);
    if (raw && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    const next = Math.min(pasted.length, length - 1);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-12 rounded-md border border-input bg-background text-center text-lg font-semibold shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}
