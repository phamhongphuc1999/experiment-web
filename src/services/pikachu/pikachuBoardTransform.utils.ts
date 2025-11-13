import { pikachuGameTransformRound } from 'src/configs/constance';
import { PikachuBoardTransformType, PikachuMoveParamsType } from 'src/global';
import {
  getPositionRegion,
  minMaxByColumn,
  minMaxByLeftDiagonal,
  minMaxByRightDiagonal,
  minMaxByRow,
} from '..';
import {
  _toBottom,
  _toBottomLeft,
  _toLeft,
  _topBottomRight,
  _toRight,
  _toTop,
  _toTopLeft,
  _toTopRight,
} from './pikachuDirection.utils';

function normalBoard(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece } = params;
  board[sourcePiece[0]][sourcePiece[1]] = 0;
  board[targetPiece[0]][targetPiece[1]] = 0;
  return board;
}

function collapseToBottom(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByRow(sourcePiece, targetPiece);
  _toBottom({ board, piece: minPiece, milestone });
  _toBottom({ board, piece: maxPiece, milestone });
  return board;
}

function collapseToTop(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByRow(sourcePiece, targetPiece);
  _toTop({ board, piece: maxPiece, milestone: milestone });
  _toTop({ board, piece: minPiece, milestone: milestone });
  return board;
}

function collapseToLeft(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByColumn(sourcePiece, targetPiece);
  _toLeft({ board, piece: maxPiece, milestone: milestone });
  _toLeft({ board, piece: minPiece, milestone: milestone });
  return board;
}

function collapseToRight(params: PikachuMoveParamsType, milestone: number) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByColumn(sourcePiece, targetPiece);
  _toRight({ board, piece: minPiece, milestone: milestone });
  _toRight({ board, piece: maxPiece, milestone: milestone });
  return board;
}

function divideByHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  const { minPiece, maxPiece } = minMaxByRow(sourcePiece, targetPiece);
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
  const { minPiece, maxPiece } = minMaxByRow(sourcePiece, targetPiece);
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
  const { minPiece, maxPiece } = minMaxByColumn(sourcePiece, targetPiece);
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
  const { minPiece, maxPiece } = minMaxByColumn(sourcePiece, targetPiece);
  const _center = Math.floor(numberOfColumns / 2);
  if (_center >= maxPiece[1]) collapseToRight(params, 1);
  else if (_center < minPiece[1]) collapseToLeft(params, numberOfColumns);
  else {
    _toRight({ board, piece: minPiece, milestone: 1 });
    _toLeft({ board, piece: maxPiece, milestone: numberOfColumns });
  }
  return board;
}

function collapseToTopLeft(
  params: PikachuMoveParamsType,
  rowMilestone: number,
  columnMilestone: number
) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByLeftDiagonal(sourcePiece, targetPiece);
  _toTopLeft({ board, piece: maxPiece, rowMilestone, columnMilestone });
  _toTopLeft({ board, piece: minPiece, rowMilestone, columnMilestone });
  return board;
}

function collapseToBottomLeft(
  params: PikachuMoveParamsType,
  rowMilestone: number,
  columnMilestone: number
) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByRightDiagonal(sourcePiece, targetPiece);
  _toBottomLeft({ board, piece: minPiece, rowMilestone, columnMilestone });
  _toBottomLeft({ board, piece: maxPiece, rowMilestone, columnMilestone });
  return board;
}

function collapseToTopRight(
  params: PikachuMoveParamsType,
  rowMilestone: number,
  columnMilestone: number
) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByRightDiagonal(sourcePiece, targetPiece);
  _toTopRight({ board, piece: maxPiece, rowMilestone, columnMilestone });
  _toTopRight({ board, piece: minPiece, rowMilestone, columnMilestone });
  return board;
}

function collapseTopBottomRight(
  params: PikachuMoveParamsType,
  rowMilestone: number,
  columnMilestone: number
) {
  const { board, sourcePiece, targetPiece } = params;
  const { minPiece, maxPiece } = minMaxByLeftDiagonal(sourcePiece, targetPiece);
  _topBottomRight({ board, piece: minPiece, rowMilestone, columnMilestone });
  _topBottomRight({ board, piece: maxPiece, rowMilestone, columnMilestone });
  return board;
}

function goAwayFromCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows, numberOfColumns } = params;
  const rowCenter = Math.floor(numberOfRows / 2);
  const columnCenter = Math.floor(numberOfColumns / 2);
  const sourceRegion = getPositionRegion(sourcePiece, rowCenter, columnCenter);
  const targetRegion = getPositionRegion(targetPiece, rowCenter, columnCenter);
  if (sourceRegion == targetRegion) {
    if (sourceRegion == 'tl') collapseToTopLeft(params, rowCenter, columnCenter);
    else if (sourceRegion == 'bl') collapseToBottomLeft(params, rowCenter + 1, columnCenter);
    else if (sourceRegion == 'tr') collapseToTopRight(params, rowCenter, columnCenter + 1);
    else collapseTopBottomRight(params, rowCenter + 1, columnCenter + 1);
  } else {
    const tlPiece =
      sourceRegion == 'tl' ? sourcePiece : targetRegion == 'tl' ? targetPiece : undefined;
    const trPiece =
      sourceRegion == 'tr' ? sourcePiece : targetRegion == 'tr' ? targetPiece : undefined;
    const blPiece =
      sourceRegion == 'bl' ? sourcePiece : targetRegion == 'bl' ? targetPiece : undefined;
    const brPiece =
      sourceRegion == 'br' ? sourcePiece : targetRegion == 'br' ? targetPiece : undefined;
    if (tlPiece)
      _toTopLeft({ board, piece: tlPiece, rowMilestone: rowCenter, columnMilestone: columnCenter });
    if (trPiece)
      _toTopRight({
        board,
        piece: trPiece,
        rowMilestone: rowCenter,
        columnMilestone: columnCenter + 1,
      });
    if (blPiece)
      _toBottomLeft({
        board,
        piece: blPiece,
        rowMilestone: rowCenter + 1,
        columnMilestone: columnCenter,
      });
    if (brPiece)
      _topBottomRight({
        board,
        piece: brPiece,
        rowMilestone: rowCenter + 1,
        columnMilestone: columnCenter + 1,
      });
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
  collapseToTopLeft: (params) =>
    collapseToTopLeft(params, params.numberOfRows, params.numberOfColumns),
  collapseToBottomLeft: (params) => collapseToBottomLeft(params, 0, params.numberOfColumns),
  goAwayFromCenter,
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
