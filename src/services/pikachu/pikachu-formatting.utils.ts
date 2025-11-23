import {
  MoveParamsType,
  PerformFormattingParamsType,
  PikachuBoardTransformType,
  PositionType,
  VectorType,
} from 'src/global';
import { isInSpace, moveAnUnit } from './pikachu-transformation.utils';

export function performFormatting(params: PerformFormattingParamsType) {
  const { board, vector, space } = params;
  const visitedMove: { [key: string]: boolean } = {};
  for (let i = space[0][0]; i <= space[1][0]; i++) {
    for (let j = space[0][1]; j <= space[1][1]; j++) {
      const _key = `${i}_${j}`;
      if (!visitedMove[_key]) {
        visitedMove[_key] = true;
        let pointer1: PositionType = [i, j];
        let pointer2 = moveAnUnit(pointer1, vector);
        while (isInSpace(pointer2, space)) {
          visitedMove[`${pointer2[0]}_${pointer2[1]}`] = true;
          const value2 = board[pointer2[0]][pointer2[1]];
          if (value2 > 0) {
            board[pointer1[0]][pointer1[1]] = value2;
            pointer1 = moveAnUnit(pointer1, vector);
          }
          board[pointer2[0]][pointer2[1]] = 0;
          pointer2 = moveAnUnit(pointer2, vector);
        }
      }
    }
  }
}

function _straight(params: Omit<MoveParamsType, 'moves'>, vector: VectorType) {
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

function splitHorizontally(params: Omit<MoveParamsType, 'moves'>) {
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

function mergeHorizontally(params: Omit<MoveParamsType, 'moves'>) {
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

function splitVertically(params: Omit<MoveParamsType, 'moves'>) {
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

function mergeVertically(params: Omit<MoveParamsType, 'moves'>) {
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

function spreadOut(params: Omit<MoveParamsType, 'moves'>) {
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

function collapseToCenter(params: Omit<MoveParamsType, 'moves'>) {
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
  [id in PikachuBoardTransformType]: (params: Omit<MoveParamsType, 'moves'>) => void;
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

export function pikachuBoardTransformation(
  params: Omit<MoveParamsType, 'moves'>,
  type: PikachuBoardTransformType
) {
  configs[type](params);
}
