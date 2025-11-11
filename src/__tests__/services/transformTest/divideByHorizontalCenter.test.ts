import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('divideByHorizontalCenter', () => {
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
});
