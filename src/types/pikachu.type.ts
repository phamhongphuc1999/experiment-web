import { PositionType, VectorType } from './global';

export type PikachuImgType = 'internal' | 'external';
export type PikachuGameType = 'normal' | 'customBoard' | 'randomBoard' | 'blind';

export type BasePikachuType = {
  numberOfRows: number;
  numberOfColumns: number;
  board: Array<Array<number>>;
};

export type FindPathType = BasePikachuType & {
  sourcePiece: PositionType;
  targetPiece: PositionType;
  numberOfLines: number;
};

export type FindPathWithoutTargetType = BasePikachuType & {
  numberOfLines: number;
};

export type PikachuNewBoardType = {
  numberOfRows: number;
  numberOfColumns: number;
  numTypes: number;
};

export type PikachuTransformType =
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

export type PerformFormatType = {
  board: Array<Array<number>>;
  vector: VectorType;
  space: [PositionType, PositionType];
};

export type PerformTransformType = PerformFormatType & {
  moves: Array<PositionType>;
};

export type MoveParamsType = BasePikachuType & {
  moves: Array<PositionType>;
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

export type PikachuCreateEventType = {
  type: PikachuMachineEvent.CREATE;
  mode: 'newGame' | 'nextRound';
};
export type PikachuMoveEventType = {
  type: PikachuMachineEvent.MOVE;
  position: PositionType;
};
export type PikachuEventType =
  | PikachuCreateEventType
  | { type: PikachuMachineEvent.CHANGE }
  | PikachuMoveEventType
  | { type: PikachuMachineEvent.RESET_SELECTION }
  | { type: PikachuMachineEvent.SHOW_HINT }
  | { type: PikachuMachineEvent.OUT_OF_MOVE }
  | { type: PikachuMachineEvent.LOAD_SAVE_GAME }
  | { type: PikachuMachineEvent.WIN };

export type PikachuContextType = {
  position?: PositionType;
  selectedPath: Array<PositionType>;
  randomCounter: number;
  hintRunning: boolean;
};
