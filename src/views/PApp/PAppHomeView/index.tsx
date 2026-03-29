'use client';

import { useEffect, useState } from 'react';
import { MICROSERVICE_EVENTS } from 'src/configs/constance';
import useSocket from 'src/hooks/useSocket';
import { useConversationStore } from 'src/states/conversation.state';
import ChatInput from './ChatInput';
import HomeHeader from './HomeHeader';
import MainMessage, { SocketMessage } from './MainMessage';

export default function PAppHomeView() {
  const { socket } = useSocket();
  const { currentConversationId } = useConversationStore();
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (payload: SocketMessage) => {
      setMessages((prev) => [...prev, payload]);
    };

    socket.on(MICROSERVICE_EVENTS.receive_message, handleReceiveMessage);

    return () => {
      socket.off(MICROSERVICE_EVENTS.receive_message, handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !currentConversationId) return;
    setMessages([]);
    socket.emit(MICROSERVICE_EVENTS.join_conversation, {
      conversationId: currentConversationId,
    });
  }, [socket, currentConversationId]);

  function handleSendMessage(message: string) {
    if (!socket || !currentConversationId) return;
    socket.emit(MICROSERVICE_EVENTS.send_message, {
      conversationId: currentConversationId,
      message,
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader />
      <MainMessage className="flex-1" messages={messages} />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
