import { useMachine } from '@xstate/react';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineStateType } from 'src/types/process.type';
import { assign, setup } from 'xstate';
import {
  clearAction,
  initializeProcessesAction,
  loadProcessContextEntry,
  resetAction,
  runProcessAction,
  runProcessEntry,
  saveProcessContextEntry,
} from './process.utils';
import { scheduleProcessesEntry } from './process.utils/schedule.utils';
import {
  ProcessContextType,
  ProcessEventType,
  ProcessMachineEvent,
} from './process.utils/type.utils';

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
    incomingQueue: null,
    blockQueue: null,
    fifoQueue: null,
    currentProcess: null,
  },
  states: {
    [ProcessMachineStateType.INITIAL]: {
      entry: () => {
        console.debug(`Entry: ${ProcessMachineStateType.INITIAL}`);
      },
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
        console.debug(`Entry: ${ProcessMachineStateType.SCHEDULE}`);
        return scheduleProcessesEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.LOAD_PROCESS_CONTEXT,
          guard: ({ context }) => !context.currentProcess,
        },
        { target: ProcessMachineStateType.RUN_PROCESS },
      ],
    },
    [ProcessMachineStateType.LOAD_PROCESS_CONTEXT]: {
      entry: assign(({ context }) => {
        console.debug(`Entry: ${ProcessMachineStateType.LOAD_PROCESS_CONTEXT}`);
        return loadProcessContextEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.RUN_PROCESS,
          guard: ({ context }) => !!context.currentProcess || !context.incomingQueue?.isEmpty(),
        },
        {
          target: ProcessMachineStateType.ENDED,
          guard: ({ context }) => !context.currentProcess,
        },
      ],
    },
    [ProcessMachineStateType.RUN_PROCESS]: {
      entry: ({ context }) => {
        console.debug(`Entry: ${ProcessMachineStateType.RUN_PROCESS}`);
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
      entry: assign(({ context }) => {
        console.debug(`Entry: ${ProcessMachineStateType.SAVE_PROCESS_CONTEXT}`);
        return saveProcessContextEntry(context);
      }),
      always: { target: ProcessMachineStateType.SCHEDULE },
    },
    [ProcessMachineStateType.ENDED]: {
      entry: () => {
        console.debug(`Entry: ${ProcessMachineStateType.ENDED}`);
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
