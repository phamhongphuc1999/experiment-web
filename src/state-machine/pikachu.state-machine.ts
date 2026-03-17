'use client';

import { createActorContext } from '@xstate/react';
import {
  PikachuContextType,
  PikachuEventType,
  PikachuMachineEvent,
  PikachuMachineStateType,
} from 'src/types/pikachu.type';
import { assign, setup } from 'xstate';
import { changeBoardAction, move } from './pikachu.utils/board.utils';
import { createPikachuAction } from './pikachu.utils/create.utils';

const pikachuMachine = setup({
  types: { events: {} as PikachuEventType, context: {} as PikachuContextType },
  actions: {
    scheduleResetSelection: ({ context, self }) => {
      if (context.selectedPath.length === 0) return;

      setTimeout(() => {
        self.send({ type: PikachuMachineEvent.RESET_SELECTION });
      }, 300);
    },
  },
}).createMachine({
  id: 'process-machine',
  initial: PikachuMachineStateType.INITIAL,
  context: {
    position: undefined,
    selectedPath: [],
    randomCounter: 1,
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
        [PikachuMachineEvent.LOAD_SAVE_GAME]: {
          target: PikachuMachineStateType.PLAYING,
        },
      },
    },
    [PikachuMachineStateType.PLAYING]: {
      on: {
        [PikachuMachineEvent.CREATE]: {
          target: PikachuMachineStateType.PLAYING,
          actions: assign(({ event }) => {
            return createPikachuAction(event);
          }),
        },
        [PikachuMachineEvent.MOVE]: {
          actions: [
            assign(({ context, event, self: { send } }) => {
              return move(context, event, send);
            }),
            'scheduleResetSelection',
          ],
        },
        [PikachuMachineEvent.RESET_SELECTION]: {
          actions: assign(() => {
            return { position: undefined, selectedPath: [] };
          }),
        },
        [PikachuMachineEvent.CHANGE]: {
          actions: assign(() => {
            return changeBoardAction();
          }),
        },
        [PikachuMachineEvent.OUT_OF_MOVE]: {
          target: PikachuMachineStateType.OUT_OF_MOVE,
        },
        [PikachuMachineEvent.SHOW_HINT]: {
          actions: assign(({ context }) => {
            return { hintRunning: !context.hintRunning };
          }),
        },
        [PikachuMachineEvent.WIN]: {
          target: PikachuMachineStateType.INITIAL,
        },
      },
    },
    [PikachuMachineStateType.OUT_OF_MOVE]: {
      on: {
        [PikachuMachineEvent.CHANGE]: {
          target: PikachuMachineStateType.PLAYING,
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
