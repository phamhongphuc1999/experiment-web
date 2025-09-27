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
import { CaroGameType, PlayModeType, useCaroStore } from 'src/states/caro.state';

type CaroConfigContextType = {
  rows: number;
  columns: number;
  playMode: PlayModeType;
  gameType: CaroGameType;
  isOverride: boolean;
  maxError: number;
  events: {
    setRows: Dispatch<SetStateAction<number>>;
    setColumns: Dispatch<SetStateAction<number>>;
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setGameType: Dispatch<SetStateAction<CaroGameType>>;
    setIsOverride: Dispatch<SetStateAction<boolean>>;
    setMaxError: Dispatch<SetStateAction<number>>;
  };
};

const caroConfigContextDefault: CaroConfigContextType = {
  rows: 0,
  columns: 0,
  playMode: 'offline',
  gameType: 'normal',
  isOverride: false,
  maxError: 5,
  events: {
    setRows: () => {},
    setColumns: () => {},
    setPlayMode: () => {},
    setGameType: () => {},
    setIsOverride: () => {},
    setMaxError: () => {},
  },
};

const CaroConfigContext = createContext<CaroConfigContextType>(caroConfigContextDefault);

interface Props {
  children: ReactNode;
}

export default function CaroConfigProvider({ children }: Props) {
  const { metadata } = useCaroStore();

  const [rows, setRows] = useState(metadata.numberOfRows);
  const [columns, setColumns] = useState(metadata.numberOfColumns);
  const [playMode, setPlayMode] = useState(metadata.playMode);
  const [gameType, setGameType] = useState(metadata.gameType);
  const [isOverride, setIsOverride] = useState(metadata.isOverride);
  const [maxError, setMaxError] = useState(metadata.maxNumberOfBlindError);

  useEffect(() => {
    setColumns(metadata.numberOfColumns);
  }, [metadata.numberOfColumns]);

  useEffect(() => {
    setRows(metadata.numberOfRows);
  }, [metadata.numberOfRows]);

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

  const contextData = useMemo<CaroConfigContextType>(() => {
    return {
      rows,
      columns,
      playMode,
      gameType,
      isOverride,
      maxError,
      events: { setRows, setColumns, setPlayMode, setGameType, setIsOverride, setMaxError },
    };
  }, [columns, playMode, rows, gameType, isOverride, maxError]);

  return <CaroConfigContext.Provider value={contextData}>{children}</CaroConfigContext.Provider>;
}

export function useCaroConfigContext() {
  return useContext(CaroConfigContext);
}
