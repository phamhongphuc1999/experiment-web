/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import Peer, { Instance } from 'simple-peer';
import { toast } from 'sonner';
import { ConnectionType, RoleType } from 'src/global';
import { useGameMessengerChat } from 'src/states/messenger.state';
import { CaroConnectionContextType } from './caro-connection.context';

type ConnectFourConnectionContextType = CaroConnectionContextType;

const connectFourConnectionContextDefault: ConnectFourConnectionContextType = {
  peer: null,
  yourSignal: '',
  friendSignal: '',
  role: 'host',
  connectionType: 'init',
  events: {
    initConnection: () => {},
    setFriendSignal: () => {},
  },
};

const ConnectFourConnectionContext = createContext<ConnectFourConnectionContextType>(
  connectFourConnectionContextDefault
);

interface Props {
  children: ReactNode;
}

export default function ConnectFourConnectionProvider({ children }: Props) {
  const [peer, setPeer] = useState<Instance | null>(null);
  const [role, setRole] = useState<RoleType>('host');
  const [yourSignal, setYourSignal] = useState('');
  const [friendSignal, setFriendSignal] = useState('');
  const [connection, setConnection] = useState<ConnectionType>('init');
  const {
    events: { addChats },
  } = useGameMessengerChat('connect-four');

  const initConnection = useCallback((type: RoleType) => {
    const p = new Peer({ initiator: type == 'host' ? true : false, trickle: false });
    setPeer(p);
    setRole(type);
    setConnection('connecting');
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

  const contextData = useMemo<CaroConnectionContextType>(() => {
    return {
      peer,
      yourSignal,
      friendSignal,
      role,
      connectionType: connection,
      events: { initConnection, setFriendSignal: _setFriendSignal },
    };
  }, [initConnection, peer, yourSignal, friendSignal, role, connection, _setFriendSignal]);

  return (
    <ConnectFourConnectionContext.Provider value={contextData}>
      {children}
    </ConnectFourConnectionContext.Provider>
  );
}

export function useConnectFourConnectionContext() {
  return useContext(ConnectFourConnectionContext);
}
