'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { PlayModeType } from 'src/global';
import { useCaroStore } from 'src/states/caro.state';

type Connect4ConfigContextType = {
  playMode: PlayModeType;
};

const connect4ConfigContextDefault: Connect4ConfigContextType = {
  playMode: 'offline',
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

  useEffect(() => {
    setPlayMode(metadata.playMode);
  }, [metadata.playMode]);

  const contextData = useMemo<Connect4ConfigContextType>(() => {
    return { playMode };
  }, [playMode]);

  return (
    <Connect4ConfigContext.Provider value={contextData}>{children}</Connect4ConfigContext.Provider>
  );
}

export function useConnect4ConfigContext() {
  return useContext(Connect4ConfigContext);
}
