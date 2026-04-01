'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [isJoined, setIsJoined] = useState(false);
  const pendingMessagesRef = useRef<string[]>([]);
  const joinRequestedRef = useRef(false);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (payload: SocketMessage) => {
      setMessages((prev) => [...prev, payload]);
    };

    const handleConnect = () => {
      if (!currentConversationId) return;
      setIsJoined(false);
      socket.emit(MICROSERVICE_EVENTS.join_conversation, {
        conversationId: currentConversationId,
      });
      joinRequestedRef.current = true;
    };

    const handleJoined = (payload: { conversationId?: number }) => {
      if (payload?.conversationId !== currentConversationId) return;
      setIsJoined(true);

      if (pendingMessagesRef.current.length > 0) {
        pendingMessagesRef.current.forEach((message) => {
          socket.emit(MICROSERVICE_EVENTS.send_message, {
            conversationId: currentConversationId,
            message,
          });
        });
        pendingMessagesRef.current = [];
      }
    };

    socket.on(MICROSERVICE_EVENTS.receive_message, handleReceiveMessage);
    socket.on('connect', handleConnect);
    socket.on('joined', handleJoined);

    return () => {
      socket.off(MICROSERVICE_EVENTS.receive_message, handleReceiveMessage);
      socket.off('connect', handleConnect);
      socket.off('joined', handleJoined);
    };
  }, [socket, currentConversationId]);

  useEffect(() => {
    if (!socket || !currentConversationId) return;
    setMessages([]);
    setIsJoined(false);
    pendingMessagesRef.current = [];
    joinRequestedRef.current = false;
    socket.emit(MICROSERVICE_EVENTS.join_conversation, {
      conversationId: currentConversationId,
    });
    joinRequestedRef.current = true;
  }, [socket, currentConversationId]);

  function handleSendMessage(message: string) {
    if (!socket || !currentConversationId) return;
    if (!isJoined) {
      pendingMessagesRef.current.push(message);
      if (!joinRequestedRef.current) {
        socket.emit(MICROSERVICE_EVENTS.join_conversation, {
          conversationId: currentConversationId,
        });
        joinRequestedRef.current = true;
      }
      return;
    }
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
