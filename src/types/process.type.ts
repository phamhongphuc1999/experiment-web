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
  arrivalTime: number; // Time when the process arrives (enters the ready queue)
  executionTime: number; // Total CPU time required to finish the process
  runtime: number; // CPU time already spent running
};

export type ProcessType = ProcessTimeType & {
  index?: number;
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
  MLFQ = 'mlfq',
}

export enum ProcessHistoryEnum {
  ACTION = 'actions',
  ENTRY = 'entry',
}

export enum ProcessMachineEvent {
  INITIALIZE_PROCESS = 'initialize-process',
  SET_METADATA = 'set-metadata',
  RESET = 'reset',
  CLEAR = 'clear',
}

export type ProcessHistoryType = {
  actionType: ProcessHistoryEnum;
  stateType: ProcessMachineStateType;
  eventType?: ProcessMachineEvent;
  timeInterval: number;
};
