'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PIKACHU_PIECE_SIZE } from 'src/configs/constance';
import PikachuStateProvider from 'src/context/pikachu-state.context';
import { usePikachuStore } from 'src/states/pikachu.state';
import HeaderConfig from './HeaderConfig';
import PikachuBoard from './PikachuBoard';

export default function PikachuView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(PIKACHU_PIECE_SIZE);
  const {
    metadata: { numberOfColumns, numberOfRows, status },
  } = usePikachuStore();
  const [hintCountdown, setHintCountdown] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (hintCountdown == 0) return;
    const timeout = setInterval(() => {
      setHintCountdown((preValue) => preValue - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [hintCountdown]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const columnSize = width / (numberOfColumns + 2);
      const rowSize = height / (numberOfRows + 2);
      setSize(Math.min(columnSize, rowSize, PIKACHU_PIECE_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numberOfColumns, numberOfRows]);

  return (
    <PikachuStateProvider>
      <div className="mx-4 flex h-full justify-center gap-2 py-4">
        <div
          ref={ref}
          className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2 overflow-hidden"
        >
          <HeaderConfig
            hintCountdown={hintCountdown}
            setHintCountdown={setHintCountdown}
            setShowHint={setShowHint}
          />
          <div className="flex min-h-0 w-full flex-1 justify-center">
            {status != 'init' && (
              <PikachuBoard
                hintCountdown={hintCountdown}
                size={size}
                showHint={showHint}
                setShowHint={setShowHint}
              />
            )}
          </div>
        </div>
      </div>
    </PikachuStateProvider>
  );
}
