import { PikachuMoveParamsType } from 'src/global';
import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

const defaultBoard = [
  [0, 0, 0, 0, 0],
  [0, 10, 16, 11, 0],
  [0, 28, 9, 16, 0],
  [0, 9, 28, 34, 0],
  [0, 34, 10, 11, 0],
  [0, 0, 0, 0, 0],
];

const defaultParams: PikachuMoveParamsType = {
  board: defaultBoard,
  sourcePiece: [1, 3],
  targetPiece: [4, 3],
  numberOfRows: 4,
  numberOfColumns: 3,
};

describe('Test pikachu transform', () => {
  it('normalBoard', () => {
    const board = pikachuBoardTransformByRound(defaultParams, 1);
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 10, 16, 0, 0],
      [0, 28, 9, 16, 0],
      [0, 9, 28, 34, 0],
      [0, 34, 10, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('collapseToBottom', () => {
    let board = pikachuBoardTransformByRound(defaultParams, 2);
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 10, 16, 0, 0],
      [0, 28, 9, 0, 0],
      [0, 9, 28, 16, 0],
      [0, 34, 10, 34, 0],
      [0, 0, 0, 0, 0],
    ]);
    board = pikachuBoardTransformByRound(
      {
        board,
        sourcePiece: [4, 1],
        targetPiece: [4, 3],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 16, 0, 0],
      [0, 10, 9, 0, 0],
      [0, 28, 28, 0, 0],
      [0, 9, 10, 16, 0],
      [0, 0, 0, 0, 0],
    ]);
    board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 5, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 1, 16, 0, 0],
          [0, 16, 5, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [2, 1],
        targetPiece: [3, 1],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 5, 16, 0, 0],
      [0, 16, 5, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('divideByHorizontalCenter1', () => {
    let board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 10, 16, 34, 0],
          [0, 28, 0, 10, 0],
          [0, 0, 28, 5, 0],
          [0, 16, 34, 5, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [2, 1],
        targetPiece: [3, 2],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 10, 16, 34, 0],
      [0, 0, 0, 10, 0],
      [0, 0, 0, 5, 0],
      [0, 16, 34, 5, 0],
      [0, 0, 0, 0, 0],
    ]);
    board = pikachuBoardTransformByRound(
      {
        board,
        sourcePiece: [1, 1],
        targetPiece: [2, 3],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 16, 34, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 5, 0],
      [0, 16, 34, 5, 0],
      [0, 0, 0, 0, 0],
    ]);
    board = pikachuBoardTransformByRound(
      {
        board,
        sourcePiece: [4, 1],
        targetPiece: [1, 2],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 34, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 5, 0],
      [0, 0, 34, 5, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
