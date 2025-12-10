import { FloatingChatWidget } from "@/src/components/chat/floating-chat-widget";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingChatWidget />
    </>
  );
}
