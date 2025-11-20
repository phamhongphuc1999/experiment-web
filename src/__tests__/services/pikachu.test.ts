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
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        if (currentBoard[i][j] == 0) if (board[i][j] != 0) isOk = false;
        if (!isOk) break;
      }
      if (!isOk) break;
    }
    expect(isOk).toEqual(true);
    let fourTotalCells = 0;
    const result: { [key: number]: number } = {};
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        const value = board[i][j];
        if (!result[value]) result[value] = 1;
        else result[value] = result[value] + 1;
      }
    }
    for (const _value of Object.values(result)) {
      if (_value % 4 == 0) fourTotalCells++;
    }
    expect(fourTotalCells).eq(2);
  });
  it('changePikachuBoard1', () => {
    const currentBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 534, 370, 318, 330, 351, 92, 602, 242, 663, 472, 0, 0, 0, 0, 0],
      [0, 0, 0, 902, 137, 242, 297, 796, 137, 346, 384, 376, 717, 351, 0, 0, 0, 0],
      [0, 0, 0, 700, 320, 802, 541, 438, 274, 284, 92, 346, 223, 108, 534, 0, 0, 0],
      [0, 0, 0, 108, 330, 545, 559, 284, 825, 320, 701, 796, 376, 318, 370, 559, 346, 0],
      [0, 0, 0, 7, 541, 284, 223, 297, 92, 318, 545, 384, 717, 602, 242, 57, 541, 0],
      [0, 384, 511, 351, 277, 438, 802, 559, 223, 297, 137, 274, 511, 370, 92, 7, 297, 0],
      [0, 0, 802, 825, 318, 57, 602, 242, 802, 700, 701, 717, 438, 700, 277, 717, 545, 0],
      [0, 0, 0, 346, 663, 274, 223, 384, 274, 351, 472, 370, 545, 602, 284, 0, 0, 0],
      [0, 0, 0, 0, 438, 7, 700, 7, 534, 541, 902, 534, 559, 137, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const { board } = changePikachuBoard({
      currentBoard,
      numberOfRows: 9,
      numberOfColumns: 16,
      numberOfLines: 2,
      numTypes: 90,
    });
    let isOk = true;
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 16; j++) {
        if (currentBoard[i][j] == 0) if (board[i][j] != 0) isOk = false;
        if (!isOk) break;
      }
      if (!isOk) break;
    }
    expect(isOk).toEqual(true);
    let baseFourTotalCells = 0;
    const baseResult: { [key: number]: number } = {};
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 16; j++) {
        const value = board[i][j];
        if (value > 0) {
          if (baseResult[value]) baseResult[value] = baseResult[value] + 1;
          else baseResult[value] = 1;
        }
      }
    }
    for (const _value of Object.values(baseResult)) {
      if (_value % 4 == 0) baseFourTotalCells++;
    }

    let fourTotalCells = 0;
    const result: { [key: number]: number } = {};
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 16; j++) {
        const value = board[i][j];
        if (value > 0) {
          if (!result[value]) result[value] = 1;
          else result[value] = result[value] + 1;
        }
      }
    }
    for (const _value of Object.values(result)) {
      if (_value % 4 == 0) fourTotalCells++;
    }
    expect(fourTotalCells).eq(baseFourTotalCells);
  });
});
