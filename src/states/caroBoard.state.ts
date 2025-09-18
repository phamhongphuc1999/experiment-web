import { WinStateType } from 'src/global';
import { checkWin } from 'src/services/caro.utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useCaroConfigStore } from './caroConfig.state';

type CaroBoardStateType = {
  status: 'playing' | 'win';
  turn: 0 | 1;
  steps: { [key: number]: 0 | 1 };
  stepsOrder: Array<number>;
  events: {
    move: (location: number) => void;
    undo: () => void;
    reset: () => void;
  };
  winState?: WinStateType;
};

export const useCaroBoardStore = create<CaroBoardStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      status: 'playing',
      turn: 0,
      steps: {},
      stepsOrder: [],
      events: {
        move: (location) => {
          set((state) => {
            state.steps[location] = state.turn;
            state.stepsOrder.push(location);

            const { numberOfRows, numberOfColumns } = useCaroConfigStore.getState();
            const _winState = checkWin(
              state.steps,
              location,
              state.turn,
              numberOfRows,
              numberOfColumns
            );
            if (_winState.mode.length > 0) {
              state.winState = _winState;
              state.status = 'win';
            } else state.turn = (1 - state.turn) as 1 | 0;
          });
        },
        undo: () => {
          set((state) => {
            const len = state.stepsOrder.length;
            if (len > 0) {
              const currentStep = state.stepsOrder[len - 1];
              delete state.steps[currentStep];
              state.stepsOrder.pop();
              state.turn = (1 - state.turn) as 1 | 0;
            }
          });
        },
        reset: () => {
          set((state) => {
            state.status = 'playing';
            state.turn = 0;
            state.steps = {};
            state.stepsOrder = [];
            state.winState = undefined;
          });
        },
      },
    };
  })
);
