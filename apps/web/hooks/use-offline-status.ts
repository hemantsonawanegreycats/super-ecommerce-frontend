"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/offline-queue";
import { useLiveQuery } from "dexie-react-hooks";

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(() => 
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  
  // Use Dexie live query to track pending requests count
  const pendingCount = useLiveQuery(() => db.pendingRequests.count()) ?? 0;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, pendingCount };
}
