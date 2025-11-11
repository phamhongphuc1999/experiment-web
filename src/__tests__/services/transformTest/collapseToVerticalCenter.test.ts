import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('collapseToVerticalCenter', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 8, 0],
          [0, 2, 3, 3, 7, 0],
          [0, 4, 2, 4, 8, 0],
          [0, 5, 5, 6, 9, 0],
          [0, 6, 9, 7, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
        sourcePiece: [4, 4],
        targetPiece: [5, 2],
        numberOfRows: 5,
        numberOfColumns: 4,
      },
      9
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 8, 0],
      [0, 2, 3, 3, 7, 0],
      [0, 4, 2, 4, 8, 0],
      [0, 5, 5, 6, 0, 0],
      [0, 0, 6, 7, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  });
});
