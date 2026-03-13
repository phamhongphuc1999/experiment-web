'use client';

import { createActorContext } from '@xstate/react';
import {
  PikachuContextType,
  PikachuEventType,
  PikachuMachineEvent,
  PikachuMachineStateType,
} from 'src/types/pikachu.type';
import { assign, setup } from 'xstate';
import { createPikachuAction } from './pikachu.utils/create.utils';
import { changeBoardAction, move } from './pikachu.utils/board.utils';

const pikachuMachine = setup({
  types: {
    events: {} as PikachuEventType,
    context: {} as PikachuContextType,
  },
}).createMachine({
  id: 'process-machine',
  initial: PikachuMachineStateType.INITIAL,
  context: {
    position: undefined,
    selectedPath: [],
    randomCounter: 1,
    hintCountdown: 0,
    hintRunning: false,
  },
  states: {
    [PikachuMachineStateType.INITIAL]: {
      on: {
        [PikachuMachineEvent.CREATE]: {
          target: PikachuMachineStateType.PLAYING,
          actions: assign(({ event }) => {
            return createPikachuAction(event);
          }),
        },
      },
    },
    [PikachuMachineStateType.PLAYING]: {
      on: {
        [PikachuMachineEvent.MOVE]: {
          actions: assign(({ context, event }) => {
            return move(context, event);
          }),
        },
        [PikachuMachineEvent.SHOW_HINT]: {
          //
        },
      },
    },
    [PikachuMachineStateType.CHANGING]: {
      on: {
        [PikachuMachineEvent.CHANGE]: {
          actions: assign(() => {
            return changeBoardAction();
          }),
        },
      },
    },
    [PikachuMachineStateType.ENDED]: {},
  },
});

export const PikachuMachineContext = createActorContext(pikachuMachine);

export function usePikachuStateMachine() {
  const actorRef = PikachuMachineContext.useActorRef();
  const state = PikachuMachineContext.useSelector((s) => s);

  return { state, send: actorRef.send };
}
