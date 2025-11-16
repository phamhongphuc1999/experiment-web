'use client';

import cloneDeep from 'lodash.clonedeep';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  PIKACHU_PIECE_SIZE,
  PIKACHU_URL,
  pikachuRoundTransformations,
} from 'src/configs/constance';
import { usePikachuStateContext } from 'src/context/pikachu-state.context';
import { PositionType } from 'src/global';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { cn } from 'src/lib/utils';
import { sleep } from 'src/services';
import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { findPossibleMove, performPikachuMove } from 'src/services/pikachu/pikachu.utils';
import { usePikachuStore } from 'src/states/pikachu.state';
import PathDraw from './PathDraw';

export default function PikachuBoard() {
  const [selectedPath, setSelectedPath] = useState<Array<PositionType>>([]);
  const {
    board,
    fn: { movePath, moveChangeBoard, createBoard },
    metadata: {
      numberOfRows,
      numberOfColumns,
      numberOfLines,
      isSound,
      isChangeBoard,
      round,
      status,
      maxRemainingTime,
      imgType,
    },
  } = usePikachuStore();
  const {
    fn: { move, setRemainingTime },
  } = usePikachuStateContext();
  const [firstPiece, setFirstPiece] = useState<PositionType | undefined>(undefined);
  const { playMove, playError } = useSoundtrack();

  useEffect(() => {
    if (selectedPath.length === 0) return;

    const timer = setTimeout(() => {
      setSelectedPath([]);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedPath]);

  function onPieceClick(position: PositionType) {
    if (board[position[0]][position[1]] == 0) return;
    if (firstPiece == undefined) setFirstPiece(position);
    else if (firstPiece[0] == position[0] && firstPiece[1] == position[1]) {
      setFirstPiece(undefined);
      playError(isSound);
    } else {
      const cloneBoard = cloneDeep(board);
      const path = performPikachuMove({
        board: cloneBoard,
        sourcePiece: firstPiece,
        targetPiece: position,
        numberOfRows,
        numberOfColumns,
        numberOfLines,
      });
      if (path) {
        pikachuBoardTransformation(
          { board: cloneBoard, moves: [firstPiece, position], numberOfRows, numberOfColumns },
          pikachuRoundTransformations[round - 1]
        );
        playMove(isSound);
        const possiblePath = findPossibleMove({
          board: cloneBoard,
          numberOfRows,
          numberOfColumns,
          numberOfLines,
        });
        setSelectedPath(path);
        if (possiblePath)
          sleep(150).then(() => {
            move();
            movePath(cloneBoard, possiblePath);
          });
        else if (possiblePath === null) {
          toast.warning('Out of move, please change board');
          sleep(150).then(() => {
            move();
            moveChangeBoard(cloneBoard);
          });
        } else {
          sleep(200).then(() => {
            setRemainingTime((_) => maxRemainingTime);
            createBoard('nextRound');
          });
        }
      } else playError(isSound);
      setFirstPiece(undefined);
    }
  }

  return (
    <div
      className="border-ring relative flex flex-col gap-y-px border"
      style={{
        marginTop: `${PIKACHU_PIECE_SIZE}px`,
        marginBottom: `${PIKACHU_PIECE_SIZE}px`,
        marginLeft: `${PIKACHU_PIECE_SIZE}px`,
        marginRight: `${PIKACHU_PIECE_SIZE}px`,
      }}
    >
      {isChangeBoard && <div className="absolute inset-0 bg-black/50" />}
      {Array.from({ length: numberOfRows }).map((_, _row) => {
        const row = _row + 1;
        return (
          <div key={row} className="flex items-center gap-x-px">
            {Array.from({ length: numberOfColumns }).map((_, _column) => {
              const column = _column + 1;
              const _index = board[row][column];
              const isSelected = firstPiece?.[1] == column && firstPiece?.[0] == row;
              const isPiece = board[row][column];

              return (
                <div
                  key={`${row}_${column}`}
                  style={{ width: `${PIKACHU_PIECE_SIZE}px`, height: `${PIKACHU_PIECE_SIZE}px` }}
                  className={cn(
                    isPiece
                      ? 'hover:bg-ring/50 bg-secondary flex items-center justify-center hover:rounded-md'
                      : 'bg-background',
                    isSelected && 'bg-ring rounded-md'
                  )}
                  onClick={() => onPieceClick([row, column])}
                >
                  {isPiece > 0 && (
                    <img
                      src={
                        imgType == 'external'
                          ? `${PIKACHU_URL}/${_index}.png`
                          : `/pikachu/piece${_index}.png`
                      }
                      alt={`${row}_${column}`}
                      className="cursor-pointer"
                      style={{ width: PIKACHU_PIECE_SIZE - 10, height: PIKACHU_PIECE_SIZE - 10 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {status == 'paused' && <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md" />}
      {selectedPath.length > 0 && <PathDraw selectedPath={selectedPath} />}
    </div>
  );
}
