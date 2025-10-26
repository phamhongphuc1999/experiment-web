import { PlayModeType } from 'src/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Connect4MetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  playMode: PlayModeType;
};

type Connect4Type = {
  metadata: Connect4MetadataType;
  turn: 0 | 1;
  steps: { [key: number]: 0 | 1 };
  stepsOrder: Array<number>;
  events: {
    move: (location: number) => void;
    reset: (turn?: 0 | 1) => void;
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
        },
        turn: 0,
        steps: {},
        stepsOrder: [],
        events: {
          move: (location) => {
            set((state) => {
              state.steps[location] = state.turn;
              state.stepsOrder.push(location);
            });
          },
          reset: (turn) => {
            set((state) => {
              if (turn != undefined) state.turn = turn;
              state.steps = {};
              state.stepsOrder = [];
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
    }
  )
);
