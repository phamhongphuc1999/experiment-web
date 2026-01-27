export enum ProcessMachineStateType {
  INITIAL = 'initial',
  RUN_PROCESS = 'run-process',
  SAVE_PROCESS_CONTEXT = 'save-process-context',
  SCHEDULE = 'schedule',
  LOAD_PROCESS_CONTEXT = 'load-process-context',
  ENDED = 'ended',
}

export type ProcessStatusType = 'new' | 'ready' | 'running' | 'waiting' | 'finished';

export type ProcessType = {
  pid: string;
  arrivalTime: number;
  executionTime: number;
  remainingTime: number;
  state: ProcessStatusType;
};

export type SchedulerModeType = 'fifo' | 'sjf' | 'round-robin';
