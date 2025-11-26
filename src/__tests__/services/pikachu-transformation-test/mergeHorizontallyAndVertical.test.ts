import { pikachuBoardTransformation } from 'src/services/pikachu/pikachu-transformation.utils';
import { describe, expect, it } from 'vitest';

describe('HorizontallyAndVertical', () => {
  it('testcase 1: splitHorizontally', () => {
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
          [6, 2],
          [2, 3],
          [5, 3],
          [6, 3],
        ],
        numberOfRows: 6,
        numberOfColumns: 3,
      },
      'splitHorizontally'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 4, 2, 3, 0],
      [0, 7, 5, 9, 0],
      [0, 0, 8, 0, 0],
      [0, 10, 0, 0, 0],
      [0, 13, 11, 0, 0],
      [0, 16, 14, 12, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 2: mergeHorizontally', () => {
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
          [6, 2],
          [2, 3],
          [5, 3],
          [4, 3],
        ],
        numberOfRows: 6,
        numberOfColumns: 3,
      },
      'mergeHorizontally'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 4, 5, 3, 0],
      [0, 7, 8, 9, 0],
      [0, 10, 11, 18, 0],
      [0, 13, 14, 0, 0],
      [0, 16, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 3: splitVertically', () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 4, 5, 6, 0],
      [0, 7, 8, 9, 10, 11, 12, 0],
      [0, 13, 14, 15, 16, 17, 18, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [1, 3],
          [2, 5],
          [3, 4],
        ],
        numberOfRows: 3,
        numberOfColumns: 6,
      },
      'splitVertically'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 4, 5, 6, 0],
      [0, 7, 8, 9, 0, 10, 12, 0],
      [0, 13, 14, 15, 0, 17, 18, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 4: mergeVertically', () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 4, 5, 6, 0],
      [0, 7, 8, 9, 10, 11, 12, 0],
      [0, 13, 14, 15, 16, 17, 18, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    pikachuBoardTransformation(
      {
        board,
        moves: [
          [1, 1],
          [1, 3],
          [2, 5],
          [3, 4],
        ],
        numberOfRows: 3,
        numberOfColumns: 6,
      },
      'mergeVertically'
    );
    expect(board).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 4, 5, 6, 0],
      [0, 7, 8, 9, 10, 12, 0, 0],
      [0, 13, 14, 15, 17, 18, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
