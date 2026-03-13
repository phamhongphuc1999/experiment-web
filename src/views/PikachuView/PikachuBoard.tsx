'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { PIKACHU_URL } from 'src/configs/pikachu.constance';
import { cn } from 'src/lib/utils';
import { usePikachuStateMachine } from 'src/state-machine/pikachu.state-machine';
import { usePikachuStore } from 'src/states/pikachu.state';
import { PositionType } from 'src/types/global';
import { PikachuMachineEvent, PikachuMachineStateType } from 'src/types/pikachu.type';
import PathDraw from './PathDraw';
import SuggestionDraw from './SuggestionDraw';

interface Props {
  size: number;
}

export default function PikachuBoard({ size }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { state, send } = usePikachuStateMachine();
  const { position, selectedPath, hintCountdown, hintRunning } = state.context;
  const {
    board,
    metadata: { numberOfRows, numberOfColumns, imgType },
  } = usePikachuStore();

  function onPieceClick(position: PositionType) {
    send({ type: PikachuMachineEvent.MOVE, position });
  }

  return (
    <div
      ref={ref}
      className="relative flex h-fit w-fit flex-col items-center gap-y-px"
      style={{ padding: `${size}px` }}
    >
      <div
        className="border-ring pointer-events-none absolute border-[0.5px]"
        style={{ top: size - 2, bottom: size - 2, left: size - 2, right: size - 2 }}
      />
      {state.value == PikachuMachineStateType.CHANGING && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      {Array.from({ length: numberOfRows }).map((_, _row) => {
        const row = _row + 1;
        return (
          <div key={row} className="flex items-center gap-x-px">
            {Array.from({ length: numberOfColumns }).map((_, _column) => {
              const column = _column + 1;
              const _index = board[row][column];
              const isSelected = position?.[1] == column && position?.[0] == row;
              const isPiece = board[row][column];

              return (
                <motion.div
                  key={`${row}_${column}`}
                  whileHover={isPiece ? { scale: 1.05 } : {}}
                  whileTap={isPiece ? { scale: 0.95 } : {}}
                  style={{ width: `${size - 1}px`, height: `${size - 1}px` }}
                  className={cn(
                    'transition-all duration-200',
                    isPiece
                      ? 'bg-secondary/80 hover:bg-secondary flex items-center justify-center overflow-hidden shadow-sm'
                      : 'bg-background',
                    isSelected && 'z-10 bg-orange-400/20 ring-2 ring-orange-400'
                  )}
                  onClick={() => onPieceClick([row, column])}
                >
                  <AnimatePresence>
                    {isPiece > 0 && (
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        src={
                          imgType == 'external'
                            ? `${PIKACHU_URL}/${_index}.png`
                            : `/pikachu/piece${_index}.png`
                        }
                        alt={`${row}_${column}`}
                        className="h-full w-full cursor-pointer object-contain p-1"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        );
      })}
      {selectedPath.length > 0 && <PathDraw size={size} selectedPath={selectedPath} />}
      {hintCountdown > 0 && hintRunning && <SuggestionDraw size={size} />}
    </div>
  );
}
