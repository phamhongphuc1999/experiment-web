'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Peer, { Instance } from 'simple-peer';
import { toast } from 'sonner';
import { createCaroMessage, decodeCaroMessage } from 'src/services/caro.utils';
import { useCaroMessageStore } from 'src/states/caroMessage.state';

export type RoleType = 'host' | 'guest';

type CaroConnectionContextType = {
  peer: Instance | null;
  yourSignal: string;
  friendSignal: string;
  role: RoleType;
  events: {
    initConnection: (role: RoleType) => void;
    setFriendSignal: (friendSignal: string) => void;
  };
};

const caroConnectionContextDefault: CaroConnectionContextType = {
  peer: null,
  yourSignal: '',
  friendSignal: '',
  role: 'host',
  events: {
    initConnection: () => {},
    setFriendSignal: () => {},
  },
};

const CaroConnectionContext = createContext<CaroConnectionContextType>(
  caroConnectionContextDefault
);

interface Props {
  children: ReactNode;
}

export default function CaroConnectionProvider({ children }: Props) {
  const [peer, setPeer] = useState<Instance | null>(null);
  const [role, setRole] = useState<RoleType>('host');
  const [yourSignal, setYourSignal] = useState('');
  const [friendSignal, setFriendSignal] = useState('');
  const {
    events: { addChats },
  } = useCaroMessageStore();

  const initConnection = useCallback((type: RoleType) => {
    const p = new Peer({ initiator: type == 'host' ? true : false, trickle: false });
    setPeer(p);
    setRole(type);
  }, []);

  const _setFriendSignal = useCallback(
    (friendSignal: string) => {
      if (peer) {
        setFriendSignal(friendSignal);
        peer.signal(friendSignal);
      } else toast.error('Peer is not defined');
    },
    [peer]
  );

  useEffect(() => {
    if (peer) {
      peer.on('signal', (data) => {
        setYourSignal(JSON.stringify(data));
      });

      peer.on('connect', () => {
        peer.send(createCaroMessage('chat', 'Hello'));
      });

      peer.on('data', (data) => {
        const result = decodeCaroMessage(data);
        if (result) {
          const { type, message } = result;
          if (type == 'chat') addChats('friendChat', message);
        } else toast.error('Message is not decoded');
      });

      return () => peer.destroy();
    }
  }, [addChats, peer]);

  const contextData = useMemo<CaroConnectionContextType>(() => {
    return {
      peer,
      yourSignal,
      friendSignal,
      role,
      events: { initConnection, setFriendSignal: _setFriendSignal },
    };
  }, [initConnection, peer, yourSignal, friendSignal, role, _setFriendSignal]);

  return (
    <CaroConnectionContext.Provider value={contextData}>{children}</CaroConnectionContext.Provider>
  );
}

export function useCaroConnectionContext() {
  return useContext(CaroConnectionContext);
}
