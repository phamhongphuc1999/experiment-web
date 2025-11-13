import { PikachuImgType, PikachuTimeType, PositionType } from 'src/global';
import { changePikachuBoard, createNewPikachuBoard } from 'src/services/pikachu/pikachu.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PikachuMetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  numberOfLines: number;
  remainingChanges: number;
  remainingTime: number;
  maxRemainingTime: number;
  round: number;
  status: 'init' | 'playing' | 'end' | 'paused';
  isSound: boolean;
  isChangeBoard: boolean;
  timeConfigType: PikachuTimeType;
  imgType: PikachuImgType;
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
          numberOfRows: 9,
          numberOfColumns: 16,
          numberOfLines: 2,
          remainingChanges: 20,
          remainingTime: 720,
          maxRemainingTime: 720,
          round: 1,
          status: 'init',
          isSound: true,
          isChangeBoard: false,
          timeConfigType: 'normal',
          imgType: 'internal',
        },
        board: [],
        suggestion: [],
        fn: {
          createBoard: (mode: 'newGame' | 'nextRound') => {
            set((state) => {
              const { numberOfRows, numberOfColumns, numberOfLines, imgType } = state.metadata;
              const { board, path } = createNewPikachuBoard(
                numberOfRows,
                numberOfColumns,
                numberOfLines,
                imgType == 'internal' ? 90 : 1025
              );
              state.board = board;
              state.suggestion = path;
              state.metadata.remainingTime = state.metadata.maxRemainingTime;
              if (mode == 'newGame' || state.metadata.round == 12) {
                state.metadata.status = 'playing';
                if (state.metadata.numberOfLines == 2) state.metadata.remainingChanges = 20;
                else state.metadata.remainingChanges = 10;
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
              const { numberOfRows, numberOfColumns, numberOfLines, imgType } = state.metadata;
              const { board, path } = changePikachuBoard(
                state.board,
                numberOfRows,
                numberOfColumns,
                numberOfLines,
                imgType == 'internal' ? 90 : 1025
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
      name: 'experiment.pikachu.v1.1',
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
