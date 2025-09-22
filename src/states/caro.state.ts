import { WinStateType } from 'src/global';
import { checkWin } from 'src/services/caro.utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type PlayModeType = 'offline' | 'online' | 'machine';

type CaroMetadataType = {
  playMode: PlayModeType;
  status: 'playing' | 'win';
  numberOfRows: number;
  numberOfColumns: number;
};

type CaroStateType = {
  metadata: CaroMetadataType;
  turn: 0 | 1;
  steps: { [key: number]: 0 | 1 };
  stepsOrder: Array<number>;
  events: {
    setCaroMetadata: (metadata: Partial<Omit<CaroMetadataType, 'status'>>) => void;
    move: (location: number) => void;
    undo: () => void;
    reset: (turn?: 0 | 1) => void;
  };
  winState?: WinStateType;
};

export const useCaroStore = create<CaroStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      metadata: {
        playMode: 'offline',
        numberOfRows: 10,
        numberOfColumns: 10,
        status: 'playing',
      },
      turn: 0,
      steps: {},
      stepsOrder: [],
      events: {
        move: (location) => {
          set((state) => {
            state.steps[location] = state.turn;
            state.stepsOrder.push(location);

            const { numberOfRows, numberOfColumns } = state.metadata;
            const _winState = checkWin({
              steps: state.steps,
              currentStep: location,
              currentPlayer: state.turn,
              numberOfRows,
              numberOfColumns,
            });
            if (_winState.winMode.length > 0) {
              state.winState = _winState;
              state.metadata.status = 'win';
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
        reset: (turn) => {
          set((state) => {
            state.metadata.status = 'playing';
            if (turn != undefined) state.turn = turn;
            state.steps = {};
            state.stepsOrder = [];
            state.winState = undefined;
          });
        },
        setCaroMetadata: (metadata: Partial<CaroMetadataType>) => {
          set((state) => {
            state.metadata = { ...state.metadata, ...metadata };
          });
        },
      },
    };
  })
);
