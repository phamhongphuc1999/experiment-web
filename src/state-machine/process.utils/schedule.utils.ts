import { useProcessStore } from 'src/states/process.state';
import { ProcessContextType } from './type.utils';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';

export function scheduleProcessesEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const newQueue = context.newQueue;
  const readyQueue = context.readyQueue;
  if (newQueue && readyQueue) {
    const updateProcess = useProcessStore.getState().fn.updateProcess;
    while (!newQueue.isEmpty() && (newQueue.peek()?.arrivalTime || 0) <= context.counter) {
      const _process = newQueue.pop();
      if (_process) {
        const readyProcess: ProcessType = { ..._process, state: ProcessStatusType.READY };
        readyQueue.enqueue(readyProcess);
        updateProcess(readyProcess.pid, readyProcess);
      }
    }
  }
  return { newQueue, readyQueue };
}
