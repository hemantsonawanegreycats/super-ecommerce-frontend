export interface FileAsset {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: Date;
  folder: string | null;
}

export interface FileManagerState {
  files: FileAsset[];
  selectedIds: string[];
  view: "grid" | "list";
  quota: { used: number; total: number }; // in MB
}
