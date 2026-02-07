import { useMachine } from '@xstate/react';
import { useProcessStore } from 'src/states/process.state';
import {
  ProcessHistoryEnum,
  ProcessHistoryType,
  ProcessMachineEvent,
  ProcessMachineStateType,
} from 'src/types/process.type';
import { assign, setup } from 'xstate';
import {
  clearAction,
  initializeProcessesAction,
  loadProcessContextEntry,
  resetAction,
  saveProcessContextEntry,
} from './process.utils';
import { runProcessAction, runProcessEntry } from './process.utils/run-process.utils';
import { scheduleProcessesEntry } from './process.utils/schedule.utils';
import { ProcessContextType, ProcessEventType } from './process.utils/type.utils';

const _updateHistory = useProcessStore.getState().fn.updateHistory;

function updateHistory(
  context: ProcessContextType,
  history: Omit<ProcessHistoryType, 'timeInterval'>
) {
  _updateHistory({ ...history, timeInterval: context.counter });
}

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
          actions: assign(({ context, event }) => {
            updateHistory(context, {
              actionType: ProcessHistoryEnum.ACTION,
              stateType: ProcessMachineStateType.INITIAL,
              eventType: ProcessMachineEvent.INITIALIZE_PROCESS,
            });
            return initializeProcessesAction(event);
          }),
        },
        [ProcessMachineEvent.SET_METADATA]: {
          actions: assign(({ context, event }) => {
            updateHistory(context, {
              actionType: ProcessHistoryEnum.ACTION,
              stateType: ProcessMachineStateType.INITIAL,
              eventType: ProcessMachineEvent.SET_METADATA,
            });
            return { interval: event.interval };
          }),
        },
        [ProcessMachineEvent.RESET]: {
          actions: assign(({ context }) => {
            updateHistory(context, {
              actionType: ProcessHistoryEnum.ACTION,
              stateType: ProcessMachineStateType.INITIAL,
              eventType: ProcessMachineEvent.RESET,
            });
            return resetAction();
          }),
        },
        [ProcessMachineEvent.CLEAR]: {
          actions: assign(({ context }) => {
            updateHistory(context, {
              actionType: ProcessHistoryEnum.ACTION,
              stateType: ProcessMachineStateType.INITIAL,
              eventType: ProcessMachineEvent.CLEAR,
            });
            return clearAction();
          }),
        },
      },
    },
    [ProcessMachineStateType.SCHEDULE]: {
      entry: assign(({ context }) => {
        updateHistory(context, {
          actionType: ProcessHistoryEnum.ENTRY,
          stateType: ProcessMachineStateType.SCHEDULE,
        });
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
        updateHistory(context, {
          actionType: ProcessHistoryEnum.ENTRY,
          stateType: ProcessMachineStateType.LOAD_PROCESS_CONTEXT,
        });
        return loadProcessContextEntry(context);
      }),
      always: [
        {
          target: ProcessMachineStateType.RUN_PROCESS,
          guard: ({ context }) =>
            !!context.currentProcess ||
            !context.newQueue?.isEmpty() ||
            !context.waitingQueue?.isEmpty(),
        },
        {
          target: ProcessMachineStateType.ENDED,
          guard: ({ context }) => !context.currentProcess,
        },
      ],
    },
    [ProcessMachineStateType.RUN_PROCESS]: {
      entry: assign(({ context }) => {
        updateHistory(context, {
          actionType: ProcessHistoryEnum.ENTRY,
          stateType: ProcessMachineStateType.RUN_PROCESS,
        });
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
            updateHistory(context, {
              actionType: ProcessHistoryEnum.ACTION,
              stateType: ProcessMachineStateType.RUN_PROCESS,
            });
            return runProcessAction(context);
          }),
        },
      },
    },
    [ProcessMachineStateType.SAVE_PROCESS_CONTEXT]: {
      entry: assign(({ context }) => {
        updateHistory(context, {
          actionType: ProcessHistoryEnum.ENTRY,
          stateType: ProcessMachineStateType.SAVE_PROCESS_CONTEXT,
        });
        return saveProcessContextEntry(context);
      }),
      always: { target: ProcessMachineStateType.SCHEDULE },
    },
    [ProcessMachineStateType.ENDED]: {
      entry: ({ context }) => {
        updateHistory(context, {
          actionType: ProcessHistoryEnum.ENTRY,
          stateType: ProcessMachineStateType.ENDED,
        });
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
