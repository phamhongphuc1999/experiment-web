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
  isSound: boolean;
  fn: {
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setGameType: Dispatch<SetStateAction<CaroGameType>>;
    setMaxError: Dispatch<SetStateAction<number>>;
    setIsSound: Dispatch<SetStateAction<boolean>>;
  };
};

const connect4ConfigContextDefault: Connect4ConfigContextType = {
  playMode: 'offline',
  gameType: 'normal',
  maxError: 5,
  isSound: true,
  fn: {
    setPlayMode: () => {},
    setGameType: () => {},
    setMaxError: () => {},
    setIsSound: () => {},
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
  const [isSound, setIsSound] = useState(metadata.isSound);

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
      isSound,
      fn: { setPlayMode, setGameType, setMaxError, setIsSound },
    };
  }, [playMode, gameType, maxError, isSound]);

  return (
    <Connect4ConfigContext.Provider value={contextData}>{children}</Connect4ConfigContext.Provider>
  );
}

export function useConnect4ConfigContext() {
  return useContext(Connect4ConfigContext);
}
