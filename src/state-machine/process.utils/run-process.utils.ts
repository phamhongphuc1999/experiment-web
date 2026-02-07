import { useProcessStore } from 'src/states/process.state';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import { ProcessContextType } from './type.utils';

export function runProcessEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const currentProcess = context.currentProcess;
  if (currentProcess) {
    const updateProcess = useProcessStore.getState().fn.updateProcess;
    const currentBlockTask = currentProcess?.blockTasks?.[currentProcess.currentBlockTaskIndex];
    if (currentBlockTask?.arrivalTime == currentProcess.runtime) {
      const waitingQueue = context.waitingQueue;
      if (waitingQueue) waitingQueue.enqueue(currentProcess);
      updateProcess(currentProcess.pid, { state: ProcessStatusType.WAITING });
      return { waitingQueue, currentProcess: null };
    } else updateProcess(currentProcess.pid, { state: ProcessStatusType.RUNNING });
  }
  return {};
}

export function runProcessAction(context: ProcessContextType): Partial<ProcessContextType> {
  // run waiting tasks
  const waitingQueue = context.waitingQueue;
  const readyQueue = context.readyQueue;
  if (waitingQueue && readyQueue) {
    const maxBlockTaskPerSlice = useProcessStore.getState().maxBlockTaskPerSlice;
    let counter = 0;
    const updateProcess = useProcessStore.getState().fn.updateProcess;
    const _willRunWaitingQueue: Array<ProcessType> = [];
    while (!waitingQueue.isEmpty() && counter <= maxBlockTaskPerSlice) {
      _willRunWaitingQueue.push(waitingQueue.dequeue()!);
    }
    for (const _waitingProcess of _willRunWaitingQueue) {
      if (_waitingProcess && _waitingProcess.blockTasks) {
        const currentBlockTask = _waitingProcess.blockTasks[_waitingProcess.currentBlockTaskIndex];
        const runtime = _waitingProcess.runtime + 1;
        const taskRuntime = currentBlockTask.runtime + 1;

        const updatedBlockTasks = [..._waitingProcess.blockTasks];
        updatedBlockTasks[_waitingProcess.currentBlockTaskIndex] = {
          ...currentBlockTask,
          runtime: taskRuntime,
        };

        if (taskRuntime < currentBlockTask.executionTime) {
          const updatedProcess = { ..._waitingProcess, runtime, blockTasks: updatedBlockTasks };
          updateProcess(_waitingProcess.pid, { runtime, blockTasks: updatedBlockTasks });
          waitingQueue.enqueue(updatedProcess);
        } else if (runtime < _waitingProcess.executionTime) {
          const updatedProcess = {
            ..._waitingProcess,
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.READY,
            currentBlockTaskIndex: _waitingProcess.currentBlockTaskIndex + 1,
          };
          updateProcess(_waitingProcess.pid, {
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.READY,
            currentBlockTaskIndex: _waitingProcess.currentBlockTaskIndex + 1,
          });
          readyQueue.enqueue(updatedProcess);
        } else {
          updateProcess(_waitingProcess.pid, {
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.TERMINATED,
          });
        }
      }
      counter++;
    }
  }
  // run current process
  const currentProcess = context.currentProcess;
  if (currentProcess) {
    const runtime = currentProcess.runtime + 1;
    if (runtime < currentProcess.executionTime)
      return {
        currentProcess: { ...currentProcess, runtime },
        counter: context.counter + 1,
        waitingQueue,
        readyQueue,
      };
    return {
      currentProcess: { ...currentProcess, runtime: 0, state: ProcessStatusType.TERMINATED },
      counter: context.counter + 1,
      waitingQueue,
      readyQueue,
    };
  }
  return { currentProcess: null, counter: context.counter + 1, waitingQueue, readyQueue };
}
