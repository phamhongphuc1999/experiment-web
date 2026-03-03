'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
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

  // Keep refs in sync so the interval callback always reads fresh values
  // without needing to restart the interval on every state change.
  const isPausedRef = useRef(isPaused);
  const statusRef = useRef(metadata.status);
  const timeConfigTypeRef = useRef(metadata.timeConfigType);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    statusRef.current = metadata.status;
  }, [metadata.status]);

  useEffect(() => {
    timeConfigTypeRef.current = metadata.timeConfigType;
  }, [metadata.timeConfigType]);

  // Sync remainingTime from store when it changes (e.g. new game / next round)
  useEffect(() => {
    setRemainingTime((_) => metadata.remainingTime);
  }, [metadata.remainingTime]);

  // Single stable interval — only restarts when the "should be running" condition changes,
  // NOT every second when remainingTime ticks down.
  const shouldRun = metadata.status === 'playing' && !isPaused && metadata.timeConfigType !== 'off';

  useEffect(() => {
    if (!shouldRun) return;

    const timer = setInterval(() => {
      // Read from refs so we always have the latest values without restarting the interval.
      if (
        isPausedRef.current ||
        statusRef.current !== 'playing' ||
        timeConfigTypeRef.current === 'off'
      )
        return;

      setRemainingTime((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [shouldRun]);

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
