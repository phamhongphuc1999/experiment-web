'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ComponentProps, useMemo } from 'react';
import GameWinLines from 'src/components/games/GameWinLines';
import { cn } from 'src/lib/utils';
import { CaroGameType, TurnType, WinStateType } from 'src/types/caro.type';

interface CaroCellProps extends ComponentProps<'div'> {
  location: number;
  size: number;
  cellSize: number;
  turn: TurnType | undefined;
  winTypes: WinStateType['locations'][number] | undefined;
  gameType: CaroGameType;
  isCurrent: boolean;
  isWin: boolean;
  isBlindForceOver: boolean;
  shouldDisableBoard: boolean;
  onMove: (location: number) => void;
}

/**
 * Individual cell component for the Caro board.
 * Handles rendering of X/O icons, win lines, and cell styling.
 */
export default function CaroCell({
  location,
  size: cellSize,
  turn,
  winTypes,
  gameType,
  isCurrent,
  isWin,
  isBlindForceOver,
  shouldDisableBoard,
  onMove,
  ...props
}: CaroCellProps) {
  const icon = useMemo(() => {
    // In blind mode, only show icon if game is over or it's the last move
    if (gameType === 'blind' && !isWin && !isCurrent) {
      return '';
    }

    if (turn === 0) return 'x';
    if (turn === 1) return 'o';
    return '';
  }, [gameType, isWin, isCurrent, turn]);

  const cellClassName = useMemo(() => {
    const baseClasses = 'flex items-center justify-center transition-colors duration-200';

    // Player 0 (X) styling
    if (turn === 0) {
      return cn(
        baseClasses,
        'text-orange-400 font-bold',
        winTypes && 'bg-orange-400/10 relative',
        gameType === 'normal' ? 'hover:bg-orange-400/20!' : 'hover:bg-background/60',
        isCurrent && 'bg-orange-400/20!'
      );
    }

    // Player 1 (O) styling
    if (turn === 1) {
      return cn(
        baseClasses,
        'text-blue-400 font-bold',
        winTypes && 'bg-blue-400/10 relative',
        gameType === 'normal' ? 'hover:bg-blue-400/20!' : 'hover:bg-background/60',
        isCurrent && 'bg-blue-400/20!'
      );
    }

    // Empty cell styling
    return cn(
      baseClasses,
      'hover:bg-secondary/40',
      isWin || isBlindForceOver
        ? 'bg-background/80'
        : cn('bg-background', shouldDisableBoard ? 'cursor-default' : 'cursor-pointer')
    );
  }, [turn, winTypes, gameType, isCurrent, isWin, isBlindForceOver, shouldDisableBoard]);

  return (
    <div
      {...props}
      className={cellClassName}
      style={{
        width: cellSize,
        height: cellSize,
        fontSize: cellSize * 0.7,
        border: '0.5px solid var(--border)',
      }}
      onClick={() => onMove(location)}
    >
      <AnimatePresence mode="wait">
        {icon && (
          <motion.span
            key={icon}
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="flex h-full w-full items-center justify-center"
          >
            {icon}
          </motion.span>
        )}
      </AnimatePresence>
      <GameWinLines turn={turn} winTypes={winTypes} />
    </div>
  );
}
