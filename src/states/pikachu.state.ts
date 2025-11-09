import { PIKACHU_NUMBER_OF_COLUMNS, PIKACHU_NUMBER_OF_ROWS } from 'src/configs/constance';
import { PositionType } from 'src/global';
import { changePikachuBoard, createNewPikachuBoard } from 'src/services/pikachu/pikachu.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PikachuMetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  remainingChanges: number;
  round: number;
  status: 'init' | 'playing' | 'end';
  isSound: boolean;
  isChangeBoard: boolean;
};

type PikachuStateType = {
  metadata: PikachuMetadataType;
  board: Array<Array<number>>;
  suggestion: Array<PositionType>;
  fn: {
    createBoard: (mode: 'newGame' | 'nextRound') => void;
    changeBoard: () => void;
    move: (board: Array<Array<number>>) => void;
    movePath: (board: Array<Array<number>>, path: Array<PositionType>) => void;
    moveChangeBoard: (board: Array<Array<number>>) => void;
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
          isSound: true,
          isChangeBoard: false,
        },
        board: [],
        suggestion: [],
        fn: {
          createBoard: (mode: 'newGame' | 'nextRound') => {
            set((state) => {
              const { numberOfRows, numberOfColumns } = state.metadata;
              const { board, path } = createNewPikachuBoard(numberOfRows, numberOfColumns);
              state.board = board;
              state.suggestion = path;
              if (mode == 'newGame' || state.metadata.round == 8) {
                state.metadata.status = 'playing';
                state.metadata.remainingChanges = 10;
                state.metadata.round = 1;
                state.metadata.isChangeBoard = false;
              } else {
                const remainingChanges = state.metadata.remainingChanges;
                const round = state.metadata.round;
                state.metadata.remainingChanges = remainingChanges + 1;
                state.metadata.round = round + 1;
              }
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
          move: (board: Array<Array<number>>) => {
            set((state) => {
              state.board = board;
            });
          },
          movePath: (board: Array<Array<number>>, path: Array<PositionType>) => {
            set((state) => {
              state.board = board;
              state.suggestion = path;
            });
          },
          moveChangeBoard: (board: Array<Array<number>>) => {
            set((state) => {
              state.board = board;
              state.metadata.isChangeBoard = true;
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
