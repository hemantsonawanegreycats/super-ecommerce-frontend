"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { OtpInput } from "@/features/auth/components/OtpInput";
import { Button } from "@/components/ui/button";
import { setup2Fa, verify2Fa } from "@/features/auth/actions";

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await setup2Fa("mock-user-id");
      if (data.success) {
        setSecret(data.secret || null);
        setQrUrl(data.qrCodeUrl || null);
      }
    }
    load();
  }, []);

  const verify = async () => {
    if (code.length < 6) return;
    setVerifying(true);
    const result = await verify2Fa("mock-user-id", code);
    setVerifying(false);
    
    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Two-factor authentication enabled", {
      description: "Save your backup codes in a safe place.",
    });
    router.push("/account/security");
  };

  const copySecret = async () => {
    if (secret) {
      await navigator.clipboard.writeText(secret);
      toast.success("Secret copied");
    }
  };

  return (
    <AuthCard
      title="Enable two-factor auth"
      description="Scan the QR code with your authenticator app, then enter the 6-digit code to confirm."
    >
      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col items-center gap-3 min-h-[220px]">
        {qrUrl ? (
          <img src={qrUrl} alt="2FA QR Code" width={150} height={150} className="bg-white p-2 rounded" />
        ) : (
          <div className="h-[150px] w-[150px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">Scan with Google Authenticator, Authy, or 1Password</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium">Or enter the code manually:</p>
        <button
          type="button"
          onClick={copySecret}
          disabled={!secret}
          className="w-full flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm font-mono hover:bg-muted/60 transition-colors disabled:opacity-50"
        >
          <span>{secret || "Loading..."}</span>
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Enter the 6-digit code from your app</p>
        <OtpInput value={code} onChange={setCode} disabled={verifying} />
      </div>

      <Button onClick={verify} disabled={code.length < 6 || verifying} className="w-full h-11 gap-2">
        {verifying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <ShieldCheck className="h-4 w-4" />
            Enable 2FA
          </>
        )}
      </Button>

      <Link
        href="/account/security"
        className="text-center text-sm text-muted-foreground hover:text-foreground block"
      >
        Skip for now
      </Link>
    </AuthCard>
  );
}
