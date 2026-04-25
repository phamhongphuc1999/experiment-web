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
import { pikachuRoundTransformations } from 'src/configs/pikachu.constance';
import { usePikachuStore } from 'src/states/pikachu.state';
import { TPikachuGameType, TPikachuImgType, TPikachuTransformType } from 'src/types/pikachu.type';

type TPikachuConfigContextType = {
  size: { numberOfRows: number; numberOfColumns: number };
  numberOfLines: number;
  imgType: TPikachuImgType;
  rounds: Array<TPikachuTransformType>;
  gameType: TPikachuGameType;
  fn: {
    setSize: Dispatch<SetStateAction<{ numberOfRows: number; numberOfColumns: number }>>;
    setNumberOfLines: Dispatch<SetStateAction<number>>;
    setImgType: Dispatch<SetStateAction<TPikachuImgType>>;
    setRounds: Dispatch<SetStateAction<TPikachuTransformType[]>>;
    setGameType: Dispatch<SetStateAction<TPikachuGameType>>;
  };
};

const pikachuConfigContextDefault: TPikachuConfigContextType = {
  size: { numberOfRows: 16, numberOfColumns: 9 },
  numberOfLines: 2,
  imgType: 'internal',
  rounds: [],
  gameType: 'normal',
  fn: {
    setSize: () => {},
    setNumberOfLines: () => {},
    setImgType: () => {},
    setRounds: () => {},
    setGameType: () => {},
  },
};

const PikachuConfigContext = createContext<TPikachuConfigContextType>(pikachuConfigContextDefault);

interface TProps {
  children: ReactNode;
}

export default function PikachuConfigProvider({ children }: TProps) {
  const { metadata } = usePikachuStore();
  const [size, setSize] = useState<{ numberOfRows: number; numberOfColumns: number }>({
    numberOfRows: 16,
    numberOfColumns: 9,
  });
  const [numberOfLines, setNumberOfLines] = useState(2);
  const [imgType, setImgType] = useState<TPikachuImgType>('internal');
  const [rounds, setRounds] = useState<Array<TPikachuTransformType>>(pikachuRoundTransformations);
  const [gameType, setGameType] = useState<TPikachuGameType>('normal');

  useEffect(() => {
    setSize({ numberOfRows: metadata.numberOfRows, numberOfColumns: metadata.numberOfColumns });
  }, [metadata.numberOfRows, metadata.numberOfColumns]);

  useEffect(() => {
    setNumberOfLines(metadata.numberOfLines);
  }, [metadata.numberOfLines]);

  useEffect(() => {
    setImgType(metadata.imgType);
  }, [metadata.imgType]);

  useEffect(() => {
    setRounds(metadata.roundList);
  }, [metadata.roundList]);

  useEffect(() => {
    setGameType(metadata.gameType);
  }, [metadata.gameType]);

  const contextData = useMemo<TPikachuConfigContextType>(() => {
    return {
      size,
      numberOfLines,
      imgType,
      rounds,
      gameType,
      fn: { setSize, setNumberOfLines, setImgType, setRounds, setGameType },
    };
  }, [size, numberOfLines, imgType, rounds, gameType]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
