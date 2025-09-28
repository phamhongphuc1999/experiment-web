import { WinStateType } from 'src/global';
import { checkWin } from 'src/services/caro.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type PlayModeType = 'offline' | 'online' | 'machine';
export type CaroGameType = 'normal' | 'blind';

type CaroMetadataType = {
  playMode: PlayModeType;
  gameType: CaroGameType;
  isOverride: boolean;
  status: 'playing' | 'win';
  numberOfRows: number;
  numberOfColumns: number;
  maxNumberOfBlindError: number;
  preWinner: number;
};

type CaroStateType = {
  metadata: CaroMetadataType;
  numberOfBlindError: { 0: number; 1: number };
  isBlindForceOver: boolean;
  turn: 0 | 1;
  steps: { [key: number]: 0 | 1 };
  stepsOrder: Array<number>;
  winState?: WinStateType;
  events: {
    setCaroMetadata: (metadata: Partial<Omit<CaroMetadataType, 'status'>>) => void;
    move: (location: number) => void;
    undo: () => void;
    reset: (turn?: 0 | 1) => void;
    countNumberOfBlindError: (turn: 0 | 1) => void;
  };
};

export const useCaroStore = create<
  CaroStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        metadata: {
          playMode: 'offline',
          gameType: 'normal',
          isOverride: false,
          status: 'playing',
          numberOfRows: 10,
          numberOfColumns: 10,
          maxNumberOfBlindError: 5,
          preWinner: 0,
        },
        numberOfBlindError: { 0: 0, 1: 0 },
        isBlindForceOver: false,
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
              state.numberOfBlindError = { 0: 0, 1: 0 };
              if (turn != undefined) state.turn = turn;
              state.metadata.preWinner = state.turn;
              state.steps = {};
              state.stepsOrder = [];
              state.winState = undefined;
              state.isBlindForceOver = false;
            });
          },
          countNumberOfBlindError: (turn: 0 | 1) => {
            set((state) => {
              const currentErrors = state.numberOfBlindError[turn];
              state.numberOfBlindError[turn] = currentErrors + 1;
              if (state.numberOfBlindError[turn] > state.metadata.maxNumberOfBlindError) {
                state.isBlindForceOver = true;
                state.turn = (1 - state.turn) as 1 | 0;
              }
            });
          },
          setCaroMetadata: (metadata: Partial<CaroMetadataType>) => {
            set((state) => {
              state.metadata = { ...state.metadata, ...metadata };
            });
          },
        },
      };
    }),
    {
      name: 'experiment.caro',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return {
            ...(persistedState as CaroStateType),
          };
        }
        return persistedState;
      },
      partialize: (state) => {
        const { events, ...rest } = state;
        if (rest.metadata.playMode == 'online') {
          const metadata: CaroMetadataType = {
            ...rest.metadata,
            playMode: 'offline',
            preWinner: 0,
            status: 'playing',
          };
          return {
            ...rest,
            metadata,
            isBlindForceOver: false,
            turn: 0,
            steps: {},
            stepsOrder: [],
            winState: undefined,
          };
        } else return rest;
      },
    }
  )
);
