"use client";

import { useFlagStore } from "./store";

interface FlagGateProps {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * FlagGate — render-guard based on feature flag state.
 *
 * Usage:
 *   <FlagGate flag="new_checkout_flow">
 *     <NewCheckout />
 *   </FlagGate>
 */
export function FlagGate({ flag, children, fallback = null }: FlagGateProps) {
  const isEnabled = useFlagStore((s) => s.isEnabled)(flag);
  return isEnabled ? <>{children}</> : <>{fallback}</>;
}
