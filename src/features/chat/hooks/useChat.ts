import { useSimulatedSocket } from "./useSimulatedSocket";
import { useChatContext } from "../../../shared/contexts";
import type { ChatMessage } from "../types";
export function useChat() {
  const { messages, addMessage } = useChatContext();
  useSimulatedSocket(addMessage);
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      user: "Você",
      message: text,
      timestamp: new Date().toISOString(),
    };
    addMessage(newMsg);
  };
  return { messages, sendMessage };
}
