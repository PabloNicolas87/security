import { useEffect, useRef } from "react";
import { ChatMessageItem } from "./ChatMessage";

type ChatWindowProps = {
  messages: any[];
};

export function ChatWindow({ messages }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-3 bg-white dark:bg-gray-800 dark:text-gray-100">
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} msg={msg} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
