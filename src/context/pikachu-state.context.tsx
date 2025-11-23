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

export type PikachuStateContextType = {
  remainingTime: number;
  isPaused: boolean;
  fn: {
    move: () => void;
    setRemainingTime: Dispatch<SetStateAction<number>>;
    setIsPaused: Dispatch<SetStateAction<boolean>>;
  };
};

const pikachuStateContextDefault: PikachuStateContextType = {
  remainingTime: 300,
  isPaused: false,
  fn: {
    move: () => {},
    setRemainingTime: () => {},
    setIsPaused: () => {},
  },
};

const PikachuContext = createContext<PikachuStateContextType>(pikachuStateContextDefault);

interface Props {
  children: ReactNode;
}

export default function PikachuStateProvider({ children }: Props) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { metadata, fn } = usePikachuStore();

  useEffect(() => {
    setRemainingTime((_) => metadata.remainingTime);
  }, [metadata.remainingTime]);

  useEffect(() => {
    if (
      remainingTime == 0 ||
      metadata.status != 'playing' ||
      isPaused ||
      metadata.timeConfigType == 'off'
    )
      return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime, metadata.status, isPaused, metadata.timeConfigType]);

  const _callback = useCallback(() => {
    fn.setMetadata({ remainingTime });
  }, [remainingTime, fn]);

  useEffect(() => {
    window.addEventListener('beforeunload', _callback);
    return () => {
      window.removeEventListener('beforeunload', _callback);
    };
  }, [_callback]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setIsPaused(true);
      else setIsPaused(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const _move = useCallback(() => {
    if (metadata.timeConfigType == 'cumulative') setRemainingTime((prev) => prev + 4);
  }, [metadata.timeConfigType]);

  return (
    <PikachuContext.Provider
      value={{ remainingTime, isPaused, fn: { move: _move, setRemainingTime, setIsPaused } }}
    >
      {children}
    </PikachuContext.Provider>
  );
}

export function usePikachuStateContext() {
  return useContext(PikachuContext);
}
