import { useProcessStore } from 'src/states/process.state';
import { ProcessStatusType, ProcessType } from 'src/types/process.type';
import { ProcessContextType } from './type.utils';

export function runProcessGuard(context: ProcessContextType): boolean {
  return (
    !!context.currentProcess || !context.newQueue?.isEmpty() || !context.waitingQueue?.isEmpty()
  );
}

export function runProcessEntry(context: ProcessContextType): Partial<ProcessContextType> {
  const currentProcess = context.currentProcess;
  if (currentProcess) {
    const updateProcess = useProcessStore.getState().fn.updateProcess;
    const currentBlockTask = currentProcess?.blockTasks?.[currentProcess.currentBlockTaskIndex];
    if (currentBlockTask?.arrivalTime == currentProcess.runtime) {
      const waitingQueue = context.waitingQueue;
      let newPriority: number | undefined = undefined;
      if (waitingQueue) newPriority = waitingQueue.enqueue(currentProcess);
      updateProcess(currentProcess.pid, {
        state: ProcessStatusType.WAITING,
        waitingPriority: newPriority,
      });
      return { waitingQueue, currentProcess: null };
    } else {
      const data: Partial<Omit<ProcessType, 'pid'>> = { state: ProcessStatusType.RUNNING };
      const saveProcess = useProcessStore.getState().processes[currentProcess.pid];

      if (saveProcess.beginAt === -1) {
        data.beginAt = context.counter;
      }

      updateProcess(currentProcess.pid, data);
      return { currentProcess: { ...currentProcess, ...data } };
    }
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
    while (!waitingQueue.isEmpty() && ++counter <= maxBlockTaskPerSlice) {
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
          const newPriority = waitingQueue.enqueue(updatedProcess);
          updateProcess(_waitingProcess.pid, {
            runtime,
            blockTasks: updatedBlockTasks,
            waitingPriority: newPriority,
          });
        } else if (runtime < _waitingProcess.executionTime) {
          const updatedProcess = {
            ..._waitingProcess,
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.READY,
            currentBlockTaskIndex: _waitingProcess.currentBlockTaskIndex + 1,
          };
          const newPriority = readyQueue.enqueue(updatedProcess);
          updateProcess(_waitingProcess.pid, {
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.READY,
            currentBlockTaskIndex: _waitingProcess.currentBlockTaskIndex + 1,
            readyPriority: newPriority,
          });
        } else {
          updateProcess(_waitingProcess.pid, {
            runtime,
            blockTasks: updatedBlockTasks,
            state: ProcessStatusType.TERMINATED,
            endAt: context.counter + 1,
          });
        }
      }
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
      currentProcess: {
        ...currentProcess,
        runtime,
        state: ProcessStatusType.TERMINATED,
        endAt: context.counter + 1,
      },
      counter: context.counter + 1,
      waitingQueue,
      readyQueue,
    };
  }
  return { currentProcess: null, counter: context.counter + 1, waitingQueue, readyQueue };
}
