import { useTranslation } from "react-i18next";
import { useChat } from "../hooks/useChat";
import { ChatWindow } from "../components/ChatWindow";
import { ChatInput } from "../components/ChatInput";
export function ChatPage() {
  const { messages, sendMessage } = useChat();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4 dark:text-white">{t('chat.title')}</h1>
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
