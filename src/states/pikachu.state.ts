import { PIKACHU_NUMBER_OF_COLUMNS, PIKACHU_NUMBER_OF_ROWS } from 'src/configs/constance';
import { PositionType } from 'src/global';
import { changePikachuBoard, createNewPikachuBoard } from 'src/services/pikachu.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PikachuMetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  remainingChanges: number;
  round: number;
  status: 'init' | 'playing' | 'end';
};

type PikachuStateType = {
  metadata: PikachuMetadataType;
  board: Array<Array<number>>;
  suggestion: Array<PositionType>;
  fn: {
    createBoard: () => void;
    changeBoard: () => void;
    move: (sourcePiece: PositionType, targetPiece: PositionType) => void;
    updateSuggestion: (path: Array<PositionType>) => void;
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
          numberOfRows: PIKACHU_NUMBER_OF_ROWS,
          numberOfColumns: PIKACHU_NUMBER_OF_COLUMNS,
          remainingChanges: 10,
          round: 1,
          status: 'init',
        },
        board: [],
        suggestion: [],
        fn: {
          createBoard: () => {
            set((state) => {
              const { numberOfRows, numberOfColumns } = state.metadata;
              const { board, path } = createNewPikachuBoard(numberOfRows, numberOfColumns);
              state.board = board;
              state.suggestion = path;
              state.metadata.status = 'playing';
              state.metadata.remainingChanges = 10;
              state.metadata.round = 1;
            });
          },
          changeBoard: () => {
            set((state) => {
              const { numberOfRows, numberOfColumns } = state.metadata;
              const { board, path } = changePikachuBoard(
                state.board,
                numberOfRows,
                numberOfColumns
              );
              state.board = board;
              state.suggestion = path;
              state.metadata.remainingChanges = state.metadata.remainingChanges - 1;
            });
          },
          move: (sourcePiece: PositionType, targetPiece: PositionType) => {
            set((state) => {
              state.board[sourcePiece[0]][sourcePiece[1]] = 0;
              state.board[targetPiece[0]][targetPiece[1]] = 0;
            });
          },
          updateSuggestion: (path: Array<PositionType>) => {
            set((state) => {
              state.suggestion = path;
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
