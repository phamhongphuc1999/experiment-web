import { findPossibleMove, findPossibleMoveWithoutIgnore } from 'src/services/pikachu.utils';
import { describe, expect, it } from 'vitest';

describe('Test pikachu utils', () => {
  it('findPossibleMove', () => {
    const result = findPossibleMove([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(result).toEqual([
      [2, 3],
      [4, 3],
    ]);
  });
  it('findPossibleMoveWithoutIgnore', () => {
    const result = findPossibleMoveWithoutIgnore(
      [
        [0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 2, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      [
        [1, 1],
        [2, 1],
      ]
    );
    expect(result).toEqual([
      [2, 3],
      [4, 3],
    ]);
  });
});
