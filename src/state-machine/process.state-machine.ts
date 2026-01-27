'use client';

import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';
import { ProcessDataObjectType, useProcessStore } from '../states/process.state';
import { PriorityQueue } from '../structure/PriorityQueue';
import {
  ProcessMachineStateType,
  ProcessStatusType,
  ProcessType,
} from '../types/process-demo.type';

export enum ProcessMachineEvent {
  LOAD_PROCESS = 'load-process',
  RESET = 'reset',
}

export const processMachine = createMachine({
  id: 'process-machine',
  initial: ProcessMachineStateType.INITIAL,
  context: {
    priorityQueue: null as PriorityQueue<ProcessType> | null,
    currentProcess: null as ProcessType | null,
  },
  types: {
    events: {} as
      | { type: ProcessMachineEvent.LOAD_PROCESS; processes: ProcessDataObjectType }
      | { type: ProcessMachineEvent.RESET },
    context: {} as {
      priorityQueue: PriorityQueue<ProcessType> | null;
      currentProcess: ProcessType | null;
    },
  },
  states: {
    [ProcessMachineStateType.INITIAL]: {
      entry: () => console.debug('entry INITIAL'),
      on: {
        [ProcessMachineEvent.LOAD_PROCESS]: {
          target: ProcessMachineStateType.SCHEDULE,
          actions: assign(({ event }) => {
            const processes = Object.values(event.processes);
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
            return { priorityQueue: queue };
          }),
        },
      },
    },
    [ProcessMachineStateType.SCHEDULE]: {
      entry: assign(({ context }) => {
        const fn = useProcessStore.getState().fn;
        fn.setStatus('running');
        if (context.priorityQueue && !context.priorityQueue.isEmpty()) {
          const next = context.priorityQueue.pop();
          return { currentProcess: next };
        }
        return { currentProcess: null };
      }),
      always: [
        {
          target: ProcessMachineStateType.RUN_PROCESS,
          guard: ({ context }) => !!context.currentProcess,
        },
        {
          target: ProcessMachineStateType.ENDED,
          guard: ({ context }) => !context.currentProcess,
        },
      ],
    },
    [ProcessMachineStateType.RUN_PROCESS]: {
      entry: ({ context }) => {
        if (context.currentProcess) {
          console.debug(`Running process ${context.currentProcess.pid}`);
          useProcessStore
            .getState()
            .fn.updateProcess(context.currentProcess.pid, { state: ProcessStatusType.RUNNING });
        }
      },
      after: {
        1000: {
          target: ProcessMachineStateType.SAVE_PROCESS_CONTEXT,
          actions: assign(({ context }) => {
            if (context.currentProcess) {
              const updated = {
                ...context.currentProcess,
                remainingTime: Math.max(0, context.currentProcess.remainingTime - 1),
              };
              updated.state =
                updated.remainingTime === 0
                  ? ProcessStatusType.TERMINATED
                  : ProcessStatusType.READY;

              useProcessStore.getState().fn.updateProcess(updated.pid, {
                remainingTime: updated.remainingTime,
                state: updated.state,
              });
              return { currentProcess: updated };
            }
            return {};
          }),
        },
      },
    },
    [ProcessMachineStateType.SAVE_PROCESS_CONTEXT]: {
      entry: ({ context }) => {
        if (context.currentProcess && context.currentProcess.state !== 'terminated') {
          context.priorityQueue?.push(context.currentProcess);
        }
      },
      always: { target: ProcessMachineStateType.SCHEDULE },
    },
    [ProcessMachineStateType.ENDED]: {
      entry: () => {
        const fn = useProcessStore.getState().fn;
        fn.setStatus('ended');
        console.debug('entry ENDED');
      },
      on: {
        [ProcessMachineEvent.RESET]: {
          target: ProcessMachineStateType.INITIAL,
          actions: assign(() => {
            const fn = useProcessStore.getState().fn;
            fn.clear();
            return { priorityQueue: null, currentProcess: null };
          }),
        },
      },
    },
  },
});

export function useProcessStateMachine() {
  return useMachine(processMachine);
}
