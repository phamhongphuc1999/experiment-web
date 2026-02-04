import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import { ProcessDataObjectType, ProcessType } from 'src/types/process.type';

export interface ProcessContextType {
  interval: number;
  counter: number;
  incomingQueue: PriorityQueue<ProcessType> | null;
  blockQueue: Queue<ProcessType> | null;
  fifoQueue: Queue<ProcessType> | null;
  currentProcess: ProcessType | null;
}

export enum ProcessMachineEvent {
  INITIALIZE_PROCESS = 'initialize-process',
  SET_METADATA = 'set-metadata',
  RESET = 'reset',
  CLEAR = 'clear',
}

export type InitializeProcessEventType = {
  type: ProcessMachineEvent.INITIALIZE_PROCESS;
  processes: ProcessDataObjectType;
};

export type SetMetadataEventType = {
  type: ProcessMachineEvent.SET_METADATA;
  interval?: number;
};

export type ProcessEventType =
  | InitializeProcessEventType
  | SetMetadataEventType
  | { type: ProcessMachineEvent.RESET }
  | { type: ProcessMachineEvent.CLEAR };
