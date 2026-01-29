'use client';

import { useMachine } from '@xstate/react';
import { assign, setup } from 'xstate';
import { useProcessStore } from '../states/process.state';
import { PriorityQueue } from '../structure/PriorityQueue';
import { ProcessMachineStateType, ProcessType } from '../types/process-demo.type';
import {
  loadProcessAction,
  ProcessContextType,
  ProcessEventType,
  ProcessMachineEvent,
  clearAction,
  runProcessAction,
  runProcessEntry,
  scheduleEntry,
  resetAction,
} from './process.utils';

export const processMachine = setup({
  types: {
    events: {} as ProcessEventType,
    context: {} as ProcessContextType,
  },
  delays: {
    INTERVAL: ({ context }) => context.interval,
  },
}).createMachine({
  id: 'process-machine',
  initial: ProcessMachineStateType.INITIAL,
  context: {
    interval: 1000,
    counter: 0,
    priorityQueue: null as PriorityQueue<ProcessType> | null,
    currentProcess: null as ProcessType | null,
  },
  states: {
    [ProcessMachineStateType.INITIAL]: {
      entry: () => console.debug('entry INITIAL'),
      on: {
        [ProcessMachineEvent.LOAD_PROCESS]: {
          target: ProcessMachineStateType.SCHEDULE,
          actions: assign(({ event }) => {
            return loadProcessAction(event);
          }),
        },
        [ProcessMachineEvent.SET_METADATA]: {
          actions: assign(({ event }) => {
            return { interval: event.interval };
          }),
        },
        [ProcessMachineEvent.RESET]: {
          actions: assign(() => {
            return resetAction();
          }),
        },
        [ProcessMachineEvent.CLEAR]: {
          actions: assign(() => {
            return clearAction();
          }),
        },
      },
    },
    [ProcessMachineStateType.SCHEDULE]: {
      entry: assign(({ context }) => {
        return scheduleEntry(context);
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
        runProcessEntry(context);
      },
      after: {
        INTERVAL: {
          target: ProcessMachineStateType.SAVE_PROCESS_CONTEXT,
          actions: assign(({ context }) => {
            return runProcessAction(context);
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
        console.debug('entry ENDED');
        const fn = useProcessStore.getState().fn;
        fn.setMetadata({ status: 'ended' });
      },
      on: {
        [ProcessMachineEvent.RESET]: {
          target: ProcessMachineStateType.INITIAL,
          actions: assign(() => {
            return resetAction();
          }),
        },
        [ProcessMachineEvent.CLEAR]: {
          target: ProcessMachineStateType.INITIAL,
          actions: assign(() => {
            return clearAction();
          }),
        },
      },
    },
  },
});

export function useProcessStateMachine() {
  return useMachine(processMachine);
}
