import {
  BasePikachuParamsType,
  PerformFormattingParamsType,
  PikachuBoardTransformType,
  PositionType,
  VectorType,
} from 'src/global';
import { isInSpace, moveAnUnit } from './pikachu-transformation.utils';

function performFormatting(params: PerformFormattingParamsType) {
  const { board, vector, space } = params;
  const result: Array<PositionType> = [];
  for (let i = space[0][0]; i <= space[1][0]; i++) {
    for (let j = space[0][1]; j <= space[1][1]; j++) {
      if (board[i][j] == 0) result.push([i, j]);
    }
  }
  const visitedMove: { [key: string]: boolean } = {};
  for (const piece of result) {
    const _key = `${piece[0]}_${piece[1]}`;
    if (!visitedMove[_key]) {
      visitedMove[_key] = true;
      let pointer1 = piece;
      let pointer2 = moveAnUnit(pointer1, vector);
      while (isInSpace(pointer2, space)) {
        visitedMove[`${pointer2[0]}_${pointer2[1]}`] = true;
        const value2 = board[pointer2[0]][pointer2[1]];
        if (value2 > 0) {
          board[pointer1[0]][pointer1[1]] = value2;
          pointer1 = moveAnUnit(pointer1, vector);
          board[pointer2[0]][pointer2[1]] = 0;
        }
        pointer2 = moveAnUnit(pointer2, vector);
      }
    }
  }
}

function _straight(params: BasePikachuParamsType, vector: VectorType) {
  const { board, numberOfRows, numberOfColumns } = params;
  performFormatting({
    board,
    vector,
    space: [
      [1, 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function splitHorizontally(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const rowCenter = Math.floor(numberOfRows / 2);
  performFormatting({
    board,
    vector: [1, 0],
    space: [
      [1, 1],
      [rowCenter, numberOfColumns],
    ],
  });
  performFormatting({
    board,
    vector: [-1, 0],
    space: [
      [rowCenter + 1, 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function mergeHorizontally(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const rowCenter = Math.floor(numberOfRows / 2);
  performFormatting({
    board,
    vector: [-1, 0],
    space: [
      [1, 1],
      [rowCenter, numberOfColumns],
    ],
  });
  performFormatting({
    board,
    vector: [1, 0],
    space: [
      [rowCenter + 1, 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function splitVertically(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const columnCenter = Math.floor(numberOfColumns / 2);
  performFormatting({
    board,
    vector: [0, 1],
    space: [
      [1, 1],
      [numberOfRows, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [0, -1],
    space: [
      [1, columnCenter + 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function mergeVertically(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const columnCenter = Math.floor(numberOfColumns / 2);
  performFormatting({
    board,
    vector: [0, -1],
    space: [
      [1, 1],
      [numberOfRows, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [0, 1],
    space: [
      [1, columnCenter + 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function spreadOut(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const rowCenter = Math.floor(numberOfRows / 2);
  const columnCenter = Math.floor(numberOfColumns / 2);
  performFormatting({
    board,
    vector: [1, 1],
    space: [
      [1, 1],
      [rowCenter, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [-1, 1],
    space: [
      [rowCenter + 1, 1],
      [numberOfRows, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [1, -1],
    space: [
      [1, columnCenter + 1],
      [rowCenter, numberOfColumns],
    ],
  });
  performFormatting({
    board,
    vector: [-1, -1],
    space: [
      [rowCenter + 1, columnCenter + 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

function collapseToCenter(params: BasePikachuParamsType) {
  const { board, numberOfRows, numberOfColumns } = params;
  const rowCenter = Math.floor(numberOfRows / 2);
  const columnCenter = Math.floor(numberOfColumns / 2);
  performFormatting({
    board,
    vector: [-1, -1],
    space: [
      [1, 1],
      [rowCenter, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [1, -1],
    space: [
      [rowCenter + 1, 1],
      [numberOfRows, columnCenter],
    ],
  });
  performFormatting({
    board,
    vector: [-1, 1],
    space: [
      [1, columnCenter + 1],
      [rowCenter, numberOfColumns],
    ],
  });
  performFormatting({
    board,
    vector: [1, 1],
    space: [
      [rowCenter + 1, columnCenter + 1],
      [numberOfRows, numberOfColumns],
    ],
  });
}

const configs: {
  [id in PikachuBoardTransformType]: (params: BasePikachuParamsType) => void;
} = {
  normal: () => {},
  fallDown: (params) => _straight(params, [-1, 0]),
  fallUp: (params) => _straight(params, [1, 0]),
  shiftLeft: (params) => _straight(params, [0, 1]),
  shiftRight: (params) => _straight(params, [0, -1]),
  shiftUpLeft: (params) => _straight(params, [1, 1]),
  shiftDownLeft: (params) => _straight(params, [-1, 1]),
  shiftUpRight: (params) => _straight(params, [1, -1]),
  shiftDownRight: (params) => _straight(params, [-1, -1]),
  splitHorizontally,
  mergeHorizontally,
  splitVertically,
  mergeVertically,
  spreadOut,
  collapseToCenter,
};

export function pikachuBoardFormatting(
  params: BasePikachuParamsType,
  type: PikachuBoardTransformType
) {
  configs[type](params);
}
