"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ChatWindow, type Message } from "./chat-window";
import { ConversationList, type Conversation } from "./conversation-list";

// MOCK DATA
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Gaviões da Fiel FC",
    lastMessage: "O jogo está confirmado para amanhã?",
    lastMessageTime: "14:30",
    unreadCount: 2,
    status: "online",
  },
  {
    id: "2",
    name: "Real Periferia",
    lastMessage: "Precisamos de um goleiro.",
    lastMessageTime: "Ontem",
    status: "offline",
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "other",
      content: "Olá! Vimos seu perfil e gostamos.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      isMe: false,
    },
    {
      id: "m2",
      senderId: "me",
      content: "Opa, obrigado! Vocês jogam onde?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      isMe: true,
    },
    {
      id: "m3",
      senderId: "other",
      content: "Na quadra do Parque Ibirapuera. Topa?",
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      isMe: false,
    },
  ],
};

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setCurrentMessages(mockMessages[id] || []);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content,
      createdAt: new Date(),
      isMe: true,
    };
    setCurrentMessages((prev) => [...prev, newMessage]);
  };

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  return (
    <div className="fixed bottom-25 right-4 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className=" shadow-2xl rounded-xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {activeConversationId ? (
            <div className="h-[500px] w-[350px] md:w-[400px] flex flex-col relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-12 z-10 text-white/50 hover:text-white"
                onClick={() => setActiveConversationId(null)}
              >
                ←
              </Button>
              <ChatWindow
                recipientName={activeConversation?.name || "Chat"}
                recipientStatus={activeConversation?.status}
                messages={currentMessages}
                onSendMessage={handleSendMessage}
                className="h-full w-full border-none rounded-none"
              />
            </div>
          ) : (
            <div className="h-[500px] w-[350px] md:w-[400px] bg-[#131320] border border-white/10 rounded-xl">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-bold text-white">Mensagens</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ConversationList
                conversations={conversations}
                onSelect={handleSelectConversation}
                className="h-[calc(100%-60px)]"
              />
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="h-14 w-14 rounded-full bg-(--varzea-green) text-black shadow-lg hover:bg-(--varzea-green)/90 hover:scale-105 transition-all"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
