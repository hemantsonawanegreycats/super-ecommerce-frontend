"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { StoreContextProvider, StoreConfig } from "@/lib/tenant/store-context";
import { ThemeInjector } from "@/lib/tenant/theme-injector";
import { CartAnimationProvider } from "@/features/cart/components/CartAnimationProvider";

export function Providers({ 
  children,
  initialStore = null
}: { 
  children: React.ReactNode;
  initialStore?: StoreConfig | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <SessionProvider>
      <StoreContextProvider initialStore={initialStore}>
        <QueryClientProvider client={queryClient}>
          <CartAnimationProvider>
            {children}
          </CartAnimationProvider>
          <ThemeInjector />
          <Toaster richColors position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StoreContextProvider>
    </SessionProvider>
  );
}
