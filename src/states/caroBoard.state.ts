import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type CaroBoardStateType = {
  turn: 0 | 1;
  steps: { [key: number]: 0 | 1 };
  stepsOrder: Array<number>;
  events: {
    move: (location: number) => void;
  };
};

export const useCaroBoardStore = create<CaroBoardStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      turn: 0,
      steps: {},
      stepsOrder: [],
      events: {
        move: (location) => {
          set((state) => {
            state.steps[location] = state.turn;
            state.turn = (1 - state.turn) as 1 | 0;
            state.stepsOrder.push(location);
          });
        },
      },
    };
  })
);
