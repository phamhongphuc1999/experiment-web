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
  events: {
    setRows: Dispatch<SetStateAction<number>>;
    setColumns: Dispatch<SetStateAction<number>>;
    setPlayMode: Dispatch<SetStateAction<PlayModeType>>;
    setGameType: Dispatch<SetStateAction<CaroGameType>>;
    setIsOverride: Dispatch<SetStateAction<boolean>>;
  };
};

const caroConfigContextDefault: CaroConfigContextType = {
  rows: 0,
  columns: 0,
  playMode: 'offline',
  gameType: 'normal',
  isOverride: false,
  events: {
    setRows: () => {},
    setColumns: () => {},
    setPlayMode: () => {},
    setGameType: () => {},
    setIsOverride: () => {},
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

  const contextData = useMemo<CaroConfigContextType>(() => {
    return {
      rows,
      columns,
      playMode,
      gameType,
      isOverride,
      events: { setRows, setColumns, setPlayMode, setGameType, setIsOverride },
    };
  }, [columns, playMode, rows, gameType, isOverride]);

  return <CaroConfigContext.Provider value={contextData}>{children}</CaroConfigContext.Provider>;
}

export function useCaroConfigContext() {
  return useContext(CaroConfigContext);
}
