import { useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  onSend: (msg: string) => void;
}
export function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const handleSend = () => {
    onSend(text);
    setText("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };
  return (
    <div className="flex gap-2">
      <input
        id="chat-message-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('chat.placeholder')}
        className="flex-1 border rounded-lg p-2 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 border-gray-300 dark:border-gray-600"
        aria-label={t('chat.placeholder')}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        aria-label={t('chat.send')}
      >
        {t('chat.send')}
      </button>
    </div>
  );
}
