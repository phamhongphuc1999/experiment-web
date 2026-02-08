import { useProcessStore } from 'src/states/process.state';
import { ProcessStatusType, SchedulerModeType } from 'src/types/process.type';
import { ProcessContextType } from './type.utils';

export function saveProcessContextEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const currentProcess = context.currentProcess;
  const updateProcess = useProcessStore.getState().fn.updateProcess;
  if (currentProcess) updateProcess(currentProcess.pid, currentProcess);
  if (currentProcess?.state == ProcessStatusType.TERMINATED) return { currentProcess: null };
  else {
    const mode = useProcessStore.getState().mode;
    if (mode == SchedulerModeType.ROUND_ROBIN) {
      const readyQueue = context.readyQueue;
      if (readyQueue && currentProcess) {
        const newPriority = readyQueue.enqueue({
          ...currentProcess,
          state: ProcessStatusType.READY,
        });
        updateProcess(currentProcess.pid, { readyPriority: newPriority });
      }
      return { currentProcess: undefined, readyQueue };
    } else return { currentProcess };
  }
}
