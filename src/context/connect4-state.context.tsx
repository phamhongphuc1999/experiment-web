/* eslint-disable quotes */
'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { useConnect4Store } from 'src/states/connect4.state';
import { TurnType } from 'src/types/caro.type';

export type Connect4StateContextType = {
  playerText: string;
  isWin: boolean;
  fn: {
    move: (location: number) => void;
    undo: () => void;
    reset: (turn?: TurnType | undefined) => void;
  };
};

const connect4StateContextDefault: Connect4StateContextType = {
  playerText: '',
  isWin: false,
  fn: {
    move: () => {},
    undo: () => {},
    reset: () => {},
  },
};

const Connect4Context = createContext<Connect4StateContextType>(connect4StateContextDefault);

interface Props {
  children: ReactNode;
}

export default function Connect4StateProvider({ children }: Props) {
  const {
    turn,
    winState,
    stepsOrder,
    metadata: { numberOfRows, numberOfColumns },
    fn: { move, undo, reset },
  } = useConnect4Store();

  const isOverWin = Boolean(winState);

  const { playerText, isWin } = useMemo(() => {
    let playerTitle = "'s turn";
    if (isOverWin) playerTitle = ' win';
    let playerName = '';
    let _isWin = false;

    playerName = `Player ${turn + 1}`;
    _isWin = true;
    const isWin = _isWin && isOverWin;
    if (isWin) return { playerText: `${playerName}${playerTitle}`, isWin, isOver: isWin };
    else {
      if (stepsOrder.length == numberOfRows * numberOfColumns)
        return { playerText: "It's a draw", isWin: false, isOver: true };
      else return { playerText: `${playerName}${playerTitle}`, isWin: false, isOver: false };
    }
  }, [isOverWin, numberOfColumns, numberOfRows, stepsOrder.length, turn]);

  const handleMove = useCallback(
    (column: number) => {
      move(column);
    },
    [move]
  );

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleReset = useCallback(
    (turn?: TurnType) => {
      reset(turn);
    },
    [reset]
  );

  return (
    <Connect4Context.Provider
      value={{ playerText, isWin, fn: { move: handleMove, undo: handleUndo, reset: handleReset } }}
    >
      {children}
    </Connect4Context.Provider>
  );
}

export function useConnect4StateContext() {
  return useContext(Connect4Context);
}
