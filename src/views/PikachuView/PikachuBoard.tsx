'use client';

import { useEffect, useState } from 'react';
import { PIKACHU_PIECE_HEIGHT, PIKACHU_PIECE_WIDTH } from 'src/configs/constance';
import { PositionType } from 'src/global';
import { cn } from 'src/lib/utils';
import { isPositionEqual } from 'src/services';
import { findPossibleMoveWithoutIgnore, performPikachuMove } from 'src/services/pikachu.utils';
import { usePikachuStore } from 'src/states/pikachu.state';
import PathDraw from './PathDraw';

export default function PikachuBoard() {
  const [selectedPath, setSelectedPath] = useState<Array<PositionType>>([]);
  const {
    board,
    suggestion,
    fn: { move, updateSuggestion, changeBoard, createBoard },
    metadata: { numberOfRows, numberOfColumns },
  } = usePikachuStore();
  const [firstPiece, setFirstPiece] = useState<PositionType | undefined>(undefined);

  useEffect(() => {
    if (selectedPath.length === 0) return;

    const timer = setTimeout(() => {
      setSelectedPath([]);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedPath]);

  function onPieceClick(position: PositionType) {
    if (firstPiece == undefined) setFirstPiece(position);
    else if (firstPiece[0] == position[0] && firstPiece[1] == position[1]) setFirstPiece(undefined);
    else {
      const path = performPikachuMove({
        board,
        sourcePiece: firstPiece,
        targetPiece: position,
        numberOfRows,
        numberOfColumns,
      });
      if (path) {
        setSelectedPath(path);
        move(firstPiece, position);
        const _len = suggestion.length;
        if (
          isPositionEqual(suggestion[0], firstPiece) ||
          isPositionEqual(suggestion[0], position) ||
          isPositionEqual(suggestion[_len - 1], firstPiece) ||
          isPositionEqual(suggestion[_len - 1], position)
        ) {
          const path = findPossibleMoveWithoutIgnore({
            board,
            ignoreMoves: [firstPiece, position],
            numberOfRows,
            numberOfColumns,
          });
          if (path) updateSuggestion(path);
          else if (path === null) {
            new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
              changeBoard();
            });
          } else {
            new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
              createBoard('nextRound');
            });
          }
        }
      }
      setFirstPiece(undefined);
    }
  }

  return (
    <div
      className="relative"
      style={{
        marginTop: `${PIKACHU_PIECE_HEIGHT}px`,
        marginBottom: `${PIKACHU_PIECE_HEIGHT}px`,
        marginLeft: `${PIKACHU_PIECE_WIDTH}px`,
        marginRight: `${PIKACHU_PIECE_WIDTH}px`,
      }}
    >
      {Array.from({ length: numberOfRows }).map((_, _row) => {
        const row = _row + 1;
        return (
          <div key={row} className="flex items-center">
            {Array.from({ length: numberOfColumns }).map((_, _column) => {
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
      {selectedPath.length > 0 && <PathDraw selectedPath={selectedPath} />}
    </div>
  );
}
