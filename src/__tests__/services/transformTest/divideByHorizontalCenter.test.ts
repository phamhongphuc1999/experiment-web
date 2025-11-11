import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('divideByHorizontalCenter1', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 2, 3, 3, 0],
          [0, 4, 2, 4, 0],
          [0, 5, 5, 6, 0],
          [0, 6, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [1, 1],
        targetPiece: [1, 2],
        numberOfRows: 5,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 2, 3, 0, 0],
      [0, 0, 0, 3, 0],
      [0, 4, 2, 4, 0],
      [0, 5, 5, 6, 0],
      [0, 6, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('divideByHorizontalCenter2', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 3, 1, 0, 0],
          [0, 5, 1, 3, 0],
          [0, 4, 2, 0, 0],
          [0, 5, 2, 4, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [3, 2],
        targetPiece: [4, 2],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 3, 1, 0, 0],
      [0, 5, 1, 3, 0],
      [0, 4, 0, 0, 0],
      [0, 5, 0, 4, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('divideByHorizontalCenter3', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 3, 1, 0, 0],
          [0, 5, 1, 3, 0],
          [0, 4, 2, 0, 0],
          [0, 5, 2, 4, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [1, 2],
        targetPiece: [2, 2],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      6
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0],
      [0, 5, 0, 3, 0],
      [0, 4, 2, 0, 0],
      [0, 5, 2, 4, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
