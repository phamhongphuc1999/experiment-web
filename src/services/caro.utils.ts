import { CaroWinType, WinStateType } from 'src/global';

function checkUpLeftCross(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = Math.min(
    currentStep % numberOfColumns,
    Math.floor(currentStep / numberOfColumns)
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - (numberOfColumns + 1);
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkUp(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = Math.floor(currentStep / numberOfColumns);
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - numberOfColumns;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkUpRightCross(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = Math.min(
    numberOfColumns - (currentStep % numberOfColumns) - 1,
    Math.floor(currentStep / numberOfColumns)
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - numberOfColumns + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkBottomLeftCross(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfRows: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = Math.min(
    currentStep % numberOfColumns,
    numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns - 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkBottom(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfRows: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = numberOfRows - Math.floor(currentStep / numberOfColumns) - 1;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkBottomRightCross(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfRows: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = Math.min(
    numberOfColumns - (currentStep % numberOfColumns) - 1,
    numberOfRows - Math.floor(currentStep / numberOfColumns) - 1
  );
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + numberOfColumns + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkLeft(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = currentStep % numberOfColumns;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep - 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

function checkRight(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfColumns: number
) {
  const stepsShouldBeCheck = numberOfColumns - (currentStep % numberOfColumns) - 1;
  let checkingStep = currentStep;
  let counter = 0;
  const result: Array<number> = [];
  while (stepsShouldBeCheck > counter) {
    checkingStep = checkingStep + 1;
    if (steps[checkingStep] == currentPlayer) {
      counter++;
      result.push(checkingStep);
    } else break;
  }
  return result;
}

export function checkWin(
  steps: { [key: number]: 0 | 1 },
  currentStep: number,
  currentPlayer: number,
  numberOfRows: number,
  numberOfColumns: number
): WinStateType {
  const upLeftCross = checkUpLeftCross(steps, currentStep, currentPlayer, numberOfColumns);
  const up = checkUp(steps, currentStep, currentPlayer, numberOfColumns);
  const upRightCross = checkUpRightCross(steps, currentStep, currentPlayer, numberOfColumns);
  const bottomLeftCross = checkBottomLeftCross(
    steps,
    currentStep,
    currentPlayer,
    numberOfRows,
    numberOfColumns
  );
  const bottom = checkBottom(steps, currentStep, currentPlayer, numberOfRows, numberOfColumns);
  const bottomRightCross = checkBottomRightCross(
    steps,
    currentStep,
    currentPlayer,
    numberOfRows,
    numberOfColumns
  );
  const left = checkLeft(steps, currentStep, currentPlayer, numberOfColumns);
  const right = checkRight(steps, currentStep, currentPlayer, numberOfColumns);

  const subCross = upLeftCross.length + bottomRightCross.length;
  const mainCross = upRightCross.length + bottomLeftCross.length;
  const vertical = up.length + bottom.length;
  const horizontal = left.length + right.length;

  const mode: Array<CaroWinType> = [];
  if (subCross >= 4) mode.push('subCross');
  if (mainCross >= 4) mode.push('mainCross');
  if (vertical >= 4) mode.push('vertical');
  if (horizontal >= 4) mode.push('horizontal');

  return {
    subCross: upLeftCross.concat(bottomRightCross).concat(currentStep),
    mainCross: upRightCross.concat(bottomLeftCross).concat(currentStep),
    vertical: up.concat(bottom).concat(currentStep),
    horizontal: left.concat(right).concat(currentStep),
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
