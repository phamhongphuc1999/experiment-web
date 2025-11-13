import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('collapseToHorizontalCenter', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 2, 3, 3, 0],
          [0, 5, 4, 4, 0],
          [0, 2, 5, 6, 0],
          [0, 6, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [2, 1],
        targetPiece: [4, 1],
        numberOfRows: 5,
        numberOfColumns: 3,
        numberOfLines: 2,
      },
      7
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 3, 3, 0],
      [0, 5, 4, 4, 0],
      [0, 6, 5, 6, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
