import Dexie, { Table } from "dexie";

export interface PendingRequest {
  id?: number;
  url: string;
  method: string;
  body: any;
  headers: Record<string, string>;
  timestamp: number;
  retries: number;
  category: "order" | "upload" | "sync";
}

export class OfflineDatabase extends Dexie {
  pendingRequests!: Table<PendingRequest>;

  constructor() {
    super("SuperE_Offline_DB");
    this.version(1).stores({
      pendingRequests: "++id, category, timestamp",
    });
  }
}

export const db = new OfflineDatabase();

export async function queueRequest(request: Omit<PendingRequest, "id" | "timestamp" | "retries">) {
  return await db.pendingRequests.add({
    ...request,
    timestamp: Date.now(),
    retries: 0,
  });
}

export async function processQueue() {
  const requests = await db.pendingRequests.toArray();
  
  if (requests.length === 0) return;

  console.log(`[OfflineQueue] Processing ${requests.length} pending requests...`);

  for (const req of requests) {
    try {
      const response = await fetch(req.url, {
        method: req.method,
        headers: {
          ...req.headers,
          "X-Offline-Sync": "true",
          "X-Sync-Timestamp": req.timestamp.toString(),
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      });

      if (response.ok) {
        await db.pendingRequests.delete(req.id!);
        console.log(`[OfflineQueue] Successfully synced request ${req.id}`);
      } else {
        throw new Error(`Sync failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`[OfflineQueue] Failed to sync request ${req.id}:`, error);
      await db.pendingRequests.update(req.id!, { retries: req.retries + 1 });
    }
  }
}

// Global listener for online status
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    processQueue();
  });
}
