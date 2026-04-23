"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyOtp, sendOtp } from "@/features/auth/actions";

export default function OtpPage() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <OtpVerify />
    </Suspense>
  );
}

function OtpVerify() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "your email";
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(30);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const verify = async () => {
    if (code.length < 6) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setIsVerifying(true);
    const result = await verifyOtp(email, code);
    setIsVerifying(false);
    
    if (result.error) {
      toast.error(result.error);
      return;
    }
    
    toast.success(result.message);
    router.push("/");
  };

  const resend = async () => {
    setResendIn(30);
    const result = await sendOtp(email);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("New code sent", { description: `Sent to ${email}` });
    }
  };

  return (
    <AuthCard
      title="Verify your email"
      description={`We sent a 6-digit code to ${email}. Enter it below to continue.`}
    >
      <OtpInput value={code} onChange={setCode} disabled={isVerifying} />

      <Button onClick={verify} disabled={code.length < 6 || isVerifying} className="w-full h-11">
        {isVerifying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify and continue"
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {resendIn > 0 ? (
          <span>Resend code in {resendIn}s</span>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="text-primary font-medium hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </AuthCard>
  );
}
