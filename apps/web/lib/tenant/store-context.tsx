"use client";

import React, { createContext, useContext, useState } from "react";

export interface StoreConfig {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  theme: {
    primary: string;
    radius: string;
    font: string;
  };
}

interface StoreContextValue {
  store: StoreConfig | null;
  setStore: (store: StoreConfig) => void;
  isLoading: boolean;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreContextProvider({ 
  children, 
  initialStore = null 
}: { 
  children: React.ReactNode;
  initialStore?: StoreConfig | null;
}) {
  const [store, setStore] = useState<StoreConfig | null>(initialStore);
  const [isLoading] = useState(false);

  return (
    <StoreContext.Provider value={{ store, setStore, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}
