import { PositionType, VectorType } from './global';

export type PikachuTimeType = 'normal' | 'cumulative' | 'off';
export type PikachuImgType = 'internal' | 'external';
export type PikachuGameType = 'normal' | 'customBoard' | 'randomBoard' | 'blind';

export type BasePikachuParamsType = {
  numberOfRows: number;
  numberOfColumns: number;
  board: Array<Array<number>>;
};

export type PikachuMoveParamsType = BasePikachuParamsType & {
  sourcePiece: PositionType;
  targetPiece: PositionType;
  numberOfLines: number;
};

export type FindPossibleMoveParamsType = BasePikachuParamsType & {
  numberOfLines: number;
};

export type PikachuNewBoardType = {
  numberOfRows: number;
  numberOfColumns: number;
  numTypes: number;
};

export type PikachuBoardTransformType =
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

export type PerformFormattingParamsType = {
  board: Array<Array<number>>;
  vector: VectorType;
  space: [PositionType, PositionType];
};

export type PerformTransformationParamsType = PerformFormattingParamsType & {
  moves: Array<PositionType>;
};

export type MoveParamsType = BasePikachuParamsType & {
  moves: Array<PositionType>;
};
