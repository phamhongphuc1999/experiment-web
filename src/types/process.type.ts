export enum ProcessMachineStateType {
  INITIAL = 'initial',
  SCHEDULE = 'schedule', // simulate the incoming process go and the scheduler arrange process priority
  RUN_PROCESS = 'run-process',
  SAVE_PROCESS_CONTEXT = 'save-process-context',
  LOAD_PROCESS_CONTEXT = 'load-process-context',
  ENDED = 'ended',
}

export enum ProcessStatusType {
  NEW = 'new',
  READY = 'ready',
  RUNNING = 'running',
  WAITING = 'waiting',
  TERMINATED = 'terminated',
}

export type ProcessTimeType = {
  arrivalTime: number;
  executionTime: number;
  remainingTime: number;
};

export type ProcessType = ProcessTimeType & {
  pid: string;
  blockTasks?: Array<ProcessTimeType>; // simulate the waiting state (example: I/O)
  currentBlockTaskIndex: number;
  state: ProcessStatusType;
};

export type ProcessDataObjectType = {
  [id: string]: ProcessType;
};

export type ProcessStoreStatusType = 'initial' | 'ready' | 'running' | 'pause' | 'ended';

export enum SchedulerModeType {
  FIFO = 'fifo',
  SJF = 'sjf',
  ROUND_ROBIN = 'round-robin',
}
