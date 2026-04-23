"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { Button } from "@/components/ui/button";
import { verify2Fa } from "@/features/auth/actions";

export default function TwoFactorVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  const verify = async () => {
    if (code.length < 6) return;
    setVerifying(true);
    const result = await verify2Fa("mock-user-id", code);
    setVerifying(false);
    
    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Signed in");
    router.push("/");
  };

  return (
    <AuthCard
      title="Two-factor authentication"
      description={
        useBackup
          ? "Enter one of your single-use backup codes."
          : "Enter the 6-digit code from your authenticator app."
      }
    >
      <div className="flex justify-center text-primary">
        <div className="rounded-full bg-primary/10 p-4">
          <ShieldCheck className="h-8 w-8" />
        </div>
      </div>

      <OtpInput value={code} onChange={setCode} disabled={verifying} />

      <Button onClick={verify} disabled={code.length < 6 || verifying} className="w-full h-11">
        {verifying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => {
            setUseBackup((b) => !b);
            setCode("");
          }}
          className="text-primary font-medium hover:underline"
        >
          {useBackup ? "Use authenticator app instead" : "Use a backup code"}
        </button>
      </div>

      <Link href="/login" className="block text-center text-xs text-muted-foreground hover:text-foreground">
        Sign in with a different account
      </Link>
    </AuthCard>
  );
}
