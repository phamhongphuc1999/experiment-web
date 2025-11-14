import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { describe, expect, it } from 'vitest';

describe('fallDown', () => {
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
      'fallDown'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 2, 3, 0],
      [0, 0, 5, 6, 0],
      [0, 4, 8, 9, 0],
      [0, 10, 11, 12, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 2', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0],
      [0, 4, 5, 6, 0],
      [0, 7, 8, 9, 0],
      [0, 10, 11, 12, 0],
      [0, 13, 14, 15, 0],
      [0, 16, 17, 18, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [3, 1],
          [6, 1],
        ],
        numberOfRows: 6,
        numberOfColumns: 3,
      },
      'fallDown'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 2, 3, 0],
      [0, 0, 5, 6, 0],
      [0, 0, 8, 9, 0],
      [0, 4, 11, 12, 0],
      [0, 10, 14, 15, 0],
      [0, 13, 17, 18, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase3 ', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 10, 16, 0, 0],
      [0, 28, 9, 0, 0],
      [0, 9, 28, 34, 0],
      [0, 34, 10, 16, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 2],
          [4, 3],
        ],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      'fallDown'
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
