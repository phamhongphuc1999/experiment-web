import { useMachine } from '@xstate/react';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineEvent, ProcessMachineStateType } from 'src/types/process.type';
import { assign, setup } from 'xstate';
import {
  clearAction,
  initializeProcessesAction,
  loadProcessContextEntry,
  resetAction,
} from './process.utils';
import { runProcessAction, runProcessEntry, runProcessGuard } from './process.utils/run.utils';
import { saveProcessContextEntry } from './process.utils/save.utils';
import { scheduleProcessesEntry, scheduleProcessGuard } from './process.utils/schedule.utils';
import { ProcessContextType, ProcessEventType } from './process.utils/type.utils';

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
    newQueue: null,
    waitingQueue: null,
    readyQueue: null,
    currentProcess: null,
  },
  states: {
    [ProcessMachineStateType.INITIAL]: {
      on: {
        [ProcessMachineEvent.INITIALIZE_PROCESS]: {
          target: ProcessMachineStateType.SCHEDULE,
          actions: assign(({ event }) => {
            return initializeProcessesAction(event);
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
        return scheduleProcessesEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.LOAD_PROCESS_CONTEXT,
          guard: ({ context }) => {
            return scheduleProcessGuard(context);
          },
        },
        { target: ProcessMachineStateType.RUN_PROCESS },
      ],
    },
    [ProcessMachineStateType.LOAD_PROCESS_CONTEXT]: {
      entry: assign(({ context }) => {
        return loadProcessContextEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.RUN_PROCESS,
          guard: ({ context }) => {
            return runProcessGuard(context);
          },
        },
        {
          target: ProcessMachineStateType.ENDED,
          guard: ({ context }) => !context.currentProcess,
        },
      ],
    },
    [ProcessMachineStateType.RUN_PROCESS]: {
      entry: assign(({ context }) => {
        return runProcessEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.LOAD_PROCESS_CONTEXT,
          guard: ({ context }) => !context.currentProcess && !context.readyQueue?.isEmpty(),
        },
      ],
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
      entry: assign(({ context }) => {
        return saveProcessContextEntry(context);
      }),
      always: { target: ProcessMachineStateType.SCHEDULE },
    },
    [ProcessMachineStateType.ENDED]: {
      entry: () => {
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
