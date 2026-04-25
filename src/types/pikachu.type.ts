import { TPositionType, TVectorType } from './global';

export type TPikachuImgType = 'internal' | 'external';
export type TPikachuGameType = 'normal' | 'customBoard' | 'randomBoard' | 'blind';

export type TBasePikachuType = {
  numberOfRows: number;
  numberOfColumns: number;
  board: Array<Array<number>>;
};

export type TFindPathType = TBasePikachuType & {
  sourcePiece: TPositionType;
  targetPiece: TPositionType;
  numberOfLines: number;
};

export type TFindPathWithoutTargetType = TBasePikachuType & {
  numberOfLines: number;
};

export type TPikachuNewBoardType = {
  numberOfRows: number;
  numberOfColumns: number;
  numTypes: number;
};

export type TPikachuTransformType =
  | 'normal'
  | 'fallDown'
  | 'fallUp'
  | 'shiftLeft'
  | 'shiftRight'
  | 'splitHorizontally'
  | 'mergeHorizontally'
  | 'splitVertically'
  | 'mergeVertically'
  | 'shiftUpLeft'
  | 'shiftDownLeft'
  | 'shiftUpRight'
  | 'shiftDownRight'
  | 'spreadOut'
  | 'collapseToCenter';

export type TPerformFormatType = {
  board: Array<Array<number>>;
  vector: TVectorType;
  space: [TPositionType, TPositionType];
};

export type TPerformTransformType = TPerformFormatType & {
  moves: Array<TPositionType>;
};

export type TMoveParamsType = TBasePikachuType & {
  moves: Array<TPositionType>;
};

export enum PikachuMachineStateType {
  INITIAL = 'initial',
  PLAYING = 'playing',
  OUT_OF_MOVE = 'out-of-move',
  ENDED = 'ended',
}

export enum PikachuMachineEvent {
  CREATE = 'create',
  LOAD_SAVE_GAME = 'load-save-game',
  CHANGE = 'change',
  OUT_OF_MOVE = 'out-of-move',
  MOVE = 'move',
  RESET_SELECTION = 'reset-selection',
  SHOW_HINT = 'show-hint',
  WIN = 'win',
}

export type TPikachuCreateEventType = {
  type: PikachuMachineEvent.CREATE;
  mode: 'newGame' | 'nextRound';
};
export type TPikachuMoveEventType = {
  type: PikachuMachineEvent.MOVE;
  position: TPositionType;
};
export type TPikachuEventType =
  | TPikachuCreateEventType
  | { type: PikachuMachineEvent.CHANGE }
  | TPikachuMoveEventType
  | { type: PikachuMachineEvent.RESET_SELECTION }
  | { type: PikachuMachineEvent.SHOW_HINT }
  | { type: PikachuMachineEvent.OUT_OF_MOVE }
  | { type: PikachuMachineEvent.LOAD_SAVE_GAME }
  | { type: PikachuMachineEvent.WIN };

export type TPikachuContextType = {
  position?: TPositionType;
  selectedPath: Array<TPositionType>;
  randomCounter: number;
  hintRunning: boolean;
};
