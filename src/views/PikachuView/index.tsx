'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { PIKACHU_PIECE_SIZE } from 'src/configs/pikachu.constance';
import {
  PikachuMachineContext,
  usePikachuStateMachine,
} from 'src/state-machine/pikachu.state-machine';
import { usePikachuStore } from 'src/states/pikachu.state';
import { PikachuMachineStateType } from 'src/types/pikachu.type';
import HeaderConfig from './HeaderConfig';
import PikachuBoard from './PikachuBoard';

function PikachuViewLayout() {
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(PIKACHU_PIECE_SIZE);
  const {
    metadata: { numberOfColumns, numberOfRows },
  } = usePikachuStore();
  const { state } = usePikachuStateMachine();

  useLayoutEffect(() => {
    if (!boardContainerRef.current) return;
    let frameId: number | null = null;

    const measure = () => {
      if (!boardContainerRef.current) return;
      const { width, height } = boardContainerRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const columnSize = width / (numberOfColumns + 2);
      const rowSize = height / (numberOfRows + 2);
      const nextSize = Math.min(columnSize, rowSize, PIKACHU_PIECE_SIZE);
      setSize((prevSize) => (Math.abs(prevSize - nextSize) < 0.5 ? prevSize : nextSize));
    };

    frameId = requestAnimationFrame(measure);

    const observer = new ResizeObserver(() => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    });
    observer.observe(boardContainerRef.current);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [numberOfColumns, numberOfRows]);

  return (
    <div className="mx-4 flex h-full justify-center gap-2 py-4">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2 overflow-hidden">
        <HeaderConfig />
        <div ref={boardContainerRef} className="flex min-h-0 w-full flex-1 justify-center">
          {state.value != PikachuMachineStateType.INITIAL && <PikachuBoard size={size} />}
        </div>
      </div>
    </div>
  );
}

export default function PikachuView() {
  return (
    <PikachuMachineContext.Provider>
      <PikachuViewLayout />
    </PikachuMachineContext.Provider>
  );
}
