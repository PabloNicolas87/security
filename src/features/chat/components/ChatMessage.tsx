import type { ChatMessage } from "../types";

interface Props {
  msg: ChatMessage;
}

export function ChatMessageItem({ msg }: Props) {
  const isOwn = msg.user === "Você";

  const userColors: Record<string, string> = {
    "Você": "text-blue-500 dark:text-blue-400",
    "Agent01": "text-emerald-500 dark:text-emerald-400",
    "Agent02": "text-purple-500 dark:text-purple-400",
    "System": "text-gray-500 dark:text-gray-400",
  };

  const timeString = new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`my-3 flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`px-3 py-2 rounded-lg max-w-xs ${
        isOwn 
          ? "bg-chat-user-light dark:bg-chat-user-dark text-blue-900 dark:text-white" 
          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      }`}>
        <span className={`text-xs font-semibold block mb-1 ${
          isOwn 
            ? "text-blue-600 dark:text-blue-100" 
            : userColors[msg.user] || "text-gray-400"
        }`}>
          {msg.user}
        </span>
        
        <p className="text-sm break-words mb-1">
          {msg.message}
        </p>
        
        <span className={`text-xs float-right ${
          isOwn 
            ? "text-blue-600 dark:text-blue-100" 
            : "text-gray-500 dark:text-gray-400"
        }`}>
          {timeString}
        </span>
      </div>
    </div>
  );
}
