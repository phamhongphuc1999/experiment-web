'use client';

import { ComponentProps, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { MAX_CARO_SIZE } from 'src/configs/constance';
import useCaroAction from 'src/hooks/useCaroAction';
import useShouldDisableBoard from 'src/hooks/useShouldDisableBoard';
import { cn } from 'src/lib/utils';
import { useCaroStore } from 'src/states/caro.state';
import HeaderConfig from './HeaderConfig';

export default function CaroBoard(props: ComponentProps<'div'>) {
  const caroRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { numberOfRows, numberOfColumns, isOverride, gameType },
    numberOfBlindError,
    isBlindForceOver,
    steps,
    stepsOrder,
    winState,
    turn: storageTurn,
    events: { countNumberOfBlindError },
  } = useCaroStore();
  const { move } = useCaroAction();
  const { shouldDisableBoard } = useShouldDisableBoard();

  const errorCount = useMemo(() => {
    return numberOfBlindError[0] + numberOfBlindError[1];
  }, [numberOfBlindError]);

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

  function onMove(location: number) {
    const isWin = winState != undefined || isBlindForceOver == true;

    if (gameType == 'blind') {
      if (steps[location] != undefined) countNumberOfBlindError(storageTurn);
    }

    if (isOverride) {
      if (!isWin && !shouldDisableBoard && steps[location] != storageTurn) move(location);
    } else if (steps[location] == undefined && !isWin && !shouldDisableBoard) move(location);
  }

  useEffect(() => {
    if (errorCount > 0 && gameType == 'blind') {
      const el = caroRef.current;
      if (!el) return;

      el.classList.remove('shake-animation');
      void el.offsetWidth;
      el.classList.add('shake-animation');

      const handle = () => el.classList.remove('shake-animation');
      el.addEventListener('animationend', handle);
      return () => el.removeEventListener('animationend', handle);
    }
  }, [errorCount, gameType]);

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <HeaderConfig />
      <div ref={ref} className="flex h-full w-full justify-center overflow-hidden">
        {size > 0 && (
          <div
            ref={caroRef}
            style={{
              width: numberOfColumns * size + numberOfColumns + 1,
              height: numberOfRows * size + numberOfRows + 1,
            }}
            className="bg-border border-px border-ring flex flex-wrap gap-px border"
          >
            {Array.from({ length: numberOfRows * numberOfColumns }).map((_, location) => {
              const _turn = steps[location];
              const _winTypes = winState?.locations?.[location];
              let _icon = '';
              const isWin = winState != undefined || isBlindForceOver == true;
              if (
                gameType != 'blind' ||
                (gameType == 'blind' && (isWin || stepsOrder.at(-1) == location))
              ) {
                if (_turn == 0) _icon = 'x';
                else if (_turn == 1) _icon = 'o';
              }
              const isCurrent = stepsOrder.at(-1) == location;

              return (
                <div
                  key={location}
                  className={cn(
                    'flex items-center justify-center',
                    _turn == 0 &&
                      cn(
                        'text-chart-1',
                        _winTypes && 'border-chart-1 relative border',
                        gameType == 'normal' ? 'hover:!bg-chart-1/30' : 'hover:bg-background/60',
                        isCurrent && '!bg-chart-1/20'
                      ),
                    _turn == 1 &&
                      cn(
                        'text-chart-2',
                        _winTypes && 'border-chart-2 relative border',
                        gameType == 'normal' ? 'hover:!bg-chart-2/30' : 'hover:bg-background/60',
                        isCurrent && '!bg-chart-2/20'
                      ),
                    _turn == undefined && 'hover:bg-background/60',
                    winState || isBlindForceOver
                      ? 'bg-background/80'
                      : cn(
                          'bg-background',
                          shouldDisableBoard ? 'cursor-default' : 'cursor-pointer'
                        )
                  )}
                  style={{ width: size, height: size, fontSize: size * 0.7 }}
                  onClick={() => onMove(location)}
                >
                  {_icon}
                  {_winTypes?.horizontal && (
                    <div
                      className={cn(
                        'absolute top-1/2 h-px w-full -translate-y-1/2',
                        _turn == 0 ? 'bg-chart-1' : 'bg-chart-2'
                      )}
                    />
                  )}
                  {_winTypes?.vertical && (
                    <div
                      className={cn(
                        'absolute left-1/2 h-full w-px -translate-x-1/2',
                        _turn == 0 ? 'bg-chart-1' : 'bg-chart-2'
                      )}
                    />
                  )}
                  {_winTypes?.leftDiagonal && (
                    <div
                      className={cn(
                        'absolute top-1/2 left-1/2 h-px w-[140%] origin-center -translate-1/2 rotate-45',
                        _turn == 0 ? 'bg-chart-1' : 'bg-chart-2'
                      )}
                    />
                  )}
                  {_winTypes?.rightDiagonal && (
                    <div
                      className={cn(
                        'absolute top-1/2 left-1/2 h-px w-[140%] origin-center -translate-1/2 -rotate-45',
                        _turn == 0 ? 'bg-chart-1' : 'bg-chart-2'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
