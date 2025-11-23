import { pikachuBoardFormatting } from 'src/services/pikachu/pikachu-formatting.utils';
import { describe, expect, it } from 'vitest';

describe('mergeHorizontallyAndVertical', () => {
  it('testcase 1: divide by horizontal center', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0],
      [0, 0, 5, 6, 0],
      [0, 7, 0, 9, 0],
      [0, 10, 11, 12, 0],
      [0, 13, 14, 0, 0],
      [0, 16, 0, 18, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardFormatting({ board, numberOfRows: 6, numberOfColumns: 3 }, 'splitHorizontally');
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0],
      [0, 7, 5, 6, 0],
      [0, 0, 0, 9, 0],
      [0, 10, 0, 0, 0],
      [0, 13, 11, 12, 0],
      [0, 16, 14, 18, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  it('testcase 2: collapseToHorizontalCenter', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 3, 0],
      [0, 0, 5, 6, 0],
      [0, 7, 0, 0, 0],
      [0, 0, 11, 0, 0],
      [0, 13, 0, 15, 0],
      [0, 0, 17, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardFormatting({ board, numberOfRows: 6, numberOfColumns: 3 }, 'mergeHorizontally');
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 3, 0],
      [0, 7, 5, 6, 0],
      [0, 13, 11, 15, 0],
      [0, 0, 17, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
