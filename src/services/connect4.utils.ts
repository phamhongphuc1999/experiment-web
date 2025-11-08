import { Connect4WinStateType, Connect4WinType, PositionType, TurnType } from 'src/global';

type ParamsType = {
  steps: { [column: number]: Array<TurnType> };
  currentColumn: number;
  currentPlayer: TurnType;
  numberOfRows: number;
  numberOfColumns: number;
};

type InternalParamsType = ParamsType & {
  currentRow: number;
};

function connect4Check(
  params: InternalParamsType,
  moveCheckFn: (params: InternalParamsType, row: number, column: number) => boolean,
  moveFn: (row: number, column: number) => [number, number]
): Array<PositionType> {
  const { steps, currentColumn, currentRow, currentPlayer } = params;
  let _currentRow = currentRow;
  let _currentColumn = currentColumn;
  const result: Array<PositionType> = [];
  while (moveCheckFn(params, _currentRow, _currentColumn)) {
    [_currentRow, _currentColumn] = moveFn(_currentRow, _currentColumn);
    const _turn = steps?.[_currentColumn]?.[_currentRow];
    if (_turn == currentPlayer) result.push([_currentRow, _currentColumn]);
    else break;
  }
  return result;
}

function checkTopLeftDiagonal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows }, row, column) => row < numberOfRows && column >= 0,
    (row, column) => [row + 1, column - 1]
  );
}

function checkTopVertical(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows }, row, _) => row < numberOfRows,
    (row, column) => [row + 1, column]
  );
}

function checkTopRightDiagonal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows, numberOfColumns }, row, column) =>
      row < numberOfRows && column < numberOfColumns,
    (row, column) => [row + 1, column + 1]
  );
}

function checkBottomLeftDiagonal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, row, column) => row >= 0 && column >= 0,
    (row, column) => [row - 1, column - 1]
  );
}

function checkBottomVertical(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, row, __) => row >= 0,
    (row, column) => [row - 1, column]
  );
}

function checkBottomRightDiagonal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfColumns }, row, column) => row >= 0 && column < numberOfColumns,
    (row, column) => [row - 1, column + 1]
  );
}

function checkLeftHorizontal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, __, column) => column >= 0,
    (row, column) => [row, column - 1]
  );
}

function checkRightHorizontal(params: InternalParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfColumns }, __, column) => column < numberOfColumns,
    (row, column) => [row, column + 1]
  );
}

const config: {
  [id in Connect4WinType]: {
    side1Func: (params: InternalParamsType) => Array<PositionType>;
    side2Func: (params: InternalParamsType) => Array<PositionType>;
  };
} = {
  leftDiagonal: { side1Func: checkTopLeftDiagonal, side2Func: checkBottomRightDiagonal },
  rightDiagonal: { side1Func: checkTopRightDiagonal, side2Func: checkBottomLeftDiagonal },
  vertical: { side1Func: checkTopVertical, side2Func: checkBottomVertical },
  horizontal: { side1Func: checkLeftHorizontal, side2Func: checkRightHorizontal },
};

function _analyticStep(type: Connect4WinType, params: InternalParamsType) {
  const side1 = config[type].side1Func(params);
  const side2 = config[type].side2Func(params);
  const _len = side1.length + side2.length;
  const isWin = _len >= 3;
  return { isWin, arr: side1.concat(side2) };
}

export function checkWin(params: ParamsType): Connect4WinStateType {
  const { steps, currentColumn } = params;
  const currentRow = steps[currentColumn].length - 1;
  const internalParams: InternalParamsType = { ...params, currentRow };

  const leftDiagonal = _analyticStep('leftDiagonal', internalParams);
  const rightDiagonal = _analyticStep('rightDiagonal', internalParams);
  const vertical = _analyticStep('vertical', internalParams);
  const horizontal = _analyticStep('horizontal', internalParams);
  const locations: Connect4WinStateType['locations'] = {};

  const winMode: Array<Connect4WinType> = [];
  if (leftDiagonal.isWin) {
    winMode.push('leftDiagonal');
    for (const [row, column] of leftDiagonal.arr.concat([currentRow, currentColumn])) {
      const _key = `${row}_${column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['leftDiagonal'] = true;
    }
  }
  if (rightDiagonal.isWin) {
    winMode.push('rightDiagonal');
    for (const [row, column] of rightDiagonal.arr.concat([currentRow, currentColumn])) {
      const _key = `${row}_${column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['rightDiagonal'] = true;
    }
  }
  if (vertical.isWin) {
    winMode.push('vertical');
    for (const [row, column] of vertical.arr.concat([currentRow, currentColumn])) {
      const _key = `${row}_${column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['vertical'] = true;
    }
  }
  if (horizontal.isWin) {
    winMode.push('horizontal');
    for (const [row, column] of horizontal.arr.concat([currentRow, currentColumn])) {
      const _key = `${row}_${column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['horizontal'] = true;
    }
  }

  return { locations, winMode };
}
