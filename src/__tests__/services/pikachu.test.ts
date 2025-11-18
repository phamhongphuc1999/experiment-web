import {
  changePikachuBoard,
  createNewPikachuBoard,
  findPossibleMove,
  _refineNumTypes,
} from 'src/services/pikachu/pikachu.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu utils', () => {
  it('refineNumTypes', () => {
    const refinedNumTypes1 = _refineNumTypes(72, 36);
    expect(refinedNumTypes1).toEqual(36);

    const refinedNumTypes2 = _refineNumTypes(27, 36);
    expect(refinedNumTypes2).lessThanOrEqual(27);

    const refinedNumTypes3 = _refineNumTypes(12, 36);
    expect(refinedNumTypes3).lessThanOrEqual(12);
  });
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
      numberOfLines: 2,
    });
    expect(result).toEqual([
      [1, 3],
      [3, 3],
    ]);
  });
  it('createNewPikachuBoard', () => {
    const { board } = createNewPikachuBoard({
      numberOfRows: 16,
      numberOfColumns: 9,
      numberOfLines: 2,
      numTypes: 90,
    });
    const result: { [key: number]: number } = {};
    for (let i = 1; i <= 16; i++) {
      for (let j = 1; j <= 9; j++) {
        const value = board[i][j];
        if (result[value]) result[value] = result[value] + 1;
        else result[value] = 1;
      }
    }
    for (const value of Object.values(result)) {
      expect(value).equal(4);
    }
  });
  it('changePikachuBoard', () => {
    const currentBoard = [
      [0, 0, 0, 0, 0, 0],
      [0, 3, 3, 1, 0, 0],
      [0, 1, 1, 2, 5, 0],
      [0, 3, 4, 0, 5, 0],
      [0, 4, 3, 2, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const { board } = changePikachuBoard({
      currentBoard,
      numberOfRows: 4,
      numberOfColumns: 4,
      numberOfLines: 2,
      numTypes: 90,
    });
    let isOk = true;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 4; j++) {
        if (currentBoard[i][j] == 0) if (board[i][j] != 0) isOk = false;
        if (!isOk) break;
      }
      if (!isOk) break;
    }
    expect(isOk).toEqual(true);
    // const fourTotalCells = 0;
    // for (let i = 1; i <= 3; i++) {
    //   for (let j = 1; j <= 4; j++) {

    //   }
    // }
  });
});
