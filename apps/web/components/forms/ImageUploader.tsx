"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  uploading: boolean;
  done: boolean;
}

interface ImageUploaderProps {
  maxFiles?: number;
  onUpload?: (urls: string[]) => void;
  label?: string;
}

export function ImageUploader({ maxFiles = 5, onUpload, label = "Upload Images" }: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      uploading: true,
      done: false,
    }));

    setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles));

    // Simulate upload delay per file
    newFiles.forEach((f) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id ? { ...item, uploading: false, done: true } : item
          )
        );
      }, 1000 + Math.random() * 1000);
    });
  }, [maxFiles]);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    maxFiles,
    disabled: files.length >= maxFiles,
  });

  const formatSize = (bytes: number) =>
    bytes > 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
      : `${(bytes / 1024).toFixed(0)} KB`;

  return (
    <div className="space-y-4">
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="rounded-full bg-muted p-3">
          <UploadCloud className={cn("h-7 w-7", isDragActive ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div>
          <p className="text-sm font-medium">
            {isDragActive ? "Drop files here..." : "Drag & drop or click to upload"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, WEBP up to 10MB · Max {maxFiles} files ({files.length}/{maxFiles})
          </p>
        </div>
        {files.length < maxFiles && (
          <Button type="button" variant="outline" size="sm">
            Browse Files
          </Button>
        )}
      </div>

      {/* Preview Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative aspect-square rounded-lg border bg-muted overflow-hidden"
            >
              <img src={file.url} alt={file.name} className="h-full w-full object-cover" />

              {/* Upload Overlay */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity",
                file.done ? "opacity-0 group-hover:opacity-0" : "bg-black/40"
              )}>
                {file.uploading && (
                  <span className="h-5 w-5 rounded-full border-2 border-white border-r-transparent animate-spin" />
                )}
              </div>

              {/* Done Badge */}
              {file.done && (
                <div className="absolute top-1.5 left-1.5 h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              >
                <X className="h-3 w-3" />
              </button>

              {/* Filename */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-1.5">
                <p className="text-[10px] text-white truncate">{file.name}</p>
                <p className="text-[9px] text-white/60">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
