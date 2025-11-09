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
  fn: {
    setIsSound: Dispatch<SetStateAction<boolean>>;
  };
};

const pikachuConfigContextDefault: PikachuConfigContextType = {
  isSound: true,
  fn: {
    setIsSound: () => {},
  },
};

const PikachuConfigContext = createContext<PikachuConfigContextType>(pikachuConfigContextDefault);

interface Props {
  children: ReactNode;
}

export default function PikachuConfigProvider({ children }: Props) {
  const { metadata } = usePikachuStore();
  const [isSound, setIsSound] = useState(metadata.isSound);

  useEffect(() => {
    setIsSound(metadata.isSound);
  }, [metadata.isSound]);

  const contextData = useMemo<PikachuConfigContextType>(() => {
    return { isSound, fn: { setIsSound } };
  }, [isSound]);

  return (
    <PikachuConfigContext.Provider value={contextData}>{children}</PikachuConfigContext.Provider>
  );
}

export function usePikachuConfigContext() {
  return useContext(PikachuConfigContext);
}
