import { Connect4WinStateType, Connect4WinType, PositionType, TurnType } from 'src/global';

type ParamsType = {
  steps: { [column: number]: Array<TurnType> };
  currentColumn: number;
  currentPlayer: TurnType;
  numberOfRows: number;
  numberOfColumns: number;
};

function connect4Check(
  params: ParamsType,
  moveCheckFn: (params: ParamsType, row: number, column: number) => boolean,
  moveFn: (row: number, column: number) => [number, number]
): Array<PositionType> {
  const { steps, currentColumn, currentPlayer } = params;
  let _currentRow = steps[currentColumn].length - 1;
  let _currentColumn = currentColumn;
  const result: Array<PositionType> = [];
  while (moveCheckFn(params, _currentRow, _currentColumn)) {
    [_currentRow, _currentColumn] = moveFn(_currentRow, _currentColumn);
    const _turn = steps[_currentColumn][_currentRow];
    if (_turn == currentPlayer) result.push({ row: _currentRow, column: _currentColumn });
    else break;
  }
  return result;
}

function checkTopLeftDiagonal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows }, row, column) => row < numberOfRows && column >= 0,
    (row, column) => [row + 1, column - 1]
  );
}

function checkTopVertical(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows }, row, _) => row < numberOfRows,
    (row, column) => [row + 1, column]
  );
}

function checkTopRightDiagonal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfRows, numberOfColumns }, row, column) =>
      row < numberOfRows && column < numberOfColumns,
    (row, column) => [row + 1, column + 1]
  );
}

function checkBottomLeftDiagonal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, row, column) => row >= 0 && column >= 0,
    (row, column) => [row - 1, column - 1]
  );
}

function checkBottomVertical(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, row, __) => row >= 0,
    (row, column) => [row - 1, column]
  );
}

function checkBottomRightDiagonal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfColumns }, row, column) => row >= 0 && column < numberOfColumns,
    (row, column) => [row - 1, column + 1]
  );
}

function checkLeftHorizontal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    (_, __, column) => column >= 0,
    (row, column) => [row, column - 1]
  );
}

function checkRightHorizontal(params: ParamsType): Array<PositionType> {
  return connect4Check(
    params,
    ({ numberOfColumns }, __, column) => column < numberOfColumns,
    (row, column) => [row, column + 1]
  );
}

const config: {
  [id in Connect4WinType]: {
    side1Func: (params: ParamsType) => Array<PositionType>;
    side2Func: (params: ParamsType) => Array<PositionType>;
  };
} = {
  leftDiagonal: { side1Func: checkTopLeftDiagonal, side2Func: checkBottomRightDiagonal },
  rightDiagonal: { side1Func: checkTopRightDiagonal, side2Func: checkBottomLeftDiagonal },
  vertical: { side1Func: checkTopVertical, side2Func: checkBottomVertical },
  horizontal: { side1Func: checkLeftHorizontal, side2Func: checkRightHorizontal },
};

function _analyticStep(type: Connect4WinType, params: ParamsType) {
  const side1 = config[type].side1Func(params);
  const side2 = config[type].side2Func(params);
  const _len = side1.length + side2.length;
  const isWin = _len >= 3;
  return { isWin, arr: side1.concat(side2) };
}

export function checkWin(params: ParamsType): Connect4WinStateType {
  const leftDiagonal = _analyticStep('leftDiagonal', params);
  const rightDiagonal = _analyticStep('rightDiagonal', params);
  const vertical = _analyticStep('vertical', params);
  const horizontal = _analyticStep('horizontal', params);
  const { steps, currentColumn } = params;
  const currentRow = steps[currentColumn].length - 1;
  const locations: Connect4WinStateType['locations'] = {};

  const winMode: Array<Connect4WinType> = [];
  if (leftDiagonal.isWin) {
    winMode.push('leftDiagonal');
    for (const _location of leftDiagonal.arr.concat({ row: currentRow, column: currentColumn })) {
      const _key = `${_location.row}_${_location.column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['leftDiagonal'] = true;
    }
  }
  if (rightDiagonal.isWin) {
    winMode.push('rightDiagonal');
    for (const _location of rightDiagonal.arr.concat({ row: currentRow, column: currentColumn })) {
      const _key = `${_location.row}_${_location.column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['rightDiagonal'] = true;
    }
  }
  if (vertical.isWin) {
    winMode.push('vertical');
    for (const _location of vertical.arr.concat({ row: currentRow, column: currentColumn })) {
      const _key = `${_location.row}_${_location.column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['vertical'] = true;
    }
  }
  if (horizontal.isWin) {
    winMode.push('horizontal');
    for (const _location of horizontal.arr.concat({ row: currentRow, column: currentColumn })) {
      const _key = `${_location.row}_${_location.column}`;
      if (!locations[_key]) locations[_key] = {};
      locations[_key]['horizontal'] = true;
    }
  }

  return { locations, winMode };
}
