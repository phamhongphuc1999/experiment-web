import { pikachuBoardTransformByRound } from 'src/services/pikachu/pikachuBoardTransform.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu transform', () => {
  it('collapseToBottom1', () => {
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
  });
  it('collapseToBottom2', () => {
    const board = pikachuBoardTransformByRound(
      {
        board: [
          [0, 0, 0, 0, 0],
          [0, 10, 16, 0, 0],
          [0, 28, 9, 0, 0],
          [0, 9, 28, 34, 0],
          [0, 34, 10, 16, 0],
          [0, 0, 0, 0, 0],
        ],
        sourcePiece: [1, 2],
        targetPiece: [4, 3],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      2
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 10, 0, 0, 0],
      [0, 28, 9, 0, 0],
      [0, 9, 28, 0, 0],
      [0, 34, 10, 34, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
