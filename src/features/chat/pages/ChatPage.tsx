import { useChat } from "../hooks/useChat";
import { ChatWindow } from "../components/ChatWindow";
import { ChatInput } from "../components/ChatInput";

export function ChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 dark:text-white">Chat</h1>
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
