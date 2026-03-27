import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const SUPABASE_URL = "https://grbebiwrazrrjadltmzb.supabase.co";
const BUCKET_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/product-images/`;

export function getStoragePath(url: string): string | null {
  return url.startsWith(BUCKET_PREFIX) ? url.replace(BUCKET_PREFIX, '') : null;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { upsert: false });

    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      return null;
    }

    return `${BUCKET_PREFIX}${filePath}`;
  };

  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f =>
      f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      toast({ title: 'Invalid files', description: 'Only images under 5MB allowed.', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const urls = await Promise.all(validFiles.map(uploadFile));
    const successUrls = urls.filter(Boolean) as string[];
    if (successUrls.length > 0) {
      onChange([...images, ...successUrls]);
    }
    setUploading(false);
  };

  const removeImage = async (index: number) => {
    const url = images[index];
    const path = getStoragePath(url);
    if (path) {
      await supabase.storage.from('product-images').remove([path]);
    }
    onChange(images.filter((_, i) => i !== index));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Drag-and-drop reorder handlers
  const handleReorderDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    setDragIndex(index);
  }, []);

  const handleReorderDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const handleReorderDrop = useCallback((e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndex;
    setDragIndex(null);
    setDragOverIndex(null);
    if (fromIndex === null || fromIndex === toIndex) return;

    const reordered = [...images];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    onChange(reordered);
  }, [dragIndex, images, onChange]);

  const handleReorderDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <p className="text-sm">Drop images here or click to browse</p>
            <p className="text-xs">PNG, JPG, WebP up to 5MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <>
          <p className="text-xs text-muted-foreground">Drag images to reorder. First image is the main photo.</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {images.map((url, i) => (
              <div
                key={url + i}
                draggable
                onDragStart={(e) => handleReorderDragStart(e, i)}
                onDragOver={(e) => handleReorderDragOver(e, i)}
                onDrop={(e) => handleReorderDrop(e, i)}
                onDragEnd={handleReorderDragEnd}
                className={cn(
                  "relative group aspect-square rounded-md overflow-hidden border bg-muted cursor-grab active:cursor-grabbing transition-all",
                  dragIndex === i && "opacity-40 scale-95",
                  dragOverIndex === i && dragIndex !== i && "ring-2 ring-primary",
                  "border-border"
                )}
              >
                <img src={url} alt={`Product ${i + 1}`} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute top-1 left-1 bg-background/80 rounded p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
