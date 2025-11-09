import { analyticPikachuMove } from 'src/services/pikachu';
import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('normalBoard', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 10, 16, 11, 0],
          [0, 28, 9, 16, 0],
          [0, 9, 28, 34, 0],
          [0, 34, 10, 11, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [1, 3],
        targetPiece: [4, 3],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      1
    );
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
    let board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 10, 16, 11, 0],
          [0, 28, 9, 16, 0],
          [0, 9, 28, 34, 0],
          [0, 34, 10, 11, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [1, 3],
        targetPiece: [4, 3],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
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
});

describe('analyticPikachuMove', () => {
  it('analyticPikachuMove', () => {
    const _data = analyticPikachuMove(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 14, 36, 0, 0],
          [0, 29, 12, 0, 0],
          [0, 29, 8, 12, 0],
          [0, 36, 14, 8, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [3, 1],
        targetPiece: [2, 1],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
    expect(_data).not.toBeUndefined();
    expect(_data?.board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 36, 0, 0],
      [0, 0, 12, 0, 0],
      [0, 14, 8, 12, 0],
      [0, 36, 14, 8, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('analyticPikachuMove1', () => {
    const _data = analyticPikachuMove(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 3, 4, 2, 0],
          [0, 4, 2, 3, 0],
          [0, 5, 5, 1, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [4, 1],
        targetPiece: [4, 2],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
    expect(_data).not.toBeUndefined();
    expect(_data?.board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 2, 0],
      [0, 3, 4, 3, 0],
      [0, 4, 2, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(_data?.possibleFuturePath).toBeNull();
  });
});
