import {
  CaroGameType,
  CaroSizeBoardType,
  CaroWinModeType,
  PlayModeType,
  TurnType,
  WinStateType,
} from 'src/global';
import { checkWin } from 'src/services/caro.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CaroMetadataType = {
  playMode: PlayModeType;
  gameType: CaroGameType;
  winMode: CaroWinModeType;
  isOverride: boolean;
  status: 'playing' | 'win';
  size: CaroSizeBoardType;
  maxNumberOfBlindError: number;
  preWinner: number;
};

type CaroStateType = {
  metadata: CaroMetadataType;
  numberOfBlindError: { 0: number; 1: number };
  isBlindForceOver: boolean;
  turn: TurnType;
  steps: { [key: number]: TurnType };
  stepsOrder: Array<number>;
  winState?: WinStateType;
  fn: {
    move: (location: number) => void;
    undo: () => void;
    reset: (turn?: TurnType) => void;
    countNumberOfBlindError: (turn: TurnType) => void;
    setCaroMetadata: (metadata: Partial<Omit<CaroMetadataType, 'status'>>) => void;
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
          winMode: 'blockOpponent',
          isOverride: false,
          status: 'playing',
          size: 10,
          maxNumberOfBlindError: 5,
          preWinner: 0,
        },
        numberOfBlindError: { 0: 0, 1: 0 },
        isBlindForceOver: false,
        turn: 0,
        steps: {},
        stepsOrder: [],
        fn: {
          move: (location) => {
            set((state) => {
              state.steps[location] = state.turn;
              state.stepsOrder.push(location);

              const { size, winMode } = state.metadata;
              const _winState = checkWin(
                { steps: state.steps, currentStep: location, currentPlayer: state.turn, size },
                winMode
              );
              if (_winState.winMode.length > 0) {
                state.winState = _winState;
                state.metadata.status = 'win';
              } else state.turn = (1 - state.turn) as TurnType;
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
          countNumberOfBlindError: (turn: TurnType) => {
            set((state) => {
              const currentErrors = state.numberOfBlindError[turn];
              state.numberOfBlindError[turn] = currentErrors + 1;
              if (state.numberOfBlindError[turn] > state.metadata.maxNumberOfBlindError) {
                state.isBlindForceOver = true;
                state.turn = (1 - state.turn) as TurnType;
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
        if (version < 1.0) return { ...(persistedState as CaroStateType) };
        return persistedState;
      },
      partialize: (state) => {
        const { fn, ...rest } = state;
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
