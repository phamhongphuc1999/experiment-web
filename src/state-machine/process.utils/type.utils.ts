import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import { ProcessDataObjectType, ProcessMachineEvent, ProcessType } from 'src/types/process.type';

export interface ProcessContextType {
  interval: number;
  counter: number;
  newQueue: PriorityQueue<ProcessType> | null; // incoming processes
  waitingQueue: Queue<ProcessType> | null;
  readyQueue: Queue<ProcessType> | null;
  currentProcess: ProcessType | null;
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
