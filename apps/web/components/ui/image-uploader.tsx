"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Check, 
  Crop, 
  RefreshCw, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getCroppedImg } from "@/lib/crop-image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  onUpload?: (url: string) => void;
  aspectRatio?: number;
  maxSizeMB?: number;
  className?: string;
  label?: string;
}

export function ImageUploader({ 
  onUpload, 
  aspectRatio = 1, 
  maxSizeMB = 5,
  className,
  label = "Upload Asset"
}: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB limit.`);
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsCropOpen(true);
      };
      reader.readAsDataURL(file);
    }
  }, [maxSizeMB]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
        if (croppedBlob) {
          const croppedUrl = URL.createObjectURL(croppedBlob);
          setCroppedImage(croppedUrl);
          setIsCropOpen(false);
          // Auto-start mock upload
          startMockUpload(croppedUrl);
        }
      }
    } catch (e) {
      console.error(e);
      setError("Failed to crop image.");
    }
  };

  const startMockUpload = async (url: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate S3/R2 upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload?.(url);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeImage = () => {
    setImage(null);
    setCroppedImage(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence mode="wait">
        {!croppedImage ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            {...(getRootProps() as any)}
            className={cn(
              "relative group cursor-pointer rounded-[2rem] border-2 border-dashed transition-all duration-500 overflow-hidden",
              isDragActive ? "border-primary bg-primary/5 scale-[0.98]" : "border-border hover:border-primary/30 bg-muted/5",
              error ? "border-destructive bg-destructive/5" : ""
            )}
          >
            <input {...getInputProps()} />
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
               <div className={cn(
                 "h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500",
                 isDragActive ? "bg-primary text-primary-foreground rotate-12" : "bg-background shadow-xl group-hover:rotate-12"
               )}>
                  <Upload className="h-8 w-8" />
               </div>
               <div className="space-y-1">
                  <p className="text-lg font-black italic uppercase tracking-tight">{isDragActive ? "Drop Asset Here" : label}</p>
                  <p className="text-xs font-medium text-muted-foreground">Drag & drop or click to select (Max {maxSizeMB}MB)</p>
               </div>
               {error && (
                 <div className="flex items-center gap-2 text-destructive text-[10px] font-black uppercase tracking-widest bg-destructive/10 px-4 py-1 rounded-full">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                 </div>
               )}
            </div>
            
            {/* Visual Flair */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="absolute -top-12 -left-12 h-32 w-32 bg-primary/10 rounded-full blur-3xl" />
               <div className="absolute -bottom-12 -right-12 h-32 w-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2.5rem] border overflow-hidden bg-background shadow-2xl shadow-primary/5 group"
          >
            <img src={croppedImage} alt="Cropped" className="w-full aspect-square object-cover" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
               <Button 
                 variant="secondary" 
                 size="icon" 
                 className="h-12 w-12 rounded-full shadow-2xl" 
                 onClick={() => setIsCropOpen(true)}
                 disabled={isUploading}
               >
                  <Crop className="h-5 w-5" />
               </Button>
               <Button 
                 variant="destructive" 
                 size="icon" 
                 className="h-12 w-12 rounded-full shadow-2xl" 
                 onClick={removeImage}
                 disabled={isUploading}
               >
                  <Trash2 className="h-5 w-5" />
               </Button>
            </div>

            {isUploading && (
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Uploading to Cloud...</span>
                       <span className="text-[10px] font-black text-white">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-1.5 bg-white/20" />
                 </div>
              </div>
            )}

            {!isUploading && (
               <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl animate-in zoom-in duration-300">
                  <Check className="h-5 w-5 stroke-[3px]" />
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isCropOpen} onOpenChange={setIsCropOpen}>
        <DialogContent className="sm:max-w-xl p-0 rounded-[3rem] overflow-hidden border-none shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <DialogHeader className="p-8 border-b border-dashed bg-muted/10">
            <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase">Adjust Composition</DialogTitle>
          </DialogHeader>
          
          <div className="relative h-[400px] w-full bg-muted/20">
            {image && (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-3">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Zoom Level</span>
                  <span>{Math.round(zoom * 100)}%</span>
               </div>
               <input
                 type="range"
                 value={zoom}
                 min={1}
                 max={3}
                 step={0.1}
                 aria-labelledby="Zoom"
                 onChange={(e) => setZoom(Number(e.target.value))}
                 className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
               />
            </div>

            <DialogFooter className="gap-3 sm:justify-between sm:space-x-0">
               <Button variant="ghost" className="rounded-full px-8 font-bold" onClick={() => setIsCropOpen(false)}>
                  CANCEL
               </Button>
               <Button className="rounded-full px-10 h-12 font-black italic gap-2 shadow-xl" onClick={handleCropSave}>
                  APPLY TRANSFORM <Check className="h-4 w-4" />
               </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
