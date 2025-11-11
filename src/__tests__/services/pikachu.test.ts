import { changePikachuBoard, findPossibleMove } from 'src/services/pikachu/pikachu.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu utils', () => {
  it('findPossibleMove', () => {
    const result = findPossibleMove({
      numberOfRows: 4,
      numberOfColumns: 3,
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    });
    expect(result).toEqual([
      [1, 3],
      [3, 3],
    ]);
  });
  it('', () => {
    const currentBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 2, 0],
      [0, 3, 4, 0, 0],
      [0, 4, 3, 2, 0],
      [0, 0, 0, 0, 0],
    ];
    const { board } = changePikachuBoard(currentBoard, 4, 3);
    let isOk = true;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 4; j++) {
        if (currentBoard[i][j] == 0) if (board[i][j] != 0) isOk = false;
        if (!isOk) break;
      }
      if (!isOk) break;
    }
    expect(isOk).toEqual(true);
  });
});
