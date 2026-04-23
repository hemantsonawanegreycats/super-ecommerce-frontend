"use client";

import {
  useRef,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Download,
  Trash2,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: number; // px
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowHeight?: number;
  containerHeight?: number;
  onBulkDelete?: (ids: string[]) => void;
  exportFilename?: string;
}

type SortDir = "asc" | "desc" | null;

function sortData<T>(data: T[], key: string, dir: SortDir): T[] {
  if (!dir || !key) return data;
  return [...data].sort((a, b) => {
    const av = (a as Record<string, unknown>)[key];
    const bv = (b as Record<string, unknown>)[key];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return dir === "asc" ? cmp : -cmp;
  });
}

function exportCSV<T>(columns: DataTableColumn<T>[], data: T[], filename: string) {
  const header = columns.map(c => c.label).join(",");
  const rows = data.map(row =>
    columns.map(c => {
      const val = (row as Record<string, unknown>)[c.key as string];
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    }).join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  rowHeight = 64,
  containerHeight = 500,
  onBulkDelete,
  exportFilename = "export",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => sortData(data, sortKey ?? "", sortDir), [data, sortKey, sortDir]);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: sorted.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
  });

  const toggleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortKey(null); setSortDir(null); }
  };

  const toggleSelect = (id: string) =>
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelectedIds(selectedIds.size === sorted.length ? new Set() : new Set(sorted.map(r => r.id)));

  const allSelected = selectedIds.size === sorted.length && sorted.length > 0;

  const SortIcon = ({ col }: { col: DataTableColumn<T> }) => {
    if (!col.sortable) return null;
    if (sortKey === col.key && sortDir === "asc") return <ChevronUp className="h-3 w-3" />;
    if (sortKey === col.key && sortDir === "desc") return <ChevronDown className="h-3 w-3" />;
    return <ChevronsUpDown className="h-3 w-3 opacity-30" />;
  };

  return (
    <div className="rounded-[2.5rem] border bg-background overflow-hidden shadow-2xl shadow-primary/5">
      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 px-8 py-4 bg-primary/5 border-b border-dashed">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                {selectedIds.size} selected
              </span>
              {onBulkDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => { onBulkDelete([...selectedIds]); setSelectedIds(new Set()); }}
                  className="rounded-full font-black italic uppercase text-[10px] h-8 px-5 gap-1.5 ml-auto"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCSV(columns, sorted.filter(r => selectedIds.has(r.id)), exportFilename)}
                className="rounded-full font-black italic uppercase text-[10px] h-8 px-5 gap-1.5 border-2"
              >
                <Download className="h-3 w-3" /> Export Selection
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center px-8 py-4 border-b bg-muted/10">
        <button onClick={toggleAll} className="mr-4 text-muted-foreground hover:text-primary transition-colors shrink-0">
          {allSelected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
        </button>
        {columns.map(col => (
          <div
            key={String(col.key)}
            className={cn("flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-muted-foreground select-none", col.sortable && "cursor-pointer hover:text-primary transition-colors")}
            style={{ flex: col.width ? `0 0 ${col.width}px` : 1 }}
            onClick={() => col.sortable && toggleSort(String(col.key))}
          >
            {col.label}
            <SortIcon col={col} />
          </div>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => exportCSV(columns, sorted, exportFilename)}
          className="ml-auto rounded-full font-black italic uppercase text-[10px] h-8 px-4 gap-1.5 text-muted-foreground hover:text-primary"
        >
          <Download className="h-3 w-3" /> CSV
        </Button>
      </div>

      {/* Virtualized Rows */}
      <div ref={parentRef} style={{ height: containerHeight }} className="overflow-y-auto scrollbar-hide">
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map(vItem => {
            const row = sorted[vItem.index];
            const selected = selectedIds.has(row.id);
            return (
              <div
                key={row.id}
                style={{ position: "absolute", top: vItem.start, left: 0, right: 0, height: rowHeight }}
                className={cn(
                  "flex items-center px-8 border-b border-dashed transition-colors",
                  selected ? "bg-primary/5" : "hover:bg-muted/20"
                )}
              >
                <button onClick={() => toggleSelect(row.id)} className="mr-4 text-muted-foreground hover:text-primary transition-colors shrink-0">
                  {selected ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}
                </button>
                {columns.map(col => (
                  <div
                    key={String(col.key)}
                    style={{ flex: col.width ? `0 0 ${col.width}px` : 1 }}
                    className="min-w-0 text-sm font-medium truncate pr-4"
                  >
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
