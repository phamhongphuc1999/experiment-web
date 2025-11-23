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
import { CaroGameType, CaroSizeBoardType, CaroWinModeType, PlayModeType } from 'src/global';
import { useCaroStore } from 'src/states/caro.state';

type CaroConfigContextType = {
  size: CaroSizeBoardType;
  playMode: PlayModeType;
  gameType: CaroGameType;
  winMode: CaroWinModeType;
  isOverride: boolean;
  maxError: number;
  isSound: boolean;
  fn: {
    setSize: Dispatch<SetStateAction<CaroSizeBoardType>>;
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setGameType: Dispatch<SetStateAction<CaroGameType>>;
    setIsOverride: Dispatch<SetStateAction<boolean>>;
    setMaxError: Dispatch<SetStateAction<number>>;
    setWinMode: Dispatch<SetStateAction<CaroWinModeType>>;
    setIsSound: Dispatch<SetStateAction<boolean>>;
  };
};

const caroConfigContextDefault: CaroConfigContextType = {
  size: 10,
  playMode: 'offline',
  gameType: 'normal',
  winMode: 'blockOpponent',
  isOverride: false,
  maxError: 5,
  isSound: true,
  fn: {
    setSize: () => {},
    setPlayMode: () => {},
    setGameType: () => {},
    setIsOverride: () => {},
    setMaxError: () => {},
    setWinMode: () => {},
    setIsSound: () => {},
  },
};

const CaroConfigContext = createContext<CaroConfigContextType>(caroConfigContextDefault);

interface Props {
  children: ReactNode;
}

export default function CaroConfigProvider({ children }: Props) {
  const { metadata } = useCaroStore();

  const [size, setSize] = useState(metadata.size);
  const [playMode, setPlayMode] = useState(metadata.playMode);
  const [gameType, setGameType] = useState(metadata.gameType);
  const [winMode, setWinMode] = useState(metadata.winMode);
  const [isOverride, setIsOverride] = useState(metadata.isOverride);
  const [maxError, setMaxError] = useState(metadata.maxNumberOfBlindError);
  const [isSound, setIsSound] = useState(metadata.isSound);

  useEffect(() => {
    setWinMode(metadata.winMode);
  }, [metadata.winMode]);

  useEffect(() => {
    setSize(metadata.size);
  }, [metadata.size]);

  useEffect(() => {
    setPlayMode(metadata.playMode);
  }, [metadata.playMode]);

  useEffect(() => {
    setGameType(metadata.gameType);
  }, [metadata.gameType]);

  useEffect(() => {
    setIsOverride(metadata.isOverride);
  }, [metadata.isOverride]);

  useEffect(() => {
    setMaxError(metadata.maxNumberOfBlindError);
  }, [metadata.maxNumberOfBlindError]);

  useEffect(() => {
    setIsSound(metadata.isSound);
  }, [metadata.isSound]);

  const contextData = useMemo<CaroConfigContextType>(() => {
    return {
      size,
      playMode,
      gameType,
      winMode,
      isOverride,
      maxError,
      isSound,
      fn: { setSize, setPlayMode, setGameType, setWinMode, setIsOverride, setMaxError, setIsSound },
    };
  }, [size, playMode, winMode, gameType, isOverride, maxError, isSound]);

  return <CaroConfigContext.Provider value={contextData}>{children}</CaroConfigContext.Provider>;
}

export function useCaroConfigContext() {
  return useContext(CaroConfigContext);
}
