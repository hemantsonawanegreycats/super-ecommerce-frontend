"use client";

import { useContext } from "react";
import { StoreContext } from "./store-context";

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreContextProvider");
  }
  return context;
}
