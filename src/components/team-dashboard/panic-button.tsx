"use client";

import { useState } from "react";
import { Siren, Check, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface PanicButtonProps {
  disabled?: boolean;
  onPanic?: () => Promise<void>;
}

export function PanicButton({ disabled, onPanic }: PanicButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = async () => {
    if (isLoading || isActivated || disabled) return;

    setIsLoading(true);
    try {
      await onPanic?.();
      setIsActivated(true);
      // Reset after 30 seconds
      setTimeout(() => setIsActivated(false), 30000);
    } catch (error) {
      console.error("Panic button error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative w-full py-6 text-lg font-bold transition-all duration-300",
        isActivated
          ? "bg-green-600 hover:bg-green-600 cursor-default"
          : "bg-linear-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02]",
        disabled && "opacity-50"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Enviando alerta...
        </>
      ) : isActivated ? (
        <>
          <Check className="mr-2 h-6 w-6" />
          Alerta Enviado! Aguarde respostas
        </>
      ) : (
        <>
          <Siren className="mr-2 h-6 w-6 animate-pulse" />
          🚨 Precisamos de Reforço!
        </>
      )}

      {/* Animated background pulse when not activated */}
      {!isActivated && !isLoading && (
        <div className="absolute inset-0 -z-10 animate-ping rounded-md bg-red-500/30" />
      )}
    </Button>
  );
}
