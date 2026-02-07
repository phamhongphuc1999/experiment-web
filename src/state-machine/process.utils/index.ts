import { useProcessStore } from 'src/states/process.state';
import { PriorityQueue } from 'src/structure/PriorityQueue';
import Queue from 'src/structure/Queue';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import { InitializeProcessEventType, ProcessContextType } from './type.utils';

export function initializeProcessesAction(
  event: InitializeProcessEventType
): Partial<ProcessContextType> {
  const processes = Object.values(event.processes);
  const newQueue = new PriorityQueue<ProcessType>((a, b) => {
    return a.arrivalTime - b.arrivalTime;
  });
  processes.forEach((p) => newQueue.push(p));
  const setMetadata = useProcessStore.getState().fn.setMetadata;
  setMetadata({ status: 'running' });
  return { newQueue, waitingQueue: new Queue<ProcessType>(), readyQueue: new Queue<ProcessType>() };
}

export function loadProcessContextEntry(context: ProcessContextType): Partial<ProcessContextType> {
  if (!context.currentProcess && !context.readyQueue?.isEmpty()) {
    return { currentProcess: context.readyQueue?.dequeue() };
  }
  return {};
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
  return { newQueue: null, readyQueue: null, waitingQueue: null, currentProcess: null, counter: 0 };
}

export function clearAction(): Partial<ProcessContextType> {
  const fn = useProcessStore.getState().fn;
  fn.clear();
  return { newQueue: null, readyQueue: null, waitingQueue: null, currentProcess: null, counter: 0 };
}
