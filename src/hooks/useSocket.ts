'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { PAPP_BACKEND_URL } from 'src/configs/constance';
import { useAuthStore } from 'src/states/auth.state';

export default function useSocket(url = PAPP_BACKEND_URL) {
  const { accessToken } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, { transports: ['websocket'], auth: { token: accessToken } });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url, accessToken]);

  return { socket };
}
