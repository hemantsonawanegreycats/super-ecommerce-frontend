"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function AutoBreadcrumb() {
  const pathname = usePathname();
  
  if (pathname === "/") return null;
  
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {formattedSegment}
                </span>
              ) : (
                <Link href={href} className="hover:text-foreground transition-colors">
                  {formattedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
