import { pikachuGameTransformRound } from 'src/configs/constance';
import { PikachuBoardTransformType, PikachuMoveParamsType } from 'src/global';

function normalBoard(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece } = params;
  board[sourcePiece[0]][sourcePiece[1]] = 0;
  board[targetPiece[0]][targetPiece[1]] = 0;
  return board;
}

function collapseToBottom(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece } = params;

  let minPiece = sourcePiece;
  let maxPiece = targetPiece;
  if (sourcePiece[0] > targetPiece[0]) {
    minPiece = targetPiece;
    maxPiece = sourcePiece;
  }
  let counter = minPiece[0];
  while (counter >= 1) {
    board[counter][minPiece[1]] = board[--counter][minPiece[1]];
  }
  counter = maxPiece[0];
  while (counter >= 1) {
    board[counter][maxPiece[1]] = board[--counter][maxPiece[1]];
  }
  return board;
}

function collapseToTop(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;

  let minPiece = sourcePiece;
  let maxPiece = targetPiece;
  if (sourcePiece[0] > targetPiece[0]) {
    minPiece = targetPiece;
    maxPiece = sourcePiece;
  }
  let counter = maxPiece[0];
  while (counter <= numberOfRows) {
    board[counter][maxPiece[1]] = board[++counter][maxPiece[1]];
  }
  counter = minPiece[0];
  while (counter <= numberOfRows) {
    board[counter][minPiece[1]] = board[++counter][minPiece[1]];
  }
  return board;
}

function collapseToLeft(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;

  let minPiece = sourcePiece;
  let maxPiece = targetPiece;
  if (sourcePiece[1] > targetPiece[1]) {
    minPiece = targetPiece;
    maxPiece = sourcePiece;
  }
  let counter = maxPiece[1];
  while (counter <= numberOfColumns) {
    board[maxPiece[0]][counter] = board[maxPiece[0]][++counter];
  }
  counter = minPiece[1];
  while (counter <= numberOfColumns) {
    board[minPiece[0]][counter] = board[minPiece[0]][++counter];
  }
  return board;
}

function collapseToRight(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece } = params;

  let minPiece = sourcePiece;
  let maxPiece = targetPiece;
  if (sourcePiece[1] > targetPiece[1]) {
    minPiece = targetPiece;
    maxPiece = sourcePiece;
  }
  let counter = minPiece[1];
  while (counter >= 1) {
    board[minPiece[0]][counter] = board[minPiece[0]][--counter];
  }
  counter = maxPiece[1];
  while (counter >= 1) {
    board[maxPiece[0]][counter] = board[maxPiece[0]][--counter];
  }
  return board;
}

function divideByHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  let counter = sourcePiece[0];
  if (sourcePiece[0] <= numberOfRows / 2) {
    while (counter <= numberOfRows / 2) {
      board[counter][sourcePiece[1]] = board[++counter][sourcePiece[1]];
    }
  } else {
    while (counter >= numberOfRows / 2) {
      board[counter][sourcePiece[1]] = board[--counter][sourcePiece[1]];
    }
  }
  counter = targetPiece[0];
  if (targetPiece[0] <= numberOfRows / 2) {
    while (counter <= numberOfRows / 2) {
      board[counter][targetPiece[1]] = board[++counter][targetPiece[1]];
    }
  } else {
    while (counter >= numberOfRows / 2) {
      board[counter][targetPiece[1]] = board[--counter][targetPiece[1]];
    }
  }
  return board;
}

function collapseToHorizontalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfRows } = params;
  let counter = sourcePiece[0];
  if (sourcePiece[0] <= numberOfRows / 2) {
    while (counter >= 1) {
      board[counter][sourcePiece[1]] = board[--counter][sourcePiece[1]];
    }
  } else {
    while (counter <= numberOfRows) {
      board[counter][sourcePiece[1]] = board[++counter][sourcePiece[1]];
    }
  }
  counter = targetPiece[0];
  if (targetPiece[0] <= numberOfRows / 2) {
    while (counter >= 1) {
      board[counter][targetPiece[1]] = board[--counter][targetPiece[1]];
    }
  } else {
    while (counter <= numberOfRows) {
      board[counter][targetPiece[1]] = board[++counter][targetPiece[1]];
    }
  }
  return board;
}

function divideByVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  let counter = sourcePiece[1];
  if (sourcePiece[1] <= numberOfColumns / 2) {
    while (counter <= numberOfColumns / 2) {
      board[sourcePiece[0]][counter] = board[sourcePiece[0]][++counter];
    }
  } else {
    while (counter >= numberOfColumns / 2) {
      board[sourcePiece[0]][counter] = board[sourcePiece[0]][--counter];
    }
  }
  counter = targetPiece[0];
  if (targetPiece[1] <= numberOfColumns / 2) {
    while (counter <= numberOfColumns / 2) {
      board[targetPiece[0]][counter] = board[targetPiece[0]][++counter];
    }
  } else {
    while (counter >= numberOfColumns / 2) {
      board[targetPiece[0]][counter] = board[targetPiece[0]][--counter];
    }
  }
  return board;
}

function collapseToVerticalCenter(params: PikachuMoveParamsType) {
  const { board, sourcePiece, targetPiece, numberOfColumns } = params;
  let counter = sourcePiece[0];
  if (sourcePiece[1] <= numberOfColumns / 2) {
    while (counter >= 1) {
      board[sourcePiece[0]][counter] = board[sourcePiece[0]][--counter];
    }
  } else {
    while (counter <= numberOfColumns) {
      board[sourcePiece[0]][counter] = board[sourcePiece[0]][++counter];
    }
  }
  counter = targetPiece[0];
  if (targetPiece[1] <= numberOfColumns / 2) {
    while (counter >= 1) {
      board[targetPiece[0]][counter] = board[targetPiece[0]][--counter];
    }
  } else {
    while (counter <= numberOfColumns) {
      board[targetPiece[0]][counter] = board[targetPiece[0]][++counter];
    }
  }
  return board;
}

const configs: {
  [mode in PikachuBoardTransformType]: (params: PikachuMoveParamsType) => Array<Array<number>>;
} = {
  normal: normalBoard,
  collapseToBottom,
  collapseToTop,
  collapseToLeft,
  collapseToRight,
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
