import { pikachuBoardFormatting } from 'src/services/pikachu/pikachu-formatting.utils';
import { describe, expect, it } from 'vitest';

describe('fallDown', () => {
  it('testcase 1', () => {
    const board = [
      [0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0],
      [0, 0, 5, 0, 0],
      [0, 7, 0, 9, 0],
      [0, 0, 11, 12, 0],
      [0, 0, 0, 0, 0],
    ];
    pikachuBoardFormatting({ board, numberOfRows: 4, numberOfColumns: 3 }, 'fallDown');
    expect(board).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 2, 3, 0],
      [0, 1, 5, 9, 0],
      [0, 7, 11, 12, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
