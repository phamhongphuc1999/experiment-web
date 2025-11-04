'use client';

import { useState } from 'react';
import {
  PIKACHU_NUMBER_OF_COLUMNS,
  PIKACHU_NUMBER_OF_ROWS,
  PIKACHU_PIECE_HEIGHT,
  PIKACHU_PIECE_WIDTH,
} from 'src/configs/constance';
import { PositionType } from 'src/global';
import { cn } from 'src/lib/utils';
import { findPossibleMove, performPikachuMove } from 'src/services/pikachu.utils';
import { usePikachuStore } from 'src/states/pikachu.state';
import { useDebounceCallback } from 'usehooks-ts';

export default function PikachuBoard() {
  const {
    board,
    fn: { move, updateSuggestions, changeBoard },
  } = usePikachuStore();
  const [firstPiece, setFirstPiece] = useState<PositionType | undefined>(undefined);

  const checkPossibleMove = useDebounceCallback(() => {
    const path = findPossibleMove(board);
    if (path) updateSuggestions([path]);
    else changeBoard();
  }, 5000);

  function onPieceClick(position: PositionType) {
    if (firstPiece == undefined) setFirstPiece(position);
    else if (firstPiece[0] == position[0] && firstPiece[1] == position[1]) setFirstPiece(undefined);
    else {
      const path = performPikachuMove({
        board,
        sourcePiece: firstPiece,
        targetPiece: position,
      });
      if (path) {
        move(firstPiece, position);
        checkPossibleMove();
      }
      setFirstPiece(undefined);
    }
  }

  return (
    <div
      style={{
        marginTop: `${PIKACHU_PIECE_HEIGHT}px`,
        marginBottom: `${PIKACHU_PIECE_HEIGHT}px`,
        marginLeft: `${PIKACHU_PIECE_WIDTH}px`,
        marginRight: `${PIKACHU_PIECE_WIDTH}px`,
      }}
    >
      {Array.from({ length: PIKACHU_NUMBER_OF_ROWS }).map((_, _row) => {
        const row = _row + 1;
        return (
          <div key={row} className="flex items-center">
            {Array.from({ length: PIKACHU_NUMBER_OF_COLUMNS }).map((_, _column) => {
              const column = _column + 1;
              const _index = board[row][column];
              const isSelected = firstPiece?.[1] == column && firstPiece?.[0] == row;
              const isPiece = board[row][column];

              return (
                <div
                  key={`${row}_${column}`}
                  style={{
                    width: `${PIKACHU_PIECE_WIDTH}px`,
                    height: `${PIKACHU_PIECE_HEIGHT}px`,
                  }}
                  className={cn('border border-transparent', isPiece && 'hover:border-[red]')}
                  onClick={() => onPieceClick([row, column])}
                >
                  {isPiece > 0 && (
                    <img
                      src={`/pikachu/pieces${_index}.png`}
                      alt={`${row}_${column}`}
                      className={cn(isSelected && 'opacity-50', 'cursor-pointer')}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
