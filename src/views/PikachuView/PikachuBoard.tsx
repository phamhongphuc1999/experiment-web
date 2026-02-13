'use client';

import cloneDeep from 'lodash.clonedeep';
import { AnimatePresence, motion } from 'motion/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { PIKACHU_URL } from 'src/configs/constance';
import { usePikachuStateContext } from 'src/context/pikachu-state.context';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { cn } from 'src/lib/utils';
import { getRandom, isPositionEqual, sleep } from 'src/services';
import { pikachuBoardFormatting } from 'src/services/pikachu/pikachu-formatting.utils';
import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { findPossibleMove, performPikachuMove } from 'src/services/pikachu/pikachu.utils';
import { usePikachuStore } from 'src/states/pikachu.state';
import { PositionType } from 'src/types/global';
import PathDraw from './PathDraw';
import SuggestionDraw from './SuggesstionDraw';

interface Props {
  size: number;
  hintCountdown: number;
  showHint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
}

export default function PikachuBoard({ size, hintCountdown, showHint, setShowHint }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedPath, setSelectedPath] = useState<Array<PositionType>>([]);
  const {
    board,
    suggestion,
    fn: { movePath, moveChangeBoard, createBoard, setMetadata },
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
      roundList,
      gameType,
      randomRoundListIndex,
    },
  } = usePikachuStore();
  const {
    fn: { move, setRemainingTime },
  } = usePikachuStateContext();
  const [firstPiece, setFirstPiece] = useState<PositionType | undefined>(undefined);
  const { playMove, playError } = useSoundtrack();
  const [randomCounter, setRandomCounter] = useState(1);

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
      if (showHint && hintCountdown > 0) {
        const latestIndex = suggestion.length - 1;
        const firstCheck =
          isPositionEqual(firstPiece, suggestion[0]) ||
          isPositionEqual(firstPiece, suggestion[latestIndex]);
        const secondCheck =
          isPositionEqual(position, suggestion[0]) ||
          isPositionEqual(position, suggestion[latestIndex]);
        if (firstCheck && secondCheck) setShowHint(false);
      }
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
        const transformType =
          gameType != 'randomBoard' ? roundList[round - 1] : roundList[randomRoundListIndex];
        pikachuBoardTransformation(
          { board: cloneBoard, moves: [firstPiece, position], numberOfRows, numberOfColumns },
          transformType
        );
        playMove(isSound);
        setSelectedPath(path);
        if (gameType == 'randomBoard') {
          if (randomCounter >= 5) {
            const randomRoundListIndex = getRandom(roundList.length);
            setMetadata({ randomRoundListIndex });
            setRandomCounter(1);
            pikachuBoardFormatting(
              { board: cloneBoard, numberOfRows, numberOfColumns },
              roundList[randomRoundListIndex]
            );
          } else setRandomCounter((preValue) => preValue + 1);
        }
        const possiblePath = findPossibleMove({
          board: cloneBoard,
          numberOfRows,
          numberOfColumns,
          numberOfLines,
        });
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
            if (gameType != 'randomBoard') createBoard('nextRound');
            else createBoard('newGame');
          });
        }
      } else playError(isSound);
      setFirstPiece(undefined);
    }
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
      {status == 'paused' && <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md" />}
      {selectedPath.length > 0 && <PathDraw size={size} selectedPath={selectedPath} />}
      {hintCountdown > 0 && showHint && <SuggestionDraw size={size} />}
    </div>
  );
}
