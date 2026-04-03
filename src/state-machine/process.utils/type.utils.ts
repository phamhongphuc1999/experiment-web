import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import {
  ProcessDataObjectType,
  ProcessMachineEvent,
  ProcessMetricsType,
  ProcessMonitorType,
  ProcessType,
} from 'src/types/process.type';

export interface ProcessContextType {
  interval: number;
  counter: number;
  newQueue: PriorityQueue<ProcessType> | undefined; // incoming processes
  waitingQueue: Queue<ProcessType> | undefined;
  readyQueue: Queue<ProcessType> | undefined;
  currentProcess: ProcessType | undefined;
  monitorData: Array<ProcessMonitorType>;
  metricsData: Record<string, ProcessMetricsType>;
}

export type InitializeProcessEventType = {
  type: ProcessMachineEvent.INITIALIZE;
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
