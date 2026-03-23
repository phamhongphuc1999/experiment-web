'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { PAPP_BACKEND_URL } from 'src/configs/constance';

export default function useSocket(url = PAPP_BACKEND_URL) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, { transports: ['websocket'] });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return { socket };
}
