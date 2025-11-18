'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { pikachuRoundTransformations } from 'src/configs/constance';
import {
  PikachuBoardTransformType,
  PikachuGameType,
  PikachuImgType,
  PikachuTimeType,
} from 'src/global';
import { usePikachuStore } from 'src/states/pikachu.state';

type PikachuConfigContextType = {
  isSound: boolean;
  size: { numberOfRows: number; numberOfColumns: number };
  numberOfLines: number;
  timeConfigType: PikachuTimeType;
  imgType: PikachuImgType;
  rounds: Array<PikachuBoardTransformType>;
  gameType: PikachuGameType;
  fn: {
    setIsSound: Dispatch<SetStateAction<boolean>>;
    setSize: Dispatch<SetStateAction<{ numberOfRows: number; numberOfColumns: number }>>;
    setNumberOfLines: Dispatch<SetStateAction<number>>;
    setTimeConfigType: Dispatch<SetStateAction<PikachuTimeType>>;
    setImgType: Dispatch<SetStateAction<PikachuImgType>>;
    setRounds: Dispatch<SetStateAction<PikachuBoardTransformType[]>>;
    setGameType: Dispatch<SetStateAction<PikachuGameType>>;
  };
};

const pikachuConfigContextDefault: PikachuConfigContextType = {
  isSound: true,
  size: { numberOfRows: 16, numberOfColumns: 9 },
  numberOfLines: 2,
  timeConfigType: 'normal',
  imgType: 'internal',
  rounds: [],
  gameType: 'normal',
  fn: {
    setIsSound: () => {},
    setSize: () => {},
    setNumberOfLines: () => {},
    setTimeConfigType: () => {},
    setImgType: () => {},
    setRounds: () => {},
    setGameType: () => {},
  },
};

const PikachuConfigContext = createContext<PikachuConfigContextType>(pikachuConfigContextDefault);

interface Props {
  children: ReactNode;
}

export default function PikachuConfigProvider({ children }: Props) {
  const { metadata } = usePikachuStore();
  const [isSound, setIsSound] = useState(metadata.isSound);
  const [timeConfigType, setTimeConfigType] = useState<PikachuTimeType>('normal');
  const [size, setSize] = useState<{ numberOfRows: number; numberOfColumns: number }>({
    numberOfRows: 16,
    numberOfColumns: 9,
  });
  const [numberOfLines, setNumberOfLines] = useState(2);
  const [imgType, setImgType] = useState<PikachuImgType>('internal');
  const [rounds, setRounds] = useState<Array<PikachuBoardTransformType>>(
    pikachuRoundTransformations
  );
  const [gameType, setGameType] = useState<PikachuGameType>('normal');

  const contextData = useMemo<PikachuConfigContextType>(() => {
    return {
      isSound,
      size,
      numberOfLines,
      timeConfigType,
      imgType,
      rounds,
      gameType,
      fn: {
        setIsSound,
        setSize,
        setNumberOfLines,
        setTimeConfigType,
        setImgType,
        setRounds,
        setGameType,
      },
    };
  }, [isSound, size, numberOfLines, timeConfigType, imgType, rounds, gameType]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
