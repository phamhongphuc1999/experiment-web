import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { describe, expect, it } from 'vitest';

describe('fallUp', () => {
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
      'fallUp'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 4, 2, 3, 0],
      [0, 10, 5, 6, 0],
      [0, 0, 8, 9, 0],
      [0, 0, 11, 12, 0],
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
      'fallUp'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 4, 2, 3, 0],
      [0, 10, 5, 6, 0],
      [0, 13, 8, 9, 0],
      [0, 0, 11, 12, 0],
      [0, 0, 14, 15, 0],
      [0, 0, 17, 18, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase3 ', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 10, 10, 16, 0],
      [0, 28, 9, 34, 0],
      [0, 9, 28, 0, 0],
      [0, 34, 16, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 3],
          [4, 2],
        ],
        numberOfRows: 4,
        numberOfColumns: 3,
      },
      'fallUp'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 10, 10, 34, 0],
      [0, 28, 9, 0, 0],
      [0, 9, 28, 0, 0],
      [0, 34, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
