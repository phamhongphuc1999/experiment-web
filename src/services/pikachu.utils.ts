import { PIKACHU_NUMBER_OF_COLUMNS, PIKACHU_NUMBER_OF_ROWS } from 'src/configs/constance';
import { PositionType } from 'src/global';
import { isPositionEqual, randomSubGroup } from '.';
import Queue from './Queue';

function createBoard(rows: number, cols: number, numTypes: number): Array<Array<number>> {
  const totalCells = rows * cols;
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

type PikachuMoveParams = {
  board: Array<Array<number>>;
  sourcePiece: PositionType;
  targetPiece: PositionType;
};

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function performPikachuMove(params: PikachuMoveParams): Array<PositionType> | undefined {
  const { board, sourcePiece, targetPiece } = params;
  const [ax, ay] = sourcePiece;
  const [bx, by] = targetPiece;
  if (isPositionEqual(sourcePiece, targetPiece) || board[ax][ay] != board[bx][by]) return undefined;

  const parent: (number[] | null)[][][] = Array.from({ length: PIKACHU_NUMBER_OF_ROWS + 2 }, () =>
    Array.from({ length: PIKACHU_NUMBER_OF_COLUMNS + 2 }, () => Array(4).fill(null))
  );
  const visited: boolean[][][] = Array.from({ length: PIKACHU_NUMBER_OF_ROWS + 2 }, () =>
    Array.from({ length: PIKACHU_NUMBER_OF_COLUMNS + 2 }, () => Array(4).fill(false))
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
      nx <= PIKACHU_NUMBER_OF_ROWS + 1 &&
      ny >= 0 &&
      ny <= PIKACHU_NUMBER_OF_COLUMNS + 1 &&
      (board[nx][ny] === 0 || (nx === bx && ny === by))
    ) {
      // Reached target B
      if (nx === bx && ny === by) {
        const path = reconstructPath(parent, [nx, ny], d, sourcePiece);
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
  params: Omit<PikachuMoveParams, 'targetPiece'> & { mode?: 'all' | 'forward' }
): Array<PositionType> | undefined {
  const { board, sourcePiece, mode = 'all' } = params;
  const [ax, ay] = sourcePiece;
  const parent: (number[] | null)[][][] = Array.from({ length: PIKACHU_NUMBER_OF_ROWS + 2 }, () =>
    Array.from({ length: PIKACHU_NUMBER_OF_COLUMNS + 2 }, () => Array(4).fill(null))
  );
  const visited: boolean[][][] = Array.from({ length: PIKACHU_NUMBER_OF_ROWS + 2 }, () =>
    Array.from({ length: PIKACHU_NUMBER_OF_COLUMNS + 2 }, () => Array(4).fill(false))
  );
  const queue = new Queue<[number, number, number, number]>(); // [row, column, direction, turn]
  for (let d = 0; d < 4; d++) {
    queue.enqueue([ax, ay, d, 0]);
    visited[ax][ay][d] = true;
  }
  const max_nx = mode == 'all' ? 0 : sourcePiece[0];
  const max_ny = mode == 'all' ? 0 : sourcePiece[1];
  while (!queue.isEmpty()) {
    const [x, y, d, turns] = queue.dequeue();
    const [dx, dy] = directions[d];
    let nx = x + dx;
    let ny = y + dy;

    // Continue moving in the same direction
    while (
      nx >= max_nx &&
      nx <= PIKACHU_NUMBER_OF_ROWS + 1 &&
      ny >= max_ny &&
      ny <= PIKACHU_NUMBER_OF_COLUMNS + 1 &&
      (board[nx][ny] === 0 || (board[nx][ny] == board[ax][ay] && (nx != ax || ny != ay)))
    ) {
      if (board[nx][ny] == board[ax][ay]) {
        const path = reconstructPath(parent, [nx, ny], d, sourcePiece);
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

export function findPossibleMove(board: Array<Array<number>>) {
  for (let i = 1; i <= PIKACHU_NUMBER_OF_ROWS; i++) {
    for (let j = 1; j < PIKACHU_NUMBER_OF_COLUMNS; j++) {
      const path = findPikachuPath({ board, sourcePiece: [i, j], mode: 'forward' });
      if (path) return path;
    }
  }
}

function _createNewPikachuBoard() {
  const rawBoard = createBoard(PIKACHU_NUMBER_OF_ROWS, PIKACHU_NUMBER_OF_COLUMNS, 36);
  const board: Array<Array<number>> = [];
  board.push(Array(PIKACHU_NUMBER_OF_COLUMNS + 2).fill(0));
  rawBoard.forEach((row) => {
    board.push([0, ...row, 0]);
  });
  board.push(Array(PIKACHU_NUMBER_OF_COLUMNS + 2).fill(0));
  return board;
}

export function createNewPikachuBoard() {
  let board = _createNewPikachuBoard();
  let path = findPossibleMove(board);
  while (!path) {
    board = _createNewPikachuBoard();
    path = findPossibleMove(board);
  }
  return { board, path };
}
