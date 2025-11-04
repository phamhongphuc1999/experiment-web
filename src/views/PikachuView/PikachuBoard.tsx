'use client';

import { ComponentProps, useState } from 'react';
import { PIKACHU_PIECE_HEIGHT, PIKACHU_PIECE_WIDTH } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';
import HeaderConfig from './HeaderConfig';
import { PositionType } from 'src/global';

export default function PikachuBoard(props: ComponentProps<'div'>) {
  const {
    board,
    moveBoard,
    metadata: { numberOfRows, numberOfColumns, status },
    fn: { move },
  } = usePikachuStore();
  const [firstPiece, setFirstPiece] = useState<PositionType | undefined>(undefined);

  function onPieceClick(position: PositionType) {
    if (firstPiece == undefined) setFirstPiece(position);
    else if (firstPiece.row == position.row && firstPiece.column == position.column)
      setFirstPiece(undefined);
    else {
      move(firstPiece, position);
      setFirstPiece(undefined);
    }
  }

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <HeaderConfig />
      <div className="flex justify-center">
        {status == 'playing' && (
          <div className="flex flex-col">
            {Array.from({ length: numberOfRows }).map((_, row) => {
              return (
                <div key={row} className="flex items-center">
                  {Array.from({ length: numberOfColumns }).map((_, column) => {
                    const _index = board[row][column];
                    const isSelected = firstPiece?.column == column && firstPiece.row == row;
                    const isNoMove = moveBoard[row][column];

                    return (
                      <div
                        key={`${row}_${column}`}
                        style={{
                          width: `${PIKACHU_PIECE_WIDTH}px`,
                          height: `${PIKACHU_PIECE_HEIGHT}px`,
                        }}
                        className="border border-transparent hover:border-[red]"
                        onClick={() => onPieceClick({ row, column })}
                      >
                        <img
                          src={`/pikachu/pieces${_index}.png`}
                          alt={`${row}_${column}`}
                          className={cn(
                            'cursor-pointer',
                            isSelected && 'opacity-50',
                            !isNoMove && 'opacity-0'
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
