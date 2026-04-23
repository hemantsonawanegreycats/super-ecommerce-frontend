"use client";

import { useEffect, useRef } from "react";

interface InfiniteScrollSentinelProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

/**
 * InfiniteScrollSentinel — places an invisible div at the bottom.
 * When it enters the viewport via IntersectionObserver, triggers onLoadMore.
 */
export function InfiniteScrollSentinel({ onLoadMore, hasMore, isLoading }: InfiniteScrollSentinelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex items-center justify-center py-8">
      {isLoading && (
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
