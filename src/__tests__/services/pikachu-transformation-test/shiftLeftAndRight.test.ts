import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { describe, expect, it } from 'vitest';

describe('shiftLeftAndRight', () => {
  it('testcase 1: shiftLeft', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 4, 5, 0],
      [0, 6, 7, 8, 9, 10, 0],
      [0, 11, 12, 13, 14, 15, 0],
      [0, 16, 17, 18, 19, 20, 0],
      [0, 21, 22, 23, 24, 25, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [1, 3],
          [3, 1],
          [3, 4],
        ],
        numberOfRows: 5,
        numberOfColumns: 5,
      },
      'shiftLeft'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 2, 4, 5, 0, 0, 0],
      [0, 6, 7, 8, 9, 10, 0],
      [0, 12, 13, 15, 0, 0, 0],
      [0, 16, 17, 18, 19, 20, 0],
      [0, 21, 22, 23, 24, 25, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 1: shiftRight', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 4, 5, 0],
      [0, 6, 7, 8, 9, 10, 0],
      [0, 11, 12, 13, 14, 15, 0],
      [0, 16, 17, 18, 19, 20, 0],
      [0, 21, 22, 23, 24, 25, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [1, 3],
          [3, 1],
          [3, 4],
        ],
        numberOfRows: 5,
        numberOfColumns: 5,
      },
      'shiftRight'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 4, 5, 0],
      [0, 6, 7, 8, 9, 10, 0],
      [0, 0, 0, 12, 13, 15, 0],
      [0, 16, 17, 18, 19, 20, 0],
      [0, 21, 22, 23, 24, 25, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
