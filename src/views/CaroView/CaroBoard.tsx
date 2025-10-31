'use client';

import { ComponentProps, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import GameWinLines from 'src/components/games/GameWinLines';
import { MAX_CARO_BOARD_SIZE } from 'src/configs/constance';
import { useCaroStateContext } from 'src/context/caro-state.context';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { cn } from 'src/lib/utils';
import { useCaroStore } from 'src/states/caro.state';
import HeaderConfig from './HeaderConfig';

export default function CaroBoard(props: ComponentProps<'div'>) {
  const caroRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);
  const {
    metadata: { size: boardSize, isOverride, gameType, isMute },
    numberOfBlindError,
    isBlindForceOver,
    steps,
    stepsOrder,
    winState,
    turn,
    fn: { countNumberOfBlindError },
  } = useCaroStore();
  const { playMove, playError } = useSoundtrack();
  const {
    shouldDisableBoard,
    fn: { move },
  } = useCaroStateContext();

  const errorCount = useMemo(() => {
    return numberOfBlindError[0] + numberOfBlindError[1];
  }, [numberOfBlindError]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      const _column = (width - boardSize - 1) / boardSize;
      const _row = (height - boardSize - 1) / boardSize;
      setSize(Math.min(_column, _row, MAX_CARO_BOARD_SIZE));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [boardSize]);

  function onMove(location: number) {
    const isWin = winState != undefined || isBlindForceOver == true;

    if (gameType == 'blind' && steps[location] != undefined) {
      countNumberOfBlindError(turn);
      playError(isMute);
    }

    if (isOverride) {
      if (!isWin && !shouldDisableBoard && steps[location] != turn) {
        playMove(isMute);
        move(location);
      } else playError(isMute);
    } else if (steps[location] == undefined && !isWin && !shouldDisableBoard) {
      playMove(isMute);
      move(location);
    } else playError(isMute);
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

  const isWin = useMemo(() => {
    return winState != undefined || isBlindForceOver == true;
  }, [isBlindForceOver, winState]);

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <HeaderConfig />
      <div ref={ref} className="flex h-full w-full justify-center overflow-hidden">
        {size > 0 && (
          <div
            ref={caroRef}
            style={{
              width: boardSize * size + boardSize + 1,
              height: boardSize * size + boardSize + 1,
            }}
            className="bg-border border-px border-ring flex flex-wrap gap-px border"
          >
            {Array.from({ length: boardSize * boardSize }).map((_, location) => {
              const _turn = steps[location];
              const _winTypes = winState?.locations?.[location];
              let _icon = '';

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
                        gameType == 'normal' ? 'hover:bg-chart-1/30!' : 'hover:bg-background/60',
                        isCurrent && 'bg-chart-1/20!'
                      ),
                    _turn == 1 &&
                      cn(
                        'text-chart-2',
                        _winTypes && 'border-chart-2 relative border',
                        gameType == 'normal' ? 'hover:bg-chart-2/30!' : 'hover:bg-background/60',
                        isCurrent && 'bg-chart-2/20!'
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
                  <GameWinLines turn={_turn} winTypes={_winTypes} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
