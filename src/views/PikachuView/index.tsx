'use client';

import { useLayoutEffect, useRef, useState } from 'react';
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
          <HeaderConfig />
          <div className="flex min-h-0 w-full flex-1 justify-center">
            {status != 'init' && <PikachuBoard size={size} />}
          </div>
        </div>
      </div>
    </PikachuStateProvider>
  );
}
