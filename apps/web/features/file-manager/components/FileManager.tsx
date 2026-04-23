"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFileManagerStore } from "../store";
import { StorageQuota } from "./StorageQuota";
import type { FileAsset } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutGrid, List, UploadCloud, Search, Trash2,
  Copy, Download, FileText, Image as ImageIcon,
  CheckSquare, Square, FolderOpen
} from "lucide-react";
import { toast } from "sonner";

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("image/")) return <ImageIcon className="h-6 w-6" />;
  return <FileText className="h-6 w-6" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export function FileManager() {
  const { files, selectedIds, view, toggleSelect, selectAll, clearSelection, removeSelected, setView } = useFileManagerStore();
  const [search, setSearch] = useState("");

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const onDrop = useCallback((acceptedFiles: File[]) => {
    toast.success(`${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""} uploaded`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] },
    noClick: filtered.length > 0,
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-5 bg-background rounded-[2.5rem] border border-dashed">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="pl-12 h-12 rounded-full bg-muted/20 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {selectedIds.length > 0 && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => { removeSelected(); toast.success("Files deleted"); }}
                className="rounded-full font-black italic uppercase text-[10px] h-10 px-5 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete ({selectedIds.length})
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection} className="rounded-full font-bold italic uppercase text-[10px] h-10 px-5 border-2">Clear</Button>
            </>
          )}
          <button onClick={selectAll} className="h-10 px-4 rounded-full border border-dashed text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
            Select All
          </button>
          <div className="flex p-0.5 bg-muted/30 rounded-xl border border-dashed">
            {(["grid", "list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={cn("h-9 w-10 rounded-lg flex items-center justify-center transition-all", view === v ? "bg-background shadow text-primary" : "text-muted-foreground")}>
                {v === "grid" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <StorageQuota />

      {/* Drop Zone Overlay / File Grid */}
      <div
        {...getRootProps()}
        className={cn(
          "min-h-[300px] rounded-[3rem] border-2 border-dashed transition-all",
          isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted/50"
        )}
      >
        <input {...getInputProps()} />

        {isDragActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 pointer-events-none">
            <UploadCloud className="h-16 w-16 text-primary animate-bounce" />
            <p className="text-xl font-black italic uppercase tracking-tighter text-primary">Drop files to upload</p>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center cursor-pointer">
            <UploadCloud className="h-16 w-16 text-muted-foreground/30" />
            <div className="space-y-2">
              <p className="text-lg font-black italic uppercase tracking-tight text-muted-foreground">No files yet</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Drop files here or click to upload</p>
            </div>
          </div>
        ) : view === "grid" ? (
          <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence>
              {filtered.map((file, i) => {
                const selected = selectedIds.includes(file.id);
                return (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => toggleSelect(file.id)}
                    className={cn(
                      "group relative rounded-[1.5rem] border-2 overflow-hidden cursor-pointer transition-all",
                      selected ? "border-primary shadow-lg shadow-primary/20 scale-[0.97]" : "border-transparent hover:border-primary/30"
                    )}
                  >
                    <div className="aspect-square bg-muted/20">
                      {file.mimeType.startsWith("image/") ? (
                        <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground/40">
                          <FileText className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 space-y-0.5">
                      <p className="text-[9px] font-black uppercase tracking-tight truncate">{file.name}</p>
                      <p className="text-[8px] font-bold text-muted-foreground uppercase">{formatBytes(file.sizeBytes)}</p>
                    </div>
                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2">
                      {selected
                        ? <CheckSquare className="h-5 w-5 text-primary drop-shadow-md" />
                        : <Square className="h-5 w-5 text-white/70 opacity-0 group-hover:opacity-100 drop-shadow-md transition-opacity" />
                      }
                    </div>
                    {/* Hover actions */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopyUrl(file.url); }}
                        className="h-6 w-6 rounded-lg bg-background/90 border flex items-center justify-center hover:text-primary"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filtered.map((file, i) => {
              const selected = selectedIds.includes(file.id);
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggleSelect(file.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2",
                    selected ? "border-primary/30 bg-primary/5" : "border-transparent hover:bg-muted/20"
                  )}
                >
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <FileIcon mimeType={file.mimeType} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black italic uppercase tracking-tight truncate">{file.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{formatBytes(file.sizeBytes)} · {file.createdAt.toLocaleDateString()}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleCopyUrl(file.url); }} className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
