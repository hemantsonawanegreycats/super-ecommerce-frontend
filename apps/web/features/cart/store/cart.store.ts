import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  variantId?: string;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  imageUrl: string;
  vendorName?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, variantId?: string) => void;
  updateQuantity: (id: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setOpen: (open) => set({ isOpen: open }),
      addItem: (item, quantity = 1) => {
        const items = [...get().items];
        const existingItem = items.find(
          (i) => i.id === item.id && i.variantId === item.variantId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          set({ items });
        } else {
          set({ items: [...items, { ...item, quantity }] });
        }
      },
      removeItem: (id, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.variantId === variantId)
          ),
        });
      },
      updateQuantity: (id, quantity, variantId) => {
        if (quantity < 1) return;
        const items = get().items.map((i) =>
          i.id === id && i.variantId === variantId ? { ...i, quantity } : i
        );
        set({ items });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      subtotal: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "super-e-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
