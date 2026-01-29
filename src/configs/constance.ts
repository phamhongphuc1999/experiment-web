import { MyAllGameType } from 'src/types/caro.type';
import { ENV_TYPE } from 'src/types/global';
import { PikachuBoardTransformType } from 'src/types/pikachu.type';
import { SchedulerModeType } from 'src/types/process-demo.type';

export const MAX_CARO_BOARD_SIZE = 50;
export const MAX_CONNECT4_BOARD_SIZE = 80;
export const PIKACHU_PIECE_SIZE = 52;

export const LS = {
  playMode: 'playMode',
  gameType: 'gameType',
};

export const ENCRYPT_KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY || '';
export const IV_HEX = process.env.NEXT_PUBLIC_IV_HEX || '00112233445566778899aabbccddeeff';
export const ENV = (process.env.NEXT_PUBLIC_ENV || 'production') as ENV_TYPE;

export const APP_NAME = 'Experiment App';

export enum DIALOG_KEY {
  caroConfigDialog = 'caroConfigDialog',
  caroConnectionDialog = 'caroConnectionDialog',
  caroInstructionDialog = 'caroInstructionDialog',
  connect4ConfigDialog = 'connect4ConfigDialog',
  connect4InstructionDialog = 'connect4InstructionDialog',
  pikachuConfigDialog = 'pikachuConfigDialog',
  pikachuInstructionDialog = 'pikachuInstructionDialog',
  routingGameDialog = 'routingGameDialog',
  changeBoardConfirmDialog = 'changeBoardConfirmDialog',
}

export const gameConfigs: { [game in MyAllGameType]: { title: string } } = {
  caro: { title: 'Caro' },
  connect4: { title: 'Connect4' },
  pikachu: { title: 'Pikachu' },
};

export const pikachuRoundTransformations: Array<PikachuBoardTransformType> = [
  'normal',
  'fallDown',
  'fallUp',
  'shiftLeft',
  'shiftRight',
  'splitHorizontally',
  'mergeHorizontally',
  'splitVertically',
  'mergeVertically',
  'shiftUpLeft',
  'shiftUpRight',
  'shiftDownLeft',
  'shiftDownRight',
  'spreadOut',
  'collapseToCenter',
];

export const pikachuTransformConfig: {
  [id in PikachuBoardTransformType]: { id: PikachuBoardTransformType; title: string };
} = {
  normal: { id: 'normal', title: 'Normal' },
  fallDown: { id: 'fallDown', title: 'Fall down' },
  fallUp: { id: 'fallUp', title: 'Fall up' },
  shiftLeft: { id: 'shiftLeft', title: 'Shift left' },
  shiftRight: { id: 'shiftRight', title: 'Shift right' },
  splitHorizontally: { id: 'splitHorizontally', title: 'Split horizontally' },
  mergeHorizontally: { id: 'mergeHorizontally', title: 'Merge horizontally' },
  splitVertically: { id: 'splitVertically', title: 'Split vertically' },
  mergeVertically: { id: 'mergeVertically', title: 'Merge vertically' },
  shiftUpLeft: { id: 'shiftUpLeft', title: 'Shift up left' },
  shiftUpRight: { id: 'shiftUpRight', title: 'Shift up right' },
  shiftDownLeft: { id: 'shiftDownLeft', title: 'Shift down left' },
  shiftDownRight: { id: 'shiftDownRight', title: 'Shift down right' },
  spreadOut: { id: 'spreadOut', title: 'Spread out' },
  collapseToCenter: { id: 'collapseToCenter', title: 'Collapse to center' },
};

export const PIKACHU_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const ProcessSchedulerConfigs: {
  [id in SchedulerModeType]: { id: SchedulerModeType; name: string };
} = {
  [SchedulerModeType.FIFO]: { id: SchedulerModeType.FIFO, name: 'First In, First Out' },
  [SchedulerModeType.SJF]: { id: SchedulerModeType.SJF, name: 'Shortest Job First' },
  [SchedulerModeType.ROUND_ROBIN]: { id: SchedulerModeType.ROUND_ROBIN, name: 'Round Robin' },
};
