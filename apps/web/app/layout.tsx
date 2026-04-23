import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { OfflineSyncIndicator } from "@/components/shared/OfflineSyncIndicator";
import { CookieConsent } from "@/components/compliance/CookieConsent";
import { RateLimitBanner } from "@/components/shared/RateLimitBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super-E Platform",
  description: "Next-generation commerce platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const slug = headersList.get("x-tenant-slug");
  
  // Create a placeholder store if there's a slug, 
  // until actual DB fetch logic is implemented.
  const initialStore = slug ? {
    id: "temp-id",
    name: "My Awesome Store",
    slug,
    theme: {
      primary: "oklch(0.6 0.15 250)",
      radius: "0.5rem",
      font: "sans"
    }
  } : null;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers initialStore={initialStore}>
          <RateLimitBanner />
          <RouteProgress />
          <OfflineSyncIndicator />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
