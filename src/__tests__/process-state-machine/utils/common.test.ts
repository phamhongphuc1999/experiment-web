import {
  initializeProcessesAction,
  loadProcessContextEntry,
} from 'src/state-machine/process.utils';
import { ProcessMachineEvent } from 'src/types/process.type';
import { afterAll, assert, describe, it, vi } from 'vitest';
import { initialProcesses } from '../fake-data';
import { ProcessContextType } from 'src/state-machine/process.utils/type.utils';

vi.mock('src/states/process.state', () => {
  return {
    useProcessStore: {
      getState: vi.fn(() => ({
        fn: { setMetadata: vi.fn() },
      })),
    },
  };
});

vi.useFakeTimers();

describe('Common utils test', () => {
  afterAll(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });
  it('initializeProcessesAction', () => {
    const { newQueue, waitingQueue, readyQueue } = initializeProcessesAction({
      type: ProcessMachineEvent.INITIALIZE_PROCESS,
      processes: initialProcesses,
    });
    assert.isOk(waitingQueue?.isEmpty());
    assert.isOk(readyQueue?.isEmpty());
    assert.isOk(newQueue?.size() == 3);
    let arrivalTime = 0;
    while (!newQueue.isEmpty()) {
      const item = newQueue.pop();
      assert.isOk(item != undefined);
      assert.isOk(arrivalTime <= item.arrivalTime);
      arrivalTime = item.arrivalTime;
    }
  });
  it('loadProcessContextEntry', () => {
    const { newQueue, waitingQueue, readyQueue } = initializeProcessesAction({
      type: ProcessMachineEvent.INITIALIZE_PROCESS,
      processes: initialProcesses,
    });
    const context: Omit<ProcessContextType, 'currentProcess'> = {
      interval: 100,
      counter: 2,
      newQueue,
      waitingQueue,
      readyQueue,
    };
    const PID = '52227ece-ad70-4d20-b196-026479e33770';
    const result = loadProcessContextEntry({ ...context, currentProcess: undefined });
    assert.isEmpty(result);
    readyQueue?.enqueue(initialProcesses[PID]);
    const result1 = loadProcessContextEntry({ ...context, currentProcess: undefined });
    assert.isOk(result1.currentProcess?.pid == PID);
  });
});
