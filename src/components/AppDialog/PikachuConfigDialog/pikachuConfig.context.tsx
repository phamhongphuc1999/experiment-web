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
import { PikachuImgType, PikachuTimeType } from 'src/global';
import { usePikachuStore } from 'src/states/pikachu.state';

type PikachuConfigContextType = {
  isSound: boolean;
  size: { numberOfRows: number; numberOfColumns: number };
  numberOfLines: number;
  timeConfigType: PikachuTimeType;
  imgType: PikachuImgType;
  fn: {
    setIsSound: Dispatch<SetStateAction<boolean>>;
    setSize: Dispatch<SetStateAction<{ numberOfRows: number; numberOfColumns: number }>>;
    setNumberOfLines: Dispatch<SetStateAction<number>>;
    setTimeConfigType: Dispatch<SetStateAction<PikachuTimeType>>;
    setImgType: Dispatch<SetStateAction<PikachuImgType>>;
  };
};

const pikachuConfigContextDefault: PikachuConfigContextType = {
  isSound: true,
  size: { numberOfRows: 16, numberOfColumns: 9 },
  numberOfLines: 2,
  timeConfigType: 'normal',
  imgType: 'internal',
  fn: {
    setIsSound: () => {},
    setSize: () => {},
    setNumberOfLines: () => {},
    setTimeConfigType: () => {},
    setImgType: () => {},
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

  useEffect(() => {
    setIsSound(metadata.isSound);
  }, [metadata.isSound]);

  useEffect(() => {
    setSize({ numberOfRows: metadata.numberOfRows, numberOfColumns: metadata.numberOfColumns });
  }, [metadata.numberOfRows, metadata.numberOfColumns]);

  useEffect(() => {
    setNumberOfLines(metadata.numberOfLines);
  }, [metadata.numberOfLines]);

  useEffect(() => {
    setTimeConfigType(metadata.timeConfigType);
  }, [metadata.timeConfigType]);

  useEffect(() => {
    setImgType(metadata.imgType);
  }, [metadata.imgType]);

  const contextData = useMemo<PikachuConfigContextType>(() => {
    return {
      isSound,
      size,
      numberOfLines,
      timeConfigType,
      imgType,
      fn: { setIsSound, setSize, setNumberOfLines, setTimeConfigType, setImgType },
    };
  }, [isSound, size, numberOfLines, timeConfigType, imgType]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
