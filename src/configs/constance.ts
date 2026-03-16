import { MyAllGameType } from 'src/types/caro.type';
import { ENV_TYPE } from 'src/types/global';
import { SchedulerModeType } from 'src/types/process.type';

export const MAX_CARO_BOARD_SIZE = 50;
export const MAX_CONNECT4_BOARD_SIZE = 80;

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
  globalConfigDialog = 'globalConfigDialog',
}

export const gameConfigs: { [game in MyAllGameType]: { title: string } } = {
  caro: { title: 'Caro' },
  connect4: { title: 'Connect4' },
  pikachu: { title: 'Pikachu' },
};

export const ProcessSchedulerConfigs: {
  [id in SchedulerModeType]: { id: SchedulerModeType; name: string; coming?: boolean };
} = {
  [SchedulerModeType.FIFO]: { id: SchedulerModeType.FIFO, name: 'First In, First Out' },
  [SchedulerModeType.SJF]: { id: SchedulerModeType.SJF, name: 'Shortest Job First', coming: true },
  [SchedulerModeType.ROUND_ROBIN]: { id: SchedulerModeType.ROUND_ROBIN, name: 'Round Robin' },
  [SchedulerModeType.MLFQ]: {
    id: SchedulerModeType.MLFQ,
    name: 'Multilevel Feedback Queue',
    coming: true,
  },
};
