import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface RetryRequest {
  id: string;
  url: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body: unknown;
  label: string; // Human-readable description
  createdAt: number;
  retries: number;
}

interface OfflineQueueState {
  queue: RetryRequest[];
  isOnline: boolean;
  setOnline: (online: boolean) => void;
  enqueue: (request: Omit<RetryRequest, "id" | "createdAt" | "retries">) => void;
  dequeue: (id: string) => void;
  clearQueue: () => void;
  incrementRetries: (id: string) => void;
}

export const useOfflineQueueStore = create<OfflineQueueState>()(
  persist(
    (set, get) => ({
      queue: [],
      isOnline: true,
      setOnline: (online) => set({ isOnline: online }),
      enqueue: (request) =>
        set((state) => ({
          queue: [
            ...state.queue,
            {
              ...request,
              id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              createdAt: Date.now(),
              retries: 0,
            },
          ],
        })),
      dequeue: (id) =>
        set((state) => ({ queue: state.queue.filter((r) => r.id !== id) })),
      clearQueue: () => set({ queue: [] }),
      incrementRetries: (id) =>
        set((state) => ({
          queue: state.queue.map((r) =>
            r.id === id ? { ...r, retries: r.retries + 1 } : r
          ),
        })),
    }),
    {
      name: "super-e-offline-queue",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
