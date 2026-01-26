export type ProcessStatusType = 'ready' | 'running' | 'finished';

export type ProcessType = {
  pid: number;
  remainingTime: number;
  state: ProcessStatusType;
};
