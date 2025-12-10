"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isMe: boolean;
}

interface ChatWindowProps {
  recipientName: string;
  recipientAvatar?: string;
  recipientStatus?: "online" | "offline";
  messages: Message[];
  onSendMessage: (content: string) => void;
  className?: string;
}

export function ChatWindow({
  recipientName,
  recipientAvatar,
  recipientStatus = "offline",
  messages,
  onSendMessage,
  className,
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[600px] w-full max-w-md bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden shadow-2xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#131320]">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-white/10">
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback className="bg-white/10 text-white">
              {recipientName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold text-white">
              {recipientName}
            </h3>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  recipientStatus === "online" ? "bg-green-500" : "bg-gray-500"
                )}
              />
              <span className="text-xs text-white/50">
                {recipientStatus === "online" ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1a1a2e] border-white/10 text-white"
            >
              <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                Ver Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 cursor-pointer text-red-400 focus:text-red-400">
                Bloquear
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-[#0f0f1a]/50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex w-full",
                msg.isMe ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                  msg.isMe
                    ? "bg-(--varzea-green) text-black rounded-tr-sm"
                    : "bg-white/10 text-white rounded-tl-sm"
                )}
              >
                <p>{msg.content}</p>
                <div
                  className={cn(
                    "mt-1 text-[10px]",
                    msg.isMe ? "text-black/60" : "text-white/40"
                  )}
                >
                  {msg.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-[#131320] border-t border-white/10">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-(--varzea-green)"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-(--varzea-green) text-black hover:bg-(--varzea-green)/90"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
