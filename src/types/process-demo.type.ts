export enum ProcessMachineStateType {
  INITIAL = 'initial',
  RUN_PROCESS = 'run-process',
  SAVE_PROCESS_CONTEXT = 'save-process-context',
  SCHEDULE = 'schedule',
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

export type ProcessType = {
  pid: string;
  arrivalTime: number;
  executionTime: number;
  remainingTime: number;
  state: ProcessStatusType;
};

export enum SchedulerModeType {
  FIFO = 'fifo',
  SJF = 'sjf',
  ROUND_ROBIN = 'round-robin',
}
