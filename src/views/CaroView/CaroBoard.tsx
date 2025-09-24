'use client';

import { ComponentProps, useLayoutEffect, useRef, useState } from 'react';
import { MAX_CARO_SIZE } from 'src/configs/constance';
import useCaroAction from 'src/hooks/useCaroAction';
import useShouldDisableBoard from 'src/hooks/useShouldDisableBoard';
import { cn } from 'src/lib/utils';
import { isWinBlock } from 'src/services/caro.utils';
import { useCaroStore } from 'src/states/caro.state';
import HeaderConfig from './HeaderConfig';

export default function CaroBoard(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { numberOfRows, numberOfColumns },
    steps,
    winState,
  } = useCaroStore();
  const { move } = useCaroAction();
  const { shouldDisableBoard } = useShouldDisableBoard();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const _column = (width - numberOfColumns - 1) / numberOfColumns;
      const _row = (height - numberOfRows - 1) / numberOfRows;
      setSize(Math.min(_column, _row, MAX_CARO_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numberOfColumns, numberOfRows]);

  function onMove(_turn: 0 | 1, location: number) {
    if ((_turn == undefined || !winState) && !shouldDisableBoard) move(location);
  }

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <HeaderConfig />
      <div ref={ref} className="flex h-full w-full justify-center overflow-hidden">
        {size > 0 && (
          <div
            style={{
              width: numberOfColumns * size + numberOfColumns + 1,
              height: numberOfRows * size + numberOfRows + 1,
            }}
            className="bg-border border-px flex flex-wrap gap-px border"
          >
            {Array.from({ length: numberOfRows * numberOfColumns }).map((_, location) => {
              const _turn = steps[location];
              let _isWinBlock = false;
              if (winState) _isWinBlock = isWinBlock(winState, location);

              return (
                <div
                  key={location}
                  className={cn(
                    'flex items-center justify-center',
                    _turn == 0 &&
                      cn('text-chart-1 hover:bg-chart-1/5', _isWinBlock && 'border-chart-1 border'),
                    _turn == 1 &&
                      cn('text-chart-2 hover:bg-chart-2/5', _isWinBlock && 'border-chart-2 border'),
                    _turn == undefined && 'hover:bg-background/60',
                    winState
                      ? 'bg-background/50'
                      : cn(
                          'bg-background',
                          shouldDisableBoard ? 'cursor-default' : 'cursor-pointer'
                        )
                  )}
                  style={{ width: size, height: size, fontSize: size * 0.7 }}
                  onClick={() => onMove(_turn, location)}
                >
                  {_turn == undefined ? '' : _turn == 0 ? 'x' : 'o'}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
