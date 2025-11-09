import { useEffect } from "react";
import type { ChatMessage } from "../types";

export function useSimulatedSocket(onNewMessage: (msg: ChatMessage) => void) {
  useEffect(() => {
    const fakeUsers = ["Agent01", "Agent02", "System"];
    const fakeMessages = [
      "Nova atividade detectada.",
      "Conexão estável.",
      "Mensagem do sistema: todos os serviços online.",
      "Alerta: aumento de tráfego detectado.",
    ];

    const interval = setInterval(() => {
      const msg: ChatMessage = {
        id: Date.now(),
        user: fakeUsers[Math.floor(Math.random() * fakeUsers.length)],
        message: fakeMessages[Math.floor(Math.random() * fakeMessages.length)],
        timestamp: new Date().toISOString(),
      };
      onNewMessage(msg);
    }, 5000);

    return () => clearInterval(interval);
  }, [onNewMessage]);
}
