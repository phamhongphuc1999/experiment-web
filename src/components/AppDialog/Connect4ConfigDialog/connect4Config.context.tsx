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
import { CaroGameType, PlayModeType } from 'src/global';
import { useConnect4Store } from 'src/states/connect4.state';

type Connect4ConfigContextType = {
  playMode: PlayModeType;
  gameType: CaroGameType;
  maxError: number;
  isMute: boolean;
  fn: {
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setGameType: Dispatch<SetStateAction<CaroGameType>>;
    setMaxError: Dispatch<SetStateAction<number>>;
    setIsMute: Dispatch<SetStateAction<boolean>>;
  };
};

const connect4ConfigContextDefault: Connect4ConfigContextType = {
  playMode: 'offline',
  gameType: 'normal',
  maxError: 5,
  isMute: true,
  fn: {
    setPlayMode: () => {},
    setGameType: () => {},
    setMaxError: () => {},
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
  const { metadata } = useConnect4Store();

  const [playMode, setPlayMode] = useState(metadata.playMode);
  const [gameType, setGameType] = useState(metadata.gameType);
  const [maxError, setMaxError] = useState(metadata.maxNumberOfBlindError);
  const [isMute, setIsMute] = useState(metadata.isMute);

  useEffect(() => {
    setPlayMode(metadata.playMode);
  }, [metadata.playMode]);

  useEffect(() => {
    setGameType(metadata.gameType);
  }, [metadata.gameType]);

  useEffect(() => {
    setMaxError(metadata.maxNumberOfBlindError);
  }, [metadata.maxNumberOfBlindError]);

  const contextData = useMemo<Connect4ConfigContextType>(() => {
    return {
      playMode,
      gameType,
      maxError,
      isMute,
      fn: { setPlayMode, setGameType, setMaxError, setIsMute },
    };
  }, [playMode, gameType, maxError, isMute]);

  return (
    <Connect4ConfigContext.Provider value={contextData}>{children}</Connect4ConfigContext.Provider>
  );
}

export function useConnect4ConfigContext() {
  return useContext(Connect4ConfigContext);
}
