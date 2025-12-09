"use client";

import { useState, useRef } from "react";
import { Upload, Camera, X, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

interface PhotoUploadProps {
  value: string | null;
  onChange: (file: File | null, preview: string | null) => void;
  label?: string;
  description?: string;
  shape?: "circle" | "square";
  accentColor?: "blue" | "emerald";
}

export function PhotoUpload({
  value,
  onChange,
  label = "Sua Foto",
  description = "Arraste uma imagem ou clique para selecionar",
  shape = "circle",
  accentColor = "blue",
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null, null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const colorClasses = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/30",
      gradient: "from-blue-600 to-cyan-600",
    },
    emerald: {
      border: "border-emerald-500",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "ring-emerald-500/30",
      gradient: "from-emerald-600 to-lime-600",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Label */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>

      {/* Upload area */}
      <div
        className={cn(
          "relative cursor-pointer transition-all duration-300",
          shape === "circle" ? "rounded-full" : "rounded-2xl",
          "w-48 h-48"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {value ? (
          // Image preview
          <>
            <div
              className={cn(
                "w-full h-full overflow-hidden transition-all duration-300",
                shape === "circle" ? "rounded-full" : "rounded-2xl",
                "ring-4 ring-offset-4 ring-offset-slate-900",
                colors.ring,
                isHovered && "scale-105"
              )}
            >
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Remove button */}
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className={cn(
                "absolute -top-2 -right-2 h-8 w-8 rounded-full transition-all duration-300",
                "opacity-0",
                isHovered && "opacity-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          // Empty state
          <div
            className={cn(
              "w-full h-full flex flex-col items-center justify-center gap-3",
              "border-2 border-dashed transition-all duration-300",
              shape === "circle" ? "rounded-full" : "rounded-2xl",
              isDragging && [colors.border, colors.bg, "scale-105"],
              isHovered && !isDragging && [colors.border, "bg-slate-800/50"],
              !isDragging && !isHovered && "border-slate-700 bg-slate-800/30"
            )}
          >
            <div
              className={cn(
                "p-4 rounded-full transition-all duration-300",
                colors.bg
              )}
            >
              {isDragging ? (
                <Upload className={cn("h-8 w-8", colors.text)} />
              ) : (
                <User className={cn("h-8 w-8", colors.text)} />
              )}
            </div>

            <div className="flex gap-2 text-sm">
              <Camera className={cn("h-4 w-4", colors.text)} />
              <span className="text-slate-400">
                {isDragging ? "Solte aqui" : "Clique ou arraste"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Format hint */}
      <p className="text-xs text-slate-500">JPG, PNG ou GIF • Máximo 5MB</p>
    </div>
  );
}
