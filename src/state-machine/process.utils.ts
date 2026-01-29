import { ProcessDataObjectType, useProcessStore } from 'src/states/process.state';
import { PriorityQueue } from 'src/structure/PriorityQueue';
import { ProcessStatusType, ProcessType } from 'src/types/process-demo.type';

export enum ProcessMachineEvent {
  LOAD_PROCESS = 'load-process',
  SET_METADATA = 'set-metadata',
  RESET = 'reset',
  CLEAR = 'clear',
}

export interface ProcessContextType {
  interval: number;
  counter: number;
  priorityQueue: PriorityQueue<ProcessType> | null;
  currentProcess: ProcessType | null;
}

type LoadProcessEventType = {
  type: ProcessMachineEvent.LOAD_PROCESS;
  processes: ProcessDataObjectType;
};

type SetMetadataEventType = {
  type: ProcessMachineEvent.SET_METADATA;
  interval?: number;
};

export type ProcessEventType =
  | LoadProcessEventType
  | SetMetadataEventType
  | { type: ProcessMachineEvent.RESET }
  | { type: ProcessMachineEvent.CLEAR };

export function loadProcessAction(event: LoadProcessEventType): Partial<ProcessContextType> {
  const processes = Object.values(event.processes);
  const queue = new PriorityQueue<ProcessType>((a, b) => {
    const { mode } = useProcessStore.getState();
    if (mode === 'fifo') {
      return a.arrivalTime - b.arrivalTime;
    }
    if (mode === 'sjf') {
      return a.executionTime - b.executionTime;
    }
    return 0;
  });
  processes.forEach((p) => queue.push(p));
  return { priorityQueue: queue };
}

export function scheduleEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.setMetadata({ status: 'running' });
  if (context.priorityQueue && !context.priorityQueue.isEmpty()) {
    const next = context.priorityQueue.pop();
    return { currentProcess: next };
  }
  return { currentProcess: null };
}

export function runProcessEntry(context: ProcessContextType) {
  if (context.currentProcess) {
    console.debug(`Running process ${context.currentProcess.pid}`);
    useProcessStore
      .getState()
      .fn.updateProcess(context.currentProcess.pid, { state: ProcessStatusType.RUNNING });
  }
}

export function runProcessAction(context: ProcessContextType): Partial<ProcessContextType> {
  if (context.currentProcess) {
    const updated = {
      ...context.currentProcess,
      remainingTime: Math.max(0, context.currentProcess.remainingTime - 1),
    };
    updated.state =
      updated.remainingTime === 0 ? ProcessStatusType.TERMINATED : ProcessStatusType.READY;

    useProcessStore.getState().fn.updateProcess(updated.pid, {
      remainingTime: updated.remainingTime,
      state: updated.state,
    });
    return { currentProcess: updated, counter: context.counter + 1 };
  }
  return {};
}

export function resetAction(): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.resetProcesses();
  const processes = Object.values(useProcessStore.getState().processes);
  const queue = new PriorityQueue<ProcessType>((a, b) => {
    const mode = useProcessStore.getState().mode;
    if (mode === 'fifo') {
      return a.arrivalTime - b.arrivalTime;
    }
    if (mode === 'sjf') {
      return a.executionTime - b.executionTime;
    }
    return 0;
  });
  processes.forEach((p) => queue.push(p));
  return { priorityQueue: queue, counter: 0 };
}

export function clearAction(): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.clear();
  return { priorityQueue: null, currentProcess: null, counter: 0 };
}
