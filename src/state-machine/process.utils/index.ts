import { useProcessStore } from 'src/states/process.state';
import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import { InitializeProcessEventType, ProcessContextType } from './type.utils';

export function initializeProcessesAction(
  event: InitializeProcessEventType
): Partial<ProcessContextType> {
  const processes = Object.values(event.processes);
  const incomingQueue = new PriorityQueue<ProcessType>((a, b) => {
    return a.arrivalTime - b.arrivalTime;
  });
  processes.forEach((p) => incomingQueue.push(p));
  const setMetadata = useProcessStore.getState().fn.setMetadata;
  setMetadata({ status: 'running' });
  return {
    incomingQueue,
    blockQueue: new Queue<ProcessType>(),
    fifoQueue: new Queue<ProcessType>(),
  };
}

export function loadProcessContextEntry(context: ProcessContextType): Partial<ProcessContextType> {
  if (!context.currentProcess && !context.fifoQueue?.isEmpty()) {
    return { currentProcess: context.fifoQueue?.dequeue() };
  }
  return {};
}

export function runProcessEntry(context: ProcessContextType) {
  if (context.currentProcess) {
    useProcessStore
      .getState()
      .fn.updateProcess(context.currentProcess.pid, { state: ProcessStatusType.RUNNING });
  }
}

export function runProcessAction(context: ProcessContextType): Partial<ProcessContextType> {
  const currentProcess = context.currentProcess;
  if (currentProcess) {
    const remainingTime = currentProcess.remainingTime - 1;
    if (remainingTime > 0)
      return { currentProcess: { ...currentProcess, remainingTime }, counter: context.counter + 1 };
    return {
      currentProcess: { ...currentProcess, remainingTime: 0, state: ProcessStatusType.TERMINATED },
      counter: context.counter + 1,
    };
  }
  return { currentProcess: null, counter: context.counter + 1 };
}

export function saveProcessContextEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const currentProcess = context.currentProcess;
  const updateProcess = useProcessStore.getState().fn.updateProcess;
  if (currentProcess) updateProcess(currentProcess.pid, currentProcess);
  if (currentProcess?.state == ProcessStatusType.TERMINATED) return { currentProcess: null };
  else return { currentProcess };
}

export function resetAction(): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.resetProcesses();
  return { incomingQueue: null, fifoQueue: null, counter: 0 };
}

export function clearAction(): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.clear();
  return { incomingQueue: null, fifoQueue: null, currentProcess: null, counter: 0 };
}
