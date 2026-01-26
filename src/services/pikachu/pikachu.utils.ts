import { PositionType } from 'src/types/global';
import {
  FindPossibleMoveParamsType,
  PikachuMoveParamsType,
  PikachuNewBoardType,
} from 'src/types/pikachu.type';
import { isPositionEqual, randomSubGroup } from '..';
import Queue from '../Queue';

export function __refineNumTypes(halfCells: number, maxNumTypes: number, percent: number) {
  const newNumTypes = Math.min(maxNumTypes, Math.floor(halfCells * percent));
  return newNumTypes;
}

export function _refineNumTypes(halfCells: number, numTypes: number) {
  if (halfCells >= 2 * numTypes) return numTypes;
  if (halfCells <= 25) {
    const random = Math.random();
    if (random < 0.2) return halfCells - 1;
    else return halfCells;
  } else if (halfCells <= 50) {
    const random = 0.85 + 0.15 * Math.random();
    return __refineNumTypes(halfCells, numTypes, random);
  } else return __refineNumTypes(halfCells, numTypes, 0.5);
}

export function _createRawBoard(totalCells: number, numTypes: number, percent?: number) {
  if (totalCells % 2 !== 0)
    throw new Error('Total number of cells must be even for matching pairs.');

  const tileIds: Array<number> = [];
  const halfCells = totalCells / 2;
  const refinedNumTypes = percent
    ? __refineNumTypes(halfCells, numTypes, percent)
    : _refineNumTypes(halfCells, numTypes);

  const _arr = randomSubGroup(numTypes);
  for (let i = 0; i < halfCells; i++) {
    const id = i % refinedNumTypes;
    tileIds.push(_arr[id] + 1);
  }

  const pairedTiles = [...tileIds, ...tileIds];
  for (let i = pairedTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairedTiles[i], pairedTiles[j]] = [pairedTiles[j], pairedTiles[i]];
  }
  return pairedTiles;
}

export function createBoard(rows: number, cols: number, numTypes: number): Array<Array<number>> {
  const pairedTiles = _createRawBoard(rows * cols, numTypes);

  const board: Array<Array<number>> = [];
  for (let r = 0; r < rows; r++) {
    const row = pairedTiles.slice(r * cols, (r + 1) * cols);
    board.push(row);
  }
  return board;
}

export function reconstructPath(
  parent: (number[] | null)[][][],
  end: PositionType,
  endDir: number,
  start: PositionType
): PositionType[] {
  const path: PositionType[] = [];
  let [x, y] = end;
  let d = endDir;

  while (x !== start[0] || y !== start[1]) {
    path.push([x, y]);
    const p = parent[x][y][d];
    if (!p) break;
    const [px, py, pd] = p;
    x = px;
    y = py;
    d = pd;
  }

  path.push(start);
  path.reverse();
  return path;
}

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function performPikachuMove(params: PikachuMoveParamsType): Array<PositionType> | undefined {
  const { numberOfRows, numberOfColumns, board, sourcePiece, targetPiece, numberOfLines } = params;
  const [ax, ay] = sourcePiece;
  const [bx, by] = targetPiece;
  if (isPositionEqual(sourcePiece, targetPiece) || board[ax][ay] != board[bx][by]) return undefined;

  const parent: (number[] | null)[][][] = Array.from({ length: numberOfRows + 2 }, () =>
    Array.from({ length: numberOfColumns + 2 }, () => Array(4).fill(null))
  );
  const visited: boolean[][][] = Array.from({ length: numberOfRows + 2 }, () =>
    Array.from({ length: numberOfColumns + 2 }, () => Array(4).fill(false))
  );
  const queue = new Queue<[number, number, number, number]>(); // [row, column, direction, turn]
  for (let d = 0; d < 4; d++) {
    queue.enqueue([ax, ay, d, 0]);
    visited[ax][ay][d] = true;
  }
  while (!queue.isEmpty()) {
    const [x, y, d, turns] = queue.dequeue();
    const [dx, dy] = directions[d];
    let nx = x + dx;
    let ny = y + dy;

    // Continue moving in the same direction
    while (
      nx >= 0 &&
      nx <= numberOfRows + 1 &&
      ny >= 0 &&
      ny <= numberOfColumns + 1 &&
      (board[nx][ny] === 0 || (nx === bx && ny === by))
    ) {
      // Reached target B
      if (nx === bx && ny === by) {
        const path = reconstructPath(parent, [x, y], d, sourcePiece);
        path.push([nx, ny]);
        return path;
      }
      // Try all 4 directions
      for (let nd = 0; nd < 4; nd++) {
        const nturns = turns + (nd !== d ? 1 : 0);
        if (nturns <= numberOfLines && !visited[nx][ny][nd]) {
          visited[nx][ny][nd] = true;
          parent[nx][ny][nd] = [x, y, d];
          queue.enqueue([nx, ny, nd, nturns]);
        }
      }
      nx += dx;
      ny += dy;
    }
  }
  return undefined;
}

export function findPikachuPath(
  params: Omit<PikachuMoveParamsType, 'targetPiece'>
): Array<PositionType> | undefined {
  const { numberOfRows, numberOfColumns, board, sourcePiece, numberOfLines } = params;
  const [ax, ay] = sourcePiece;
  const parent: (number[] | null)[][][] = Array.from({ length: numberOfRows + 2 }, () =>
    Array.from({ length: numberOfColumns + 2 }, () => Array(4).fill(null))
  );
  const visited: boolean[][][] = Array.from({ length: numberOfRows + 2 }, () =>
    Array.from({ length: numberOfColumns + 2 }, () => Array(4).fill(false))
  );
  const queue = new Queue<[number, number, number, number]>(); // [row, column, direction, turn]
  for (let d = 0; d < 4; d++) {
    queue.enqueue([ax, ay, d, 0]);
    visited[ax][ay][d] = true;
  }
  while (!queue.isEmpty()) {
    const [x, y, d, turns] = queue.dequeue();
    const [dx, dy] = directions[d];
    let nx = x + dx;
    let ny = y + dy;

    // Continue moving in the same direction
    while (
      nx >= 0 &&
      nx <= numberOfRows + 1 &&
      ny >= 0 &&
      ny <= numberOfColumns + 1 &&
      (board[nx][ny] === 0 || (board[nx][ny] == board[ax][ay] && (nx != ax || ny != ay)))
    ) {
      if (board[nx][ny] == board[ax][ay] && (nx != ax || ny != ay)) {
        const path = reconstructPath(parent, [x, y], d, sourcePiece);
        path.push([nx, ny]);
        return path;
      }

      // Try all 4 directions
      for (let nd = 0; nd < 4; nd++) {
        const nturns = turns + (nd !== d ? 1 : 0);
        if (nturns <= numberOfLines && !visited[nx][ny][nd]) {
          visited[nx][ny][nd] = true;
          parent[nx][ny][nd] = [x, y, d];
          queue.enqueue([nx, ny, nd, nturns]);
        }
      }

      nx += dx;
      ny += dy;
    }
  }
  return undefined;
}

export function findPossibleMove(params: FindPossibleMoveParamsType) {
  const { numberOfRows, numberOfColumns, board, numberOfLines } = params;
  let counter = 0;
  for (let i = 1; i <= numberOfRows; i++) {
    for (let j = 1; j <= numberOfColumns; j++) {
      if (board[i][j] > 0) {
        counter++;
        const path = findPikachuPath({
          numberOfRows,
          numberOfColumns,
          board,
          sourcePiece: [i, j],
          numberOfLines,
        });
        if (path) return path;
      }
    }
  }
  if (counter > 0) return null;
  return undefined;
}

export function _createNewPikachuBoard(params: PikachuNewBoardType) {
  const { numberOfRows, numberOfColumns, numTypes } = params;
  const rawBoard = createBoard(numberOfRows, numberOfColumns, numTypes);
  const board: Array<Array<number>> = [];
  board.push(Array(numberOfColumns + 2).fill(0));
  rawBoard.forEach((row) => {
    board.push([0, ...row, 0]);
  });
  board.push(Array(numberOfColumns + 2).fill(0));
  return board;
}

export function createNewPikachuBoard(params: PikachuNewBoardType & { numberOfLines: number }) {
  const { numberOfRows, numberOfColumns, numTypes, numberOfLines } = params;
  let board = _createNewPikachuBoard({ numberOfRows, numberOfColumns, numTypes });
  let path = findPossibleMove({ numberOfRows, numberOfColumns, board, numberOfLines });
  while (!path) {
    board = _createNewPikachuBoard({ numberOfRows, numberOfColumns, numTypes });
    path = findPossibleMove({ numberOfRows, numberOfColumns, board, numberOfLines });
  }
  return { board, path };
}

function _changePikachuBoard(params: PikachuNewBoardType & { currentBoard: Array<Array<number>> }) {
  const { numberOfRows, numberOfColumns, numTypes, currentBoard } = params;
  let totalCells = 0;
  const values: { [key: number]: number } = {};
  for (let i = 1; i <= numberOfRows; i++) {
    for (let j = 1; j <= numberOfColumns; j++) {
      const _value = currentBoard[i][j];
      if (_value > 0) {
        totalCells++;
        if (values[_value]) values[_value] = values[_value] + 1;
        else values[_value] = 1;
      }
    }
  }
  let totalFourCells = 0;
  for (const value of Object.values(values)) {
    if (value == 4) totalFourCells++;
  }
  const pairedTiles = _createRawBoard(totalCells, numTypes, 1 - (2 * totalFourCells) / totalCells);
  const rawBoard: Array<Array<number>> = [];
  let index = 0;
  for (let i = 0; i < numberOfRows; i++) {
    rawBoard.push([]);
    for (let j = 0; j < numberOfColumns; j++) {
      if (currentBoard[i + 1][j + 1] > 0) rawBoard[i].push(pairedTiles[index++]);
      else rawBoard[i].push(0);
    }
  }
  const board: Array<Array<number>> = [];
  board.push(Array(numberOfColumns + 2).fill(0));
  rawBoard.forEach((row) => {
    board.push([0, ...row, 0]);
  });
  board.push(Array(numberOfColumns + 2).fill(0));
  return board;
}

export function changePikachuBoard(
  params: PikachuNewBoardType & { currentBoard: Array<Array<number>>; numberOfLines: number }
) {
  const { currentBoard, numberOfRows, numberOfColumns, numTypes, numberOfLines } = params;
  let board = _changePikachuBoard({ currentBoard, numberOfRows, numberOfColumns, numTypes });
  let path = findPossibleMove({ numberOfRows, numberOfColumns, board, numberOfLines });
  while (!path) {
    board = _changePikachuBoard({ currentBoard, numberOfRows, numberOfColumns, numTypes });
    path = findPossibleMove({ numberOfRows, numberOfColumns, board, numberOfLines });
  }
  return { board, path };
}
