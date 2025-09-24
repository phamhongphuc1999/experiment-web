import { CaroMessageType, CaroWinType, WinStateType } from 'src/global';

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

function checkUpLeftCross(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) =>
      Math.min(currentStep % numberOfColumns, Math.floor(currentStep / numberOfColumns)),
    ({ numberOfColumns }, checkingStep) => checkingStep - (numberOfColumns + 1)
  );
}

function checkUp(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) => Math.floor(currentStep / numberOfColumns),
    ({ numberOfColumns }, checkingStep) => checkingStep - numberOfColumns
  );
}

function checkUpRightCross(params: ParamsType) {
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

function checkBottomLeftCross(params: ParamsType) {
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

function checkBottom(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfRows, numberOfColumns }) =>
      numberOfRows - Math.floor(currentStep / numberOfColumns) - 1,
    ({ numberOfColumns }, checkingStep) => checkingStep + numberOfColumns
  );
}

function checkBottomRightCross(params: ParamsType) {
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

function checkLeft(params: ParamsType) {
  return caroCheck(
    params,
    ({ currentStep, numberOfColumns }) => currentStep % numberOfColumns,
    (_, checkingStep) => checkingStep - 1
  );
}

function checkRight(params: ParamsType) {
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
  subCross: { side1Func: checkUpLeftCross, side2Func: checkBottomRightCross },
  vertical: { side1Func: checkUp, side2Func: checkBottom },
  mainCross: { side1Func: checkUpRightCross, side2Func: checkBottomLeftCross },
  horizontal: { side1Func: checkLeft, side2Func: checkRight },
};

export function _analyticStep(type: CaroWinType, params: ParamsType) {
  const side1 = config[type].side1Func(params);
  const side2 = config[type].side2Func(params);
  const _len = side1.cells.length + side2.cells.length;
  const isWin = _len >= 4 && side1.blockMode != 'opposite' && side2.blockMode != 'opposite';
  return { isWin, arr: side1.cells.concat(side2.cells) };
}

export function checkWin(params: ParamsType): WinStateType {
  const subCross = _analyticStep('subCross', params);
  const vertical = _analyticStep('vertical', params);
  const horizontal = _analyticStep('horizontal', params);
  const mainCross = _analyticStep('mainCross', params);

  const winMode: Array<CaroWinType> = [];
  if (subCross.isWin) winMode.push('subCross');
  if (vertical.isWin) winMode.push('vertical');
  if (horizontal.isWin) winMode.push('horizontal');
  if (mainCross.isWin) winMode.push('mainCross');
  const { currentStep } = params;

  return {
    subCross: subCross.arr.concat(currentStep),
    mainCross: mainCross.arr.concat(currentStep),
    vertical: vertical.arr.concat(currentStep),
    horizontal: horizontal.arr.concat(currentStep),
    winMode,
  };
}

export function isWinBlock(result: WinStateType, location: number) {
  const winMode = result.winMode;
  let isOk = false;
  for (const mode of winMode) {
    if (result[mode].includes(location)) {
      isOk = true;
      break;
    }
  }
  return isOk;
}

export function createCaroMessage(type: CaroMessageType, ...message: Array<string | number>) {
  return `${type}_${message.join('_')}`;
}

export function decodeCaroMessage(message: string) {
  const [type, ...restMessage] = message.split('_');
  const realType = type as CaroMessageType;
  if (realType == 'chat') return { type: realType, message: restMessage[0] };
  else if (realType == 'step') return { type: realType, message: parseInt(restMessage[0]) };
  else if (realType == 'size')
    return {
      type: realType,
      message: {
        numberOfRows: parseInt(restMessage[0]),
        numberOfColumns: parseInt(restMessage[1]),
      },
    };
}
