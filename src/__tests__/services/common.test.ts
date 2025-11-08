import { isPositionIncludes } from 'src/services';
import { describe, expect, it } from 'vitest';

describe('Test common utils', () => {
  it('isPositionIncludes', () => {
    const result = isPositionIncludes(
      [1, 2],
      [
        [2, 3],
        [3, 4],
        [1, 2],
      ]
    );
    expect(result).equal(true);

    const result1 = isPositionIncludes(
      [1, 2],
      [
        [2, 3],
        [3, 4],
        [4, 5],
      ]
    );
    expect(result1).equal(false);
  });
});
