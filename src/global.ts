import { UseQueryOptions } from '@tanstack/react-query';
import { ComponentProps } from 'react';

export type ThemeType = 'light' | 'dark';
export type PositionType = [number, number]; // expect [row, column]
export type VectorType = PositionType; // expect [x, y]

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentDivProps<
  T = AnimationComponentProps,
> extends ComponentProps<'div'> {
  iconProps?: T;
}

export type OptionalQueryType<T = unknown> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export type JsonType =
  | string
  | number
  | Array<string>
  | Array<number>
  | { [index: string | number]: JsonType };

export type PageMetadataType = Partial<{
  title: string;
  description: string;
  url: string;
  siteName: string;
  twitterHandle: string;
  icon: string;
  image: string;
  keywords: string;
}>;

// start caro
export type TurnType = 0 | 1;
export type RoleType = 'host' | 'guest';
export type ConnectionType = 'init' | 'connecting' | 'connected';
export type PlayModeType = 'offline' | 'online' | 'machine';
export type CaroGameType = 'normal' | 'blind';
export type CaroWinModeType = 'blockOpponent' | 'non-blockOpponent';
export type CaroSizeBoardType = 3 | 10 | 15;
export type ChatType = 'yourChat' | 'friendChat';
export type MyGameType = 'caro' | 'connect4';
export type MyAllGameType = MyGameType | 'pikachu';

export type CaroWinType = 'leftDiagonal' | 'rightDiagonal' | 'vertical' | 'horizontal';

export type WinStateType = {
  winMode: Array<CaroWinType>;
  locations: {
    [location: number]: Partial<{ [type in CaroWinType]: boolean }>;
  };
};

export type Connect4WinType = CaroWinType;

export type Connect4WinStateType = {
  winMode: Array<Connect4WinType>;
  locations: {
    [key: string]: Partial<{ [type in Connect4WinType]: boolean }>;
  };
};

export type CaroMessageType = 'chat' | 'move' | 'newGame' | 'undo' | 'sync';
// end caro

// start pikachu
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
// end pikachu
