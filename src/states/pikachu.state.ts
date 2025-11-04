import { PIKACHU_NUMBER_OF_COLUMNS, PIKACHU_NUMBER_OF_ROWS } from 'src/configs/constance';
import { PositionType } from 'src/global';
import { createNewPikachuBoard } from 'src/services/pikachu.utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type PikachuMetadataType = {
  numberOfRows: number;
  numberOfColumns: number;
  round: number;
  status: 'init' | 'playing' | 'end';
};

type PikachuStateType = {
  metadata: PikachuMetadataType;
  board: Array<Array<number>>;
  moveBoard: Array<Array<number>>;
  fn: {
    createBoard: () => void;
    move: (sourcePiece: PositionType, targetPiece: PositionType) => void;
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
          round: 1,
          status: 'init',
        },
        board: [],
        moveBoard: [],
        fn: {
          createBoard: () => {
            set((state) => {
              const { board, moveBoard } = createNewPikachuBoard();
              state.board = board;
              state.moveBoard = moveBoard;
              state.metadata.status = 'playing';
            });
          },
          move: (sourcePiece: PositionType, targetPiece: PositionType) => {
            set((state) => {
              state.moveBoard[sourcePiece.row][sourcePiece.column] = 0;
              state.moveBoard[targetPiece.row][targetPiece.column] = 0;
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
