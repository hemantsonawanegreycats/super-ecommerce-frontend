"use client";

import { useEffect } from "react";
import { useOfflineQueueStore } from "@/lib/stores/offline-queue.store";
import { toast } from "sonner";

export function OfflineQueueProcessor() {
  const { queue, isOnline, setOnline, dequeue, incrementRetries } = useOfflineQueueStore();

  // Detect online/offline transitions
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      toast.success("Back online! Retrying pending requests...");
    };
    const handleOffline = () => {
      setOnline(false);
      toast.warning("You're offline. Changes will sync when you reconnect.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnline]);

  // Flush queue when back online
  useEffect(() => {
    if (!isOnline || queue.length === 0) return;

    const flush = async () => {
      for (const request of queue) {
        if (request.retries >= 3) {
          dequeue(request.id);
          toast.error(`Failed to sync "${request.label}" after 3 attempts.`);
          continue;
        }

        try {
          await fetch(request.url, {
            method: request.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body),
          });
          dequeue(request.id);
          toast.success(`Synced: ${request.label}`);
        } catch {
          incrementRetries(request.id);
        }
      }
    };

    flush();
  }, [isOnline, queue, dequeue, incrementRetries]);

  // This component renders nothing — it's a background processor
  return null;
}
