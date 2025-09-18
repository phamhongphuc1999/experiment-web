'use client';

import { ComponentProps, useLayoutEffect, useRef, useState } from 'react';
import { MAX_CARO_SIZE } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { isWinBlock } from 'src/services/caro.utils';
import { useCaroBoardStore } from 'src/states/caroBoard.state';
import { useCaroConfigStore } from 'src/states/caroConfig.state';
import ConfigColumn from './ConfigColumn';

export default function CaroBoard(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { numberOfRows, numberOfColumns } = useCaroConfigStore();
  const [size, setSize] = useState(0);
  const {
    steps,
    winState,
    events: { move },
  } = useCaroBoardStore();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const _column = width / numberOfColumns;
      const _row = height / numberOfRows;
      setSize(Math.min(_column, _row, MAX_CARO_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numberOfColumns, numberOfRows]);

  return (
    <div ref={ref} {...props} className={cn('flex justify-center', props.className)}>
      {size > 0 && (
        <div
          style={{
            width: numberOfColumns * size + numberOfColumns + 1,
            height: numberOfRows * size + numberOfRows + 1,
          }}
          className="bg-border relative flex flex-wrap gap-px border"
        >
          <ConfigColumn className="absolute top-0 -left-[var(--caro-left-config)]" />
          {Array.from({ length: numberOfRows * numberOfColumns }).map((_, location) => {
            const _turn = steps[location];
            let _isWinBlock = false;
            if (winState) _isWinBlock = isWinBlock(winState, location);

            return (
              <div
                key={location}
                className={cn(
                  'bg-background flex cursor-pointer items-center justify-center',
                  _turn == 0 && cn('text-chart-5', _isWinBlock && 'border-chart-5 border'),
                  _turn == 1 && cn('text-chart-2', _isWinBlock && 'border-chart-2 border')
                )}
                style={{ width: size, height: size }}
                onClick={() => {
                  if (_turn == undefined) move(location);
                }}
              >
                {_turn == undefined ? location : _turn == 0 ? 'x' : 'o'}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
