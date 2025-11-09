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
  fn: {
    setIsSound: Dispatch<SetStateAction<boolean>>;
    setSize: Dispatch<SetStateAction<{ numberOfRows: number; numberOfColumns: number }>>;
  };
};

const pikachuConfigContextDefault: PikachuConfigContextType = {
  isSound: true,
  size: { numberOfRows: 16, numberOfColumns: 9 },
  fn: {
    setIsSound: () => {},
    setSize: () => {},
  },
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

  useEffect(() => {
    setIsSound(metadata.isSound);
  }, [metadata.isSound]);

  useEffect(() => {
    setSize({ numberOfRows: metadata.numberOfRows, numberOfColumns: metadata.numberOfColumns });
  }, [metadata.numberOfRows, metadata.numberOfColumns]);

  const contextData = useMemo<PikachuConfigContextType>(() => {
    return { isSound, size, fn: { setIsSound, setSize } };
  }, [isSound, size]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
