'use client';

import { ComponentProps, useMemo } from 'react';
import GameWinLines from 'src/components/games/GameWinLines';
import { CaroGameType, TurnType, WinStateType } from 'src/global';
import { cn } from 'src/lib/utils';

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
    const baseClasses = 'flex items-center justify-center';

    // Player 0 (X) styling
    if (turn === 0) {
      return cn(
        baseClasses,
        'text-chart-1',
        winTypes && 'border-chart-1 relative border',
        gameType === 'normal' ? 'hover:bg-chart-1/30!' : 'hover:bg-background/60',
        isCurrent && 'bg-chart-1/20!'
      );
    }

    // Player 1 (O) styling
    if (turn === 1) {
      return cn(
        baseClasses,
        'text-chart-2',
        winTypes && 'border-chart-2 relative border',
        gameType === 'normal' ? 'hover:bg-chart-2/30!' : 'hover:bg-background/60',
        isCurrent && 'bg-chart-2/20!'
      );
    }

    // Empty cell styling
    return cn(
      baseClasses,
      'hover:bg-background/60',
      isWin || isBlindForceOver
        ? 'bg-background/80'
        : cn('bg-background', shouldDisableBoard ? 'cursor-default' : 'cursor-pointer')
    );
  }, [turn, winTypes, gameType, isCurrent, isWin, isBlindForceOver, shouldDisableBoard]);

  return (
    <div
      {...props}
      className={cellClassName}
      style={{ width: cellSize, height: cellSize, fontSize: cellSize * 0.7 }}
      onClick={() => onMove(location)}
    >
      {icon}
      <GameWinLines turn={turn} winTypes={winTypes} />
    </div>
  );
}
