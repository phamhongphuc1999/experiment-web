import { toast } from 'sonner';
import { Connect4WinStateType, PlayModeType, TurnType } from 'src/global';
import { checkWin } from 'src/services/connect4.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Connect4MetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  playMode: PlayModeType;
  status: 'playing' | 'win';
};

type Connect4Type = {
  metadata: Connect4MetadataType;
  turn: TurnType;
  steps: { [column: number]: Array<TurnType> };
  stepsOrder: Array<number>;
  winState?: Connect4WinStateType;
  fn: {
    move: (column: number) => void;
    undo: () => void;
    reset: (turn?: TurnType) => void;
    setCaroMetadata: (metadata: Partial<Connect4MetadataType>) => void;
  };
};

export const useConnect4Store = create<
  Connect4Type,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        metadata: {
          numberOfRows: 6,
          numberOfColumns: 7,
          playMode: 'offline',
          status: 'playing',
        },
        turn: 0,
        steps: {},
        stepsOrder: [],
        fn: {
          move: (column: number) => {
            set((state) => {
              if (!state.steps[column]) state.steps[column] = [];
              if (state.steps[column].length >= state.metadata.numberOfRows)
                toast.warning('Invalid move');
              else {
                state.steps[column].push(state.turn);
                const _winState = checkWin({
                  steps: state.steps,
                  currentColumn: column,
                  currentPlayer: state.turn,
                  numberOfRows: state.metadata.numberOfRows,
                  numberOfColumns: state.metadata.numberOfColumns,
                });
                if (_winState.winMode.length > 0) {
                  state.winState = _winState;
                  state.metadata.status = 'win';
                } else state.turn = (1 - state.turn) as TurnType;
              }
            });
          },
          undo: () => {
            set((state) => {
              const len = state.stepsOrder.length;
              if (len > 1) {
                let currentStep = state.stepsOrder[len - 1];
                delete state.steps[currentStep];
                state.stepsOrder.pop();

                currentStep = state.stepsOrder[len - 2];
                delete state.steps[currentStep];
                state.stepsOrder.pop();
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
          setCaroMetadata: (metadata: Partial<Connect4MetadataType>) => {
            set((state) => {
              state.metadata = { ...state.metadata, ...metadata };
            });
          },
        },
      };
    }),
    {
      name: 'experiment.connect4',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) return { ...(persistedState as Connect4Type) };
        return persistedState;
      },
      partialize: (state) => {
        const { fn, ...rest } = state;
        return rest;
      },
    }
  )
);
