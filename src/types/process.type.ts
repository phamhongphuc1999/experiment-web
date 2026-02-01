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

export type ProcessType = {
  pid: string;
  arrivalTime: number;
  executionTime: number;
  remainingTime: number;
  blockTasks?: Array<[number, number]>; // simulate the waiting state (example: I/O)
  state: ProcessStatusType;
};

export enum SchedulerModeType {
  FIFO = 'fifo',
  SJF = 'sjf',
  ROUND_ROBIN = 'round-robin',
}
