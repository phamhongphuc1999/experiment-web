'use client';

import { ComponentProps, useLayoutEffect, useRef, useState } from 'react';
import { MAX_CONNECT4_BOARD_SIZE } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { useConnect4Store } from 'src/states/connect4.state';
import HeaderConfig from './HeaderConfig';

export default function ConnectFourBoard(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { numberOfRows, numberOfColumns },
    steps,
  } = useConnect4Store();

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
                <div key={column} className="connect4-column flex flex-col-reverse justify-between">
                  {Array.from({ length: numberOfRows }).map((_, row) => {
                    const location = column * numberOfRows + row;
                    const _turn = steps[location];

                    return (
                      <div
                        key={location}
                        className={cn(
                          'bg-background flex cursor-pointer items-center justify-center',
                          _turn == undefined && 'connect4-item-turn-undefined'
                        )}
                        style={{ width: size, height: size, fontSize: size * 0.7 }}
                      >
                        {location}
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
