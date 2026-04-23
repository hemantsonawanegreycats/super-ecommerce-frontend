"use client";

import { FileManager } from "@/features/file-manager/components/FileManager";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendorFilesPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">File Manager</h1>
          <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Upload, organize, and manage your store assets</p>
        </div>
        <Button className="rounded-full font-black italic uppercase h-14 px-8 shadow-xl gap-2">
          <UploadCloud className="h-5 w-5" /> Upload Files
        </Button>
      </div>
      <FileManager />
    </div>
  );
}
