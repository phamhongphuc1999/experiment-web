import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import {
  TProcessDataObjectType,
  ProcessMachineEvent,
  TProcessMetricsType,
  TProcessMonitorType,
  TProcessType,
} from 'src/types/process.type';

export interface TProcessContextType {
  interval: number;
  counter: number;
  newQueue: PriorityQueue<TProcessType> | undefined; // incoming processes
  waitingQueue: Queue<TProcessType> | undefined;
  readyQueue: Queue<TProcessType> | undefined;
  currentProcess: TProcessType | undefined;
  monitorData: Array<TProcessMonitorType>;
  metricsData: Record<string, TProcessMetricsType>;
}

export type TInitializeProcessEventType = {
  type: ProcessMachineEvent.INITIALIZE;
  processes: TProcessDataObjectType;
};

export type TSetMetadataEventType = {
  type: ProcessMachineEvent.SET_METADATA;
  interval?: number;
};

export type TProcessEventType =
  | TInitializeProcessEventType
  | TSetMetadataEventType
  | { type: ProcessMachineEvent.RESET }
  | { type: ProcessMachineEvent.CLEAR };
