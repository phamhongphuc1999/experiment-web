import { CaroMessageType, CaroWinType, WinStateType } from 'src/global';
import { CaroGameType } from 'src/states/caro.state';

type BlockMode = 'opposite' | 'wall' | undefined;

type ParamsType = {
  steps: { [key: number]: 0 | 1 };
  currentStep: number;
  currentPlayer: number;
  numberOfRows: number;
  numberOfColumns: number;
};

type SideReturnType = {
  cells: Array<number>;
  blockMode: BlockMode;
};

function caroCheck(
  params: ParamsType,
  stepShouldByCheckFunc: (params: ParamsType) => number,
  checkingStepFunc: (params: ParamsType, checkingStep: number) => number
): SideReturnType {
  const { steps, currentStep, currentPlayer } = params;
  const stepsShouldBeCheck = stepShouldByCheckFunc(params);
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let blockMode: BlockMode = undefined;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStepFunc(params, checkingStep);
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) blockMode = 'opposite';
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) blockMode = 'wall';
  return { cells: result, blockMode };
}

function checkTopLeftDiagonal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) =>
      Math.min(currentStep % numberOfColumns, Math.floor(currentStep / numberOfColumns)),
    ({ numberOfColumns }, checkingStep) => checkingStep - (numberOfColumns + 1)
  );
}

function checkTopVertical(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) => Math.floor(currentStep / numberOfColumns),
    ({ numberOfColumns }, checkingStep) => checkingStep - numberOfColumns
  );
}

function checkTopRightDiagonal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) =>
      Math.min(
        numberOfColumns - (currentStep % numberOfColumns) - 1,
        Math.floor(currentStep / numberOfColumns)
      ),
    ({ numberOfColumns }, checkingStep) => checkingStep - numberOfColumns + 1
  );
}

function checkBottomLeftDiagonal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfRows, numberOfColumns }) =>
      Math.min(
        currentStep % numberOfColumns,
        numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
      ),
    ({ numberOfColumns }, checkingStep) => checkingStep + numberOfColumns - 1
  );
}

function checkBottomVertical(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfRows, numberOfColumns }) =>
      numberOfRows - Math.floor(currentStep / numberOfColumns) - 1,
    ({ numberOfColumns }, checkingStep) => checkingStep + numberOfColumns
  );
}

function checkBottomRightDiagonal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfRows, numberOfColumns }) =>
      Math.min(
        numberOfColumns - (currentStep % numberOfColumns) - 1,
        numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
      ),
    ({ numberOfColumns }, checkingStep) => checkingStep + numberOfColumns + 1
  );
}

function checkLeftHorizontal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) => currentStep % numberOfColumns,
    (_, checkingStep) => checkingStep - 1
  );
}

function checkRightHorizontal(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) => numberOfColumns - (currentStep % numberOfColumns) - 1,
    (_, checkingStep) => checkingStep + 1
  );
}

const config: {
  [id in CaroWinType]: {
    side1Func: (params: ParamsType) => SideReturnType;
    side2Func: (params: ParamsType) => SideReturnType;
  };
} = {
  leftDiagonal: { side1Func: checkTopLeftDiagonal, side2Func: checkBottomRightDiagonal },
  rightDiagonal: { side1Func: checkTopRightDiagonal, side2Func: checkBottomLeftDiagonal },
  vertical: { side1Func: checkTopVertical, side2Func: checkBottomVertical },
  horizontal: { side1Func: checkLeftHorizontal, side2Func: checkRightHorizontal },
};

function _analyticStep(type: CaroWinType, params: ParamsType) {
  const side1 = config[type].side1Func(params);
  const side2 = config[type].side2Func(params);
  const _len = side1.cells.length + side2.cells.length;
  const isWin = _len >= 4 && (side1.blockMode != 'opposite' || side2.blockMode != 'opposite');
  return { isWin, arr: side1.cells.concat(side2.cells) };
}

export function checkWin(params: ParamsType): WinStateType {
  const leftDiagonal = _analyticStep('leftDiagonal', params);
  const rightDiagonal = _analyticStep('rightDiagonal', params);
  const vertical = _analyticStep('vertical', params);
  const horizontal = _analyticStep('horizontal', params);
  const { currentStep } = params;
  const locations: WinStateType['locations'] = {};

  const winMode: Array<CaroWinType> = [];
  if (leftDiagonal.isWin) {
    winMode.push('leftDiagonal');
    for (const _location of leftDiagonal.arr.concat(currentStep)) {
      if (!locations[_location]) locations[_location] = {};
      locations[_location]['leftDiagonal'] = true;
    }
  }
  if (rightDiagonal.isWin) {
    winMode.push('rightDiagonal');
    for (const _location of rightDiagonal.arr.concat(currentStep)) {
      if (!locations[_location]) locations[_location] = {};
      locations[_location]['rightDiagonal'] = true;
    }
  }
  if (vertical.isWin) {
    winMode.push('vertical');
    for (const _location of vertical.arr.concat(currentStep)) {
      if (!locations[_location]) locations[_location] = {};
      locations[_location]['vertical'] = true;
    }
  }
  if (horizontal.isWin) {
    winMode.push('horizontal');
    for (const _location of horizontal.arr.concat(currentStep)) {
      if (!locations[_location]) locations[_location] = {};
      locations[_location]['horizontal'] = true;
    }
  }

  return { locations, winMode };
}

export function createCaroMessage(type: CaroMessageType, ...message: Array<string | number>) {
  return `${type}_${message.join('_')}`;
}

export type SyncReturnType = {
  numberOfRows: number;
  numberOfColumns: number;
  gameType: CaroGameType;
  isOverride: boolean;
};

export function decodeCaroMessage(message: string) {
  const [type, ...restMessage] = message.split('_');
  const realType = type as CaroMessageType;
  if (realType == 'chat') return { type: realType, message: restMessage[0] };
  else if (realType == 'move') return { type: realType, message: parseInt(restMessage[0]) };
  else if (realType == 'sync')
    return {
      type: realType,
      message: {
        numberOfRows: parseInt(restMessage[0]),
        numberOfColumns: parseInt(restMessage[1]),
        gameType: restMessage[2] as CaroGameType,
        isOverride: restMessage[3] == '0' ? false : true,
      },
    };
  else if (realType == 'newGame' || realType == 'undo') return { type: realType, message: null };
}
