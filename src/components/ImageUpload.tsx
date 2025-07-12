import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
}

export function ImageUpload({ onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = e.target?.result as string;
          setImages(prev => {
            const updated = [...prev, newImage];
            onImagesChange(updated);
            return updated;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onImagesChange(updated);
      return updated;
    });
  };

  return (
    <Card className="p-6 shadow-card">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-primary" />
        Add Images
      </h2>
      
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ease-smooth
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary hover:bg-muted/50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${dragActive ? 'text-primary' : 'text-muted-foreground'}`} />
        <p className="text-foreground font-medium mb-2">
          {dragActive ? 'Drop your images here' : 'Drag & drop images here'}
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          or click to browse files
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button variant="outline" size="sm">
          Choose Files
        </Button>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Uploaded Images ({images.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-border shadow-soft"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}