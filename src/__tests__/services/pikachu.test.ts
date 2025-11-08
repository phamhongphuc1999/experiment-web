import { findPossibleMove, findPossibleMoveWithoutIgnore } from 'src/services/pikachu.utils';
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
  it('findPossibleMoveWithoutIgnore', () => {
    const result = findPossibleMoveWithoutIgnore({
      numberOfRows: 4,
      numberOfColumns: 3,
      board: [
        [0, 0, 0, 0, 0],
        [0, 2, 0, 1, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      ignoreMoves: [
        [1, 1],
        [2, 1],
      ],
    });
    expect(result).toEqual([
      [1, 3],
      [4, 3],
    ]);
  });
  it('findPossibleMoveWithoutIgnore1', () => {
    const result = findPossibleMoveWithoutIgnore({
      numberOfRows: 4,
      numberOfColumns: 3,
      board: [
        [0, 0, 0, 0, 0],
        [0, 1, 10, 2, 0],
        [0, 3, 10, 1, 0],
        [0, 4, 5, 3, 0],
        [0, 2, 4, 5, 0],
        [0, 0, 0, 0, 0],
      ],
      ignoreMoves: [
        [1, 2],
        [2, 2],
      ],
    });
    expect(result).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
      [2, 3],
    ]);
  });
});
