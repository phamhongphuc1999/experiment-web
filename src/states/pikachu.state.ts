import { PositionType } from 'src/global';
import { createNewPikachuBoard } from 'src/services/pikachu.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PikachuMetadataType = {
  remainingChanges: number;
  round: number;
  status: 'init' | 'playing' | 'end';
};

type PikachuStateType = {
  metadata: PikachuMetadataType;
  board: Array<Array<number>>;
  suggestions: Array<Array<PositionType>>;
  fn: {
    createBoard: () => void;
    changeBoard: () => void;
    move: (sourcePiece: PositionType, targetPiece: PositionType) => void;
    updateSuggestions: (suggestions: PositionType[][]) => void;
    setMetadata: (metadata: Partial<PikachuMetadataType>) => void;
  };
};

export const usePikachuStore = create<
  PikachuStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        metadata: {
          remainingChanges: 10,
          round: 1,
          status: 'init',
        },
        board: [],
        suggestions: [],
        fn: {
          createBoard: () => {
            set((state) => {
              const { board, path } = createNewPikachuBoard();
              state.board = board;
              state.suggestions.push(path);
              state.metadata.status = 'playing';
              state.metadata.remainingChanges = 10;
              state.metadata.round = 1;
            });
          },
          changeBoard: () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            set((state) => {});
          },
          move: (sourcePiece: PositionType, targetPiece: PositionType) => {
            set((state) => {
              state.board[sourcePiece[0]][sourcePiece[1]] = 0;
              state.board[targetPiece[0]][targetPiece[1]] = 0;
            });
          },
          updateSuggestions: (suggestions: Array<Array<PositionType>>) => {
            set((state) => {
              state.suggestions = suggestions;
            });
          },
          setMetadata: (metadata: Partial<PikachuMetadataType>) => {
            set((state) => {
              state.metadata = { ...state.metadata, ...metadata };
            });
          },
        },
      };
    }),
    {
      name: 'experiment.pikachu',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) return { ...(persistedState as PikachuStateType) };
        return persistedState;
      },
      partialize: (state) => {
        const { fn, ...rest } = state;
        return rest;
      },
    }
  )
);
