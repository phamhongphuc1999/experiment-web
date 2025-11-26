import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { describe, expect, it } from 'vitest';

describe('normal', () => {
  it('testcase 1', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0],
      [0, 4, 5, 6, 0],
      [0, 7, 8, 9, 0],
      [0, 10, 11, 12, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [3, 1],
        ],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      'normal'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 2, 3, 0],
      [0, 4, 5, 6, 0],
      [0, 0, 8, 9, 0],
      [0, 10, 11, 12, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
