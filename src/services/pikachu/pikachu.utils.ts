import cloneDeep from 'lodash.clonedeep';
import { FindPossibleMoveParamsType, PikachuMoveParamsType, PositionType } from 'src/global';
import { isPositionEqual, randomSubGroup } from '..';
import Queue from '../Queue';

function _createRawBoard(totalCells: number, numTypes: number) {
  if (totalCells % 2 !== 0)
    throw new Error('Total number of cells must be even for matching pairs.');

  const tileIds: Array<number> = [];
  const halfCells = totalCells / 2;
  if (halfCells < numTypes) {
    const _arr = randomSubGroup(numTypes);
    for (let i = 0; i < halfCells; i++) {
      tileIds.push(_arr[i] + 1);
    }
  } else {
    for (let i = 0; i < halfCells; i++) {
      const id = (i % numTypes) + 1;
      tileIds.push(id);
    }
  }

  const pairedTiles = [...tileIds, ...tileIds];
  for (let i = pairedTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairedTiles[i], pairedTiles[j]] = [pairedTiles[j], pairedTiles[i]];
  }
  return pairedTiles;
}

function createBoard(rows: number, cols: number, numTypes: number): Array<Array<number>> {
  const pairedTiles = _createRawBoard(rows * cols, numTypes);

  const board: Array<Array<number>> = [];
  for (let r = 0; r < rows; r++) {
    const row = pairedTiles.slice(r * cols, (r + 1) * cols);
    board.push(row);
  }
  return board;
}

function reconstructPath(
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
  const { numberOfRows, numberOfColumns, board, sourcePiece, targetPiece } = params;
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
        if (nturns <= 2 && !visited[nx][ny][nd]) {
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
  const { numberOfRows, numberOfColumns, board, sourcePiece } = params;
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
        if (nturns <= 2 && !visited[nx][ny][nd]) {
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

export function findPossibleMove(params: Omit<FindPossibleMoveParamsType, 'ignoreMoves'>) {
  const { numberOfRows, numberOfColumns, board } = params;
  let counter = 0;
  for (let i = 1; i <= numberOfRows; i++) {
    for (let j = 1; j <= numberOfColumns; j++) {
      if (board[i][j] > 0) {
        counter++;
        const path = findPikachuPath({ numberOfRows, numberOfColumns, board, sourcePiece: [i, j] });
        if (path) return path;
      }
    }
  }
  if (counter > 0) return null;
  return undefined;
}

export function findPossibleMoveWithoutIgnore(params: FindPossibleMoveParamsType) {
  const { numberOfRows, numberOfColumns, board, ignoreMoves } = params;
  const _board = cloneDeep(board);
  for (const ignoreMove of ignoreMoves) {
    _board[ignoreMove[0]][ignoreMove[1]] = 0;
  }
  let counter = 0;
  for (let i = 1; i <= numberOfRows; i++) {
    for (let j = 1; j <= numberOfColumns; j++) {
      if (_board[i][j] > 0) {
        counter++;
        const path = findPikachuPath({
          numberOfRows,
          numberOfColumns,
          board: _board,
          sourcePiece: [i, j],
        });
        if (path) return path;
      }
    }
  }
  if (counter > 0) return null;
  return undefined;
}

function _createNewPikachuBoard(numberOfRows: number, numberOfColumns: number) {
  const rawBoard = createBoard(numberOfRows, numberOfColumns, 36);
  const board: Array<Array<number>> = [];
  board.push(Array(numberOfColumns + 2).fill(0));
  rawBoard.forEach((row) => {
    board.push([0, ...row, 0]);
  });
  board.push(Array(numberOfColumns + 2).fill(0));
  return board;
}

export function createNewPikachuBoard(numberOfRows: number, numberOfColumns: number) {
  let board = _createNewPikachuBoard(numberOfRows, numberOfColumns);
  let path = findPossibleMove({ numberOfRows, numberOfColumns, board });
  while (!path) {
    board = _createNewPikachuBoard(numberOfRows, numberOfColumns);
    path = findPossibleMove({ numberOfRows, numberOfColumns, board });
  }
  return { board, path };
}

function _changePikachuBoard(
  currentBoard: Array<Array<number>>,
  numberOfRows: number,
  numberOfColumns: number
) {
  let totalCells = 0;
  for (let i = 1; i <= numberOfRows; i++) {
    for (let j = 1; j <= numberOfColumns; j++) {
      if (currentBoard[i][j] > 0) totalCells++;
    }
  }
  const pairedTiles = _createRawBoard(totalCells, 36);
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
  currentBoard: Array<Array<number>>,
  numberOfRows: number,
  numberOfColumns: number
) {
  let board = _changePikachuBoard(currentBoard, numberOfRows, numberOfColumns);
  let path = findPossibleMove({ numberOfRows, numberOfColumns, board });
  while (!path) {
    board = _createNewPikachuBoard(numberOfRows, numberOfColumns);
    path = findPossibleMove({ numberOfRows, numberOfColumns, board });
  }
  return { board, path };
}
