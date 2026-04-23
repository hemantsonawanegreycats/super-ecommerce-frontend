"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SocialAuthButtonsProps {
  callbackUrl?: string;
  disabled?: boolean;
}

export function SocialAuthButtons({ callbackUrl = "/", disabled }: SocialAuthButtonsProps) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 gap-3 font-medium"
        disabled={disabled}
        onClick={() => signIn("google", { callbackUrl })}
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full h-11 gap-3 font-medium"
        disabled
      >
        <AppleIcon className="h-4 w-4" />
        Continue with Apple
      </Button>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.365 1.43c0 1.14-.467 2.235-1.213 3.014-.834.86-2.183 1.519-3.385 1.402-.13-1.2.4-2.46 1.18-3.273.873-.913 2.376-1.564 3.418-1.143zM21 17.288c-.43 1.001-.642 1.444-1.187 2.327-.762 1.232-1.836 2.769-3.165 2.78-1.18.01-1.484-.768-3.087-.76-1.602.01-1.937.775-3.118.764-1.327-.012-2.345-1.398-3.105-2.63C5.21 15.61 5.04 11.247 6.36 8.96c.937-1.625 2.418-2.575 3.81-2.575 1.418 0 2.31.776 3.483.776 1.137 0 1.829-.776 3.47-.776 1.24 0 2.555.676 3.494 1.844-3.07 1.683-2.572 6.062.383 7.06z" />
    </svg>
  );
}
