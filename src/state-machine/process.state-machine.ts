'use client';

import { useMachine } from '@xstate/react';
import { ProcessMachineStateType } from 'src/types/process-demo.type';
import { createMachine } from 'xstate';

export const processMachine = createMachine({
  id: 'process-machine',
  initial: ProcessMachineStateType.INITIAL,
  states: {
    [ProcessMachineStateType.INITIAL]: {},
    [ProcessMachineStateType.RUN_PROCESS]: {},
    [ProcessMachineStateType.SAVE_PROCESS_CONTEXT]: {},
    [ProcessMachineStateType.SCHEDULE]: {},
    [ProcessMachineStateType.LOAD_PROCESS_CONTEXT]: {},
    [ProcessMachineStateType.ENDED]: {},
  },
});

export function useProcessStateMachine() {
  return useMachine(processMachine);
}
