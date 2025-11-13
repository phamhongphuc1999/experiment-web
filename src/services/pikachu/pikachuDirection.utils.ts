import { PositionType } from 'src/global';

type DirectionType = { board: Array<Array<number>>; piece: PositionType; milestone: number };
type DiagonalDirectionType = {
  board: Array<Array<number>>;
  piece: PositionType;
  rowMilestone: number;
  columnMilestone: number;
};

export function _toBottom({ board, piece, milestone }: DirectionType) {
  let counter = piece[0];
  while (counter > milestone) {
    board[counter][piece[1]] = board[--counter][piece[1]];
  }
  board[counter][piece[1]] = 0;
}

export function _toTop({ board, piece, milestone }: DirectionType) {
  let counter = piece[0];
  while (counter < milestone) {
    board[counter][piece[1]] = board[++counter][piece[1]];
  }
  board[counter][piece[1]] = 0;
}

export function _toLeft({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter < milestone) {
    board[piece[0]][counter] = board[piece[0]][++counter];
  }
  board[piece[0]][counter] = 0;
}

export function _toRight({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter > milestone) {
    board[piece[0]][counter] = board[piece[0]][--counter];
  }
  board[piece[0]][counter] = 0;
}

export function _toTopLeft(params: DiagonalDirectionType) {
  const { board, piece, rowMilestone, columnMilestone } = params;
  let rowCounter = piece[0];
  let columnCounter = piece[1];
  while (rowCounter < rowMilestone && columnCounter < columnMilestone) {
    board[rowCounter][columnCounter] = board[++rowCounter][++columnCounter];
  }
  board[rowCounter][columnCounter] = 0;
}

export function _toBottomLeft(params: DiagonalDirectionType) {
  const { board, piece, rowMilestone, columnMilestone } = params;
  let rowCounter = piece[0];
  let columnCounter = piece[1];
  while (rowCounter > rowMilestone && columnCounter < columnMilestone) {
    board[rowCounter][columnCounter] = board[--rowCounter][++columnCounter];
  }
  board[rowCounter][columnCounter] = 0;
}

export function _toTopRight(params: DiagonalDirectionType) {
  const { board, piece, rowMilestone, columnMilestone } = params;
  let rowCounter = piece[0];
  let columnCounter = piece[1];
  while (rowCounter < rowMilestone && columnCounter > columnMilestone) {
    board[rowCounter][columnCounter] = board[++rowCounter][--columnCounter];
  }
  board[rowCounter][columnCounter] = 0;
}

export function _topBottomRight(params: DiagonalDirectionType) {
  const { board, piece, rowMilestone, columnMilestone } = params;
  let rowCounter = piece[0];
  let columnCounter = piece[1];
  while (rowCounter > rowMilestone && columnCounter > columnMilestone) {
    board[rowCounter][columnCounter] = board[--rowCounter][--columnCounter];
  }
  board[rowCounter][columnCounter] = 0;
}
