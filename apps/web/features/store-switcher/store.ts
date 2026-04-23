import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VendorStore } from "./types";
import { MOCK_VENDOR_STORES } from "./mock-data";

interface MultiStoreState {
  availableStores: VendorStore[];
  activeStoreId: string | null;
  setActiveStore: (id: string) => void;
  getActiveStore: () => VendorStore | null;
}

export const useMultiStore = create<MultiStoreState>()(
  persist(
    (set, get) => ({
      availableStores: MOCK_VENDOR_STORES,
      activeStoreId: MOCK_VENDOR_STORES.length > 0 ? MOCK_VENDOR_STORES[0].id : null,
      
      setActiveStore: (id) => set({ activeStoreId: id }),
      
      getActiveStore: () => {
        const { availableStores, activeStoreId } = get();
        if (!activeStoreId) return null;
        return availableStores.find(s => s.id === activeStoreId) ?? null;
      },
    }),
    { name: "super-e-multistore" }
  )
);
