import { pikachuGameTransformRound } from 'src/configs/constance';
import { PikachuBoardTransformType, PikachuMoveParamsType, PositionType } from 'src/global';

function normalBoard(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece } = params;
  board[sourcePiece[0]][sourcePiece[1]] = 0;
  board[targetPiece[0]][targetPiece[1]] = 0;
  return board;
}

function _minMaxByRow(piece1: PositionType, piece2: PositionType) {
  let minPiece = piece1;
  let maxPiece = piece2;
  if (piece1[0] > piece2[0]) {
    minPiece = piece2;
    maxPiece = piece1;
  }
  return { minPiece, maxPiece };
}

function _minMaxByColumn(piece1: PositionType, piece2: PositionType) {
  let minPiece = piece1;
  let maxPiece = piece2;
  if (piece1[1] > piece2[1]) {
    minPiece = piece2;
    maxPiece = piece1;
  }
  return { minPiece, maxPiece };
}

type DirectionType = { board: Array<Array<number>>; piece: PositionType; milestone: number };

function _toBottom({ board, piece, milestone }: DirectionType) {
  let counter = piece[0];
  while (counter > milestone) {
    board[counter][piece[1]] = board[--counter][piece[1]];
  }
  board[counter][piece[1]] = 0;
}

function _toTop({ board, piece, milestone }: DirectionType) {
  let counter = piece[0];
  while (counter < milestone) {
    board[counter][piece[1]] = board[++counter][piece[1]];
  }
  board[counter][piece[1]] = 0;
}

function _toLeft({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter < milestone) {
    board[piece[0]][counter] = board[piece[0]][++counter];
  }
  board[piece[0]][counter] = 0;
}

function _toRight({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter > milestone) {
    board[piece[0]][counter] = board[piece[0]][--counter];
  }
  board[piece[0]][counter] = 0;
}

function collapseToBottom(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = _minMaxByRow(sourcePiece, targetPiece);
  _toBottom({ board, piece: minPiece, milestone });
  _toBottom({ board, piece: maxPiece, milestone });
  return board;
}

function collapseToTop(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = _minMaxByRow(sourcePiece, targetPiece);
  _toTop({ board, piece: maxPiece, milestone: milestone });
  _toTop({ board, piece: minPiece, milestone: milestone });
  return board;
}

function collapseToLeft(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  _toLeft({ board, piece: maxPiece, milestone: milestone });
  _toLeft({ board, piece: minPiece, milestone: milestone });
  return board;
}

function collapseToRight(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  _toRight({ board, piece: minPiece, milestone: milestone });
  _toRight({ board, piece: maxPiece, milestone: milestone });
  return board;
}

function divideByHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  const { minPiece, maxPiece } = _minMaxByRow(sourcePiece, targetPiece);
  const _center = Math.floor(numberOfRows / 2);
  if (_center >= maxPiece[0]) collapseToTop(params, _center);
  else if (_center < minPiece[0]) collapseToBottom(params, _center + 1);
  else {
    _toTop({ board, piece: minPiece, milestone: _center });
    _toBottom({ board, piece: maxPiece, milestone: _center + 1 });
  }
  return board;
}

function collapseToHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  const { minPiece, maxPiece } = _minMaxByRow(sourcePiece, targetPiece);
  const _center = Math.floor(numberOfRows / 2);
  if (_center >= maxPiece[0]) collapseToBottom(params, 1);
  else if (_center < minPiece[0]) collapseToTop(params, numberOfRows);
  else {
    _toBottom({ board, piece: minPiece, milestone: 1 });
    _toTop({ board, piece: maxPiece, milestone: numberOfRows });
  }
  return board;
}

function divideByVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  const _center = Math.floor(numberOfColumns / 2);
  if (_center >= maxPiece[1]) collapseToLeft(params, _center);
  else if (_center < minPiece[1]) collapseToRight(params, _center + 1);
  else {
    _toLeft({ board, piece: minPiece, milestone: _center });
    _toRight({ board, piece: maxPiece, milestone: _center + 1 });
  }
  return board;
}

function collapseToVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  const _center = Math.floor(numberOfColumns / 2);
  if (_center >= maxPiece[1]) collapseToRight(params, 1);
  else if (_center < minPiece[1]) collapseToLeft(params, numberOfColumns);
  else {
    _toRight({ board, piece: minPiece, milestone: 1 });
    _toLeft({ board, piece: maxPiece, milestone: numberOfColumns });
  }
  return board;
}

const configs: {
  [mode in PikachuBoardTransformType]: (params: PikachuMoveParamsType) => Array<Array<number>>;
} = {
  normal: normalBoard,
  collapseToBottom: (params) => collapseToBottom(params, 1),
  collapseToTop: (params) => collapseToTop(params, params.numberOfRows),
  collapseToLeft: (params) => collapseToLeft(params, params.numberOfColumns),
  collapseToRight: (params) => collapseToRight(params, 1),
  divideByHorizontalCenter,
  collapseToHorizontalCenter,
  divideByVerticalCenter,
  collapseToVerticalCenter,
};

export function pikachuBoardTransform(
  mode: PikachuBoardTransformType,
  params: PikachuMoveParamsType
) {
  return configs[mode](params);
}

export function pikachuBoardTransformByRound(params: PikachuMoveParamsType, round: number) {
  const mode = pikachuGameTransformRound[round];
  if (mode != undefined) return configs[mode](params);
  else return configs['normal'](params);
}
