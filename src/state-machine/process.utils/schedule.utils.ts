import { useProcessStore } from 'src/states/process.state';
import { ProcessContextType } from './type.utils';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';

export function scheduleProcessesEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const incomingQueue = context.incomingQueue;
  const fifoQueue = context.fifoQueue;
  if (incomingQueue && fifoQueue) {
    const updateQueue = useProcessStore.getState().fn.updateProcess;
    while (
      !incomingQueue.isEmpty() &&
      (incomingQueue.peek()?.arrivalTime || 0) <= context.counter
    ) {
      const _process = incomingQueue.pop();
      if (_process) {
        const readyProcess: ProcessType = { ..._process, state: ProcessStatusType.READY };
        fifoQueue.enqueue(readyProcess);
        updateQueue(readyProcess.pid, readyProcess);
      }
    }
  }
  return { incomingQueue, fifoQueue };
}
