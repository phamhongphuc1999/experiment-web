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
  while (counter >= milestone) {
    board[counter][piece[1]] = board[--counter][piece[1]];
  }
}

function _toTop({ board, piece, milestone }: DirectionType) {
  let counter = piece[0];
  while (counter <= milestone) {
    board[counter][piece[1]] = board[++counter][piece[1]];
  }
}

function _toLeft({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter <= milestone) {
    board[piece[0]][counter] = board[piece[0]][++counter];
  }
}

function _toRight({ board, piece, milestone }: DirectionType) {
  let counter = piece[1];
  while (counter >= milestone) {
    board[piece[0]][counter] = board[piece[0]][--counter];
  }
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
  const _center = numberOfRows / 2;
  if (_center >= maxPiece[0]) {
    collapseToBottom(params, _center);
    board[maxPiece[0]][maxPiece[1]] = 0;
    board[minPiece[0]][minPiece[1]] = 0;
  } else if (_center <= minPiece[0]) {
    collapseToTop(params, _center);
    board[maxPiece[0]][maxPiece[1]] = 0;
    board[minPiece[0]][minPiece[1]] = 0;
  } else {
    _toTop({ board, piece: minPiece, milestone: _center });
    _toBottom({ board, piece: maxPiece, milestone: _center });
  }
  return board;
}

function collapseToHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  const { minPiece, maxPiece } = _minMaxByRow(sourcePiece, targetPiece);
  const _center = numberOfRows / 2;
  if (_center >= maxPiece[0]) collapseToBottom(params, _center);
  else if (maxPiece[0] > _center && _center >= minPiece[0]) {
    _toBottom({ board, piece: minPiece, milestone: _center });
    _toTop({ board, piece: maxPiece, milestone: _center + 1 });
  } else collapseToTop(params, _center + 1);
  return board;
}

function divideByVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  const _center = numberOfColumns / 2;
  if (_center >= maxPiece[1]) collapseToLeft(params, params.numberOfColumns);
  else if (maxPiece[1] > _center && _center > minPiece[1]) {
    _toLeft({ board, piece: minPiece, milestone: _center });
    _toRight({ board, piece: maxPiece, milestone: _center + 1 });
  } else collapseToRight(params, 1);
  return board;
}

function collapseToVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  const { minPiece, maxPiece } = _minMaxByColumn(sourcePiece, targetPiece);
  const _center = numberOfColumns / 2;
  if (_center >= maxPiece[1]) collapseToRight(params, 1);
  else if (maxPiece[1] > _center && _center > minPiece[1]) {
    _toRight({ board, piece: minPiece, milestone: 1 });
    _toLeft({ board, piece: maxPiece, milestone: numberOfColumns });
  } else collapseToLeft(params, numberOfColumns);
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
