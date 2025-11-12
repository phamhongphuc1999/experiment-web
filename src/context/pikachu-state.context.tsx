'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePikachuStore } from 'src/states/pikachu.state';

const configs: { [key: number]: number } = { 9: 3, 6: 2, 4: 2 };

export type PikachuStateContextType = {
  remainingTime: number;
  fn: {
    setRemainingTime: Dispatch<SetStateAction<number>>;
    move: () => void;
  };
};

const pikachuStateContextDefault: PikachuStateContextType = {
  remainingTime: 300,
  fn: {
    setRemainingTime: () => {},
    move: () => {},
  },
};

const PikachuContext = createContext<PikachuStateContextType>(pikachuStateContextDefault);

interface Props {
  children: ReactNode;
}

export default function PikachuStateProvider({ children }: Props) {
  const [remainingTime, setRemainingTime] = useState(0);
  const { metadata, fn } = usePikachuStore();

  useEffect(() => {
    setRemainingTime((_) => metadata.remainingTime);
  }, [metadata.remainingTime]);

  useEffect(() => {
    if (remainingTime == 0 || metadata.status != 'playing') return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime, metadata.status]);

  const _callback = useCallback(() => {
    fn.setMetadata({ remainingTime });
  }, [remainingTime, fn]);

  useEffect(() => {
    window.addEventListener('beforeunload', _callback);
    return () => {
      window.removeEventListener('beforeunload', _callback);
    };
  }, [_callback]);

  const _move = useCallback(() => {
    if (metadata.timeConfigType == 'cumulative')
      setRemainingTime((prev) => prev + configs[metadata.numberOfRows]);
  }, [metadata.timeConfigType, metadata.numberOfRows]);

  return (
    <PikachuContext.Provider value={{ remainingTime, fn: { setRemainingTime, move: _move } }}>
      {children}
    </PikachuContext.Provider>
  );
}

export function usePikachuStateContext() {
  return useContext(PikachuContext);
}
