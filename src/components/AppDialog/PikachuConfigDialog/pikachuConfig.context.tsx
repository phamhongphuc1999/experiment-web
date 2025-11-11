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
import { usePikachuStore } from 'src/states/pikachu.state';

type PikachuConfigContextType = {
  isSound: boolean;
  size: { numberOfRows: number; numberOfColumns: number };
  numberOfLines: number;
  fn: {
    setIsSound: Dispatch<SetStateAction<boolean>>;
    setSize: Dispatch<SetStateAction<{ numberOfRows: number; numberOfColumns: number }>>;
    setNumberOfLines: Dispatch<SetStateAction<number>>;
  };
};

const pikachuConfigContextDefault: PikachuConfigContextType = {
  isSound: true,
  size: { numberOfRows: 16, numberOfColumns: 9 },
  numberOfLines: 2,
  fn: { setIsSound: () => {}, setSize: () => {}, setNumberOfLines: () => {} },
};

const PikachuConfigContext = createContext<PikachuConfigContextType>(pikachuConfigContextDefault);

interface Props {
  children: ReactNode;
}

export default function PikachuConfigProvider({ children }: Props) {
  const { metadata } = usePikachuStore();
  const [isSound, setIsSound] = useState(metadata.isSound);
  const [size, setSize] = useState<{ numberOfRows: number; numberOfColumns: number }>({
    numberOfRows: 16,
    numberOfColumns: 9,
  });
  const [numberOfLines, setNumberOfLines] = useState(2);

  useEffect(() => {
    setIsSound(metadata.isSound);
  }, [metadata.isSound]);

  useEffect(() => {
    setSize({ numberOfRows: metadata.numberOfRows, numberOfColumns: metadata.numberOfColumns });
  }, [metadata.numberOfRows, metadata.numberOfColumns]);

  useEffect(() => {
    setNumberOfLines(metadata.numberOfLines);
  }, [metadata.numberOfLines]);

  const contextData = useMemo<PikachuConfigContextType>(() => {
    return { isSound, size, numberOfLines, fn: { setIsSound, setSize, setNumberOfLines } };
  }, [isSound, size, numberOfLines]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
