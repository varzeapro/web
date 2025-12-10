"use client";

import { cn } from "@/src/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ScrollArea } from "@/src/components/ui/scroll-area"; // Ensure ScrollArea is correctly imported

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string; // e.g., "14:30" or "Yesterday"
  unreadCount?: number;
  status?: "online" | "offline";
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  className,
}: ConversationListProps) {
  return (
    <div className={cn("flex flex-col h-full bg-[#131320]", className)}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-bold text-white">Conversas</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2 space-y-1">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                activeId === chat.id
                  ? "bg-white/10 shadow-sm"
                  : "hover:bg-white/5 text-white/70"
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border border-white/10">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-white/10 text-white font-medium">
                    {chat.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {chat.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#131320]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={cn(
                      "text-sm font-semibold truncate",
                      activeId === chat.id ? "text-white" : "text-white/90"
                    )}
                  >
                    {chat.name}
                  </span>
                  <span className="text-[10px] text-white/40 whitespace-nowrap ml-2">
                    {chat.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/50 truncate pr-2">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--varzea-green) text-[10px] font-bold text-black">
                      {chat.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
