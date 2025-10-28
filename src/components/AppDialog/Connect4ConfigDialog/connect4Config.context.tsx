'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PlayModeType } from 'src/global';
import { useCaroStore } from 'src/states/caro.state';

type Connect4ConfigContextType = {
  playMode: PlayModeType;
  isMute: boolean;
  fn: {
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setIsMute: Dispatch<SetStateAction<boolean>>;
  };
};

const connect4ConfigContextDefault: Connect4ConfigContextType = {
  playMode: 'offline',
  isMute: true,
  fn: {
    setPlayMode: () => {},
    setIsMute: () => {},
  },
};

const Connect4ConfigContext = createContext<Connect4ConfigContextType>(
  connect4ConfigContextDefault
);

interface Props {
  children: ReactNode;
}

export default function Connect4ConfigProvider({ children }: Props) {
  const { metadata } = useCaroStore();

  const [playMode, setPlayMode] = useState(metadata.playMode);
  const [isMute, setIsMute] = useState(metadata.isMute);

  useEffect(() => {
    setPlayMode(metadata.playMode);
  }, [metadata.playMode]);

  const contextData = useMemo<Connect4ConfigContextType>(() => {
    return { playMode, isMute, fn: { setPlayMode, setIsMute } };
  }, [playMode, isMute]);

  return (
    <Connect4ConfigContext.Provider value={contextData}>{children}</Connect4ConfigContext.Provider>
  );
}

export function useConnect4ConfigContext() {
  return useContext(Connect4ConfigContext);
}
