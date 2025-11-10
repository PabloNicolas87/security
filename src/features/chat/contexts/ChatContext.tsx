import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ChatMessage } from '../types';
interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}
const ChatContext = createContext<ChatContextType | undefined>(undefined);
export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('chat_messages');
    if (saved) {
      try {
        console.log('Recuperando mensajes del localStorage:', saved);
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error al recuperar mensajes del chat:', error);
        return [];
      }
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);
  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chat_messages');
  };
  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext debe usarse dentro de ChatProvider');
  }
  return context;
}
