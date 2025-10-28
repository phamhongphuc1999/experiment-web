'use client';

import { ComponentProps, useLayoutEffect, useMemo, useRef, useState } from 'react';
import GameWinLines from 'src/components/games/GameWinLines';
import { MAX_CONNECT4_BOARD_SIZE } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { useConnect4Store } from 'src/states/connect4.state';
import HeaderConfig from './HeaderConfig';

export default function Connect4Board(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { numberOfRows, numberOfColumns },
    steps,
    winState,
    fn: { move },
  } = useConnect4Store();

  const { itemSize } = useMemo(() => {
    return { itemSize: size * 0.7 };
  }, [size]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const _column = (width - numberOfColumns - 1) / numberOfColumns;
      const _row = (height - numberOfRows - 1) / numberOfRows;
      setSize(Math.min(_column, _row, MAX_CONNECT4_BOARD_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numberOfColumns, numberOfRows]);

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
            className="bg-border border-px border-ring flex flex-wrap gap-px border"
          >
            {Array.from({ length: numberOfColumns }).map((_, column) => {
              return (
                <div
                  key={column}
                  className="connect4-column flex flex-col-reverse justify-between"
                  onClick={() => move(column)}
                >
                  {Array.from({ length: numberOfRows }).map((_, row) => {
                    const _turn = steps[column]?.[row];
                    const _winTypes = winState?.locations[`${row}_${column}`];

                    return (
                      <div
                        key={`${row}_${column}`}
                        className={cn(
                          'bg-background relative flex cursor-pointer items-center justify-center',
                          _turn == undefined && 'connect4-item-turn-undefined'
                        )}
                        style={{ width: size, height: size, fontSize: size * 0.7 }}
                      >
                        {_turn == 0 && (
                          <div
                            className="border-chart-1 rounded-full border-4"
                            style={{ width: itemSize, height: itemSize }}
                          />
                        )}
                        {_turn == 1 && (
                          <div
                            className="border-chart-2 rounded-full border-4"
                            style={{ width: itemSize, height: itemSize }}
                          />
                        )}
                        <GameWinLines turn={_turn} winTypes={_winTypes} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
