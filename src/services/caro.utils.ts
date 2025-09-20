import { CaroWinType, WinStateType } from 'src/global';

type ParamsType = {
  steps: { [key: number]: 0 | 1 };
  currentStep: number;
  currentPlayer: number;
  numberOfRows: number;
  numberOfColumns: number;
};

function checkUpLeftCross(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfColumns } = params;
  const stepsShouldBeCheck = Math.min(
    currentStep % numberOfColumns,
    Math.floor(currentStep / numberOfColumns)
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - (numberOfColumns + 1);
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkUp(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfColumns } = params;
  const stepsShouldBeCheck = Math.floor(currentStep / numberOfColumns);
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - numberOfColumns;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkUpRightCross(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfColumns } = params;
  const stepsShouldBeCheck = Math.min(
    numberOfColumns - (currentStep % numberOfColumns) - 1,
    Math.floor(currentStep / numberOfColumns)
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - numberOfColumns + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkBottomLeftCross(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfRows, numberOfColumns } = params;
  const stepsShouldBeCheck = Math.min(
    currentStep % numberOfColumns,
    numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns - 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkBottom(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfRows, numberOfColumns } = params;
  const stepsShouldBeCheck = numberOfRows - Math.floor(currentStep / numberOfColumns) - 1;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkBottomRightCross(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfRows, numberOfColumns } = params;
  const stepsShouldBeCheck = Math.min(
    numberOfColumns - (currentStep % numberOfColumns) - 1,
    numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkLeft(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfColumns } = params;
  const stepsShouldBeCheck = currentStep % numberOfColumns;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

function checkRight(params: ParamsType) {
  const { steps, currentStep, currentPlayer, numberOfColumns } = params;
  const stepsShouldBeCheck = numberOfColumns - (currentStep % numberOfColumns) - 1;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  let isBlocked = false;
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else {
      if (steps[checkingStep] != undefined) isBlocked = true;
      break;
    }
  }
  if (counter >= stepsShouldBeCheck) isBlocked = true;
  return { cells: result, isBlocked };
}

export function checkWin(params: ParamsType): WinStateType {
  const upLeftCross = checkUpLeftCross(params);
  const up = checkUp(params);
  const upRightCross = checkUpRightCross(params);
  const bottomLeftCross = checkBottomLeftCross(params);
  const bottom = checkBottom(params);
  const bottomRightCross = checkBottomRightCross(params);
  const left = checkLeft(params);
  const right = checkRight(params);

  const subCross = upLeftCross.cells.length + bottomRightCross.cells.length;
  const mainCross = upRightCross.cells.length + bottomLeftCross.cells.length;
  const vertical = up.cells.length + bottom.cells.length;
  const horizontal = left.cells.length + right.cells.length;

  const mode: Array<CaroWinType> = [];
  if (subCross >= 4 && (!upLeftCross.isBlocked || !bottomRightCross.isBlocked))
    mode.push('subCross');
  if (mainCross >= 4 && (!upRightCross.isBlocked || !bottomLeftCross.isBlocked))
    mode.push('mainCross');
  if (vertical >= 4 && (!up.isBlocked || !bottom.isBlocked)) mode.push('vertical');
  if (horizontal >= 4 && (!left.isBlocked || !right.isBlocked)) mode.push('horizontal');

  const { currentStep } = params;

  return {
    subCross: upLeftCross.cells.concat(bottomRightCross.cells).concat(currentStep),
    mainCross: upRightCross.cells.concat(bottomLeftCross.cells).concat(currentStep),
    vertical: up.cells.concat(bottom.cells).concat(currentStep),
    horizontal: left.cells.concat(right.cells).concat(currentStep),
    mode,
  };
}

export function isWinBlock(result: WinStateType, location: number) {
  const winMode = result.mode;
  let isOk = false;
  for (const mode of winMode) {
    if (result[mode].includes(location)) {
      isOk = true;
      break;
    }
  }
  return isOk;
}
