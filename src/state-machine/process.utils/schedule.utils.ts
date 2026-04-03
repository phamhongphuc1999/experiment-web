import { useProcessStore } from 'src/states/process.state';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import { ProcessContextType } from './type.utils';

export function scheduleProcessGuard(context: ProcessContextType): boolean {
  return !context.currentProcess;
}

export function scheduleProcessesEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const newQueue = context.newQueue;
  const readyQueue = context.readyQueue;
  const metricsData = context.metricsData;
  if (newQueue && readyQueue) {
    const updateProcess = useProcessStore.getState().fn.updateProcess;
    while (!newQueue.isEmpty() && (newQueue.peek()?.arrivalTime || 0) <= context.counter) {
      const _process = newQueue.pop();
      if (_process) {
        const readyProcess: ProcessType = { ..._process, state: ProcessStatusType.READY };
        const newPriority = readyQueue.enqueue(readyProcess);
        metricsData[readyProcess.pid] = {
          index: readyProcess.index,
          arrivalTime: readyProcess.arrivalTime,
          burstTime: readyProcess.executionTime,
        };
        updateProcess(readyProcess.pid, { ...readyProcess, readyPriority: newPriority });
      }
    }
  }
  return { newQueue, readyQueue, metricsData: { ...metricsData } };
}
