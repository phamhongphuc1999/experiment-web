import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CaroConfigStateType = {
  numberOfRows: number;
  numberOfColumns: number;
  setCaroSize: (rows: number, columns: number) => void;
};

export const defaultCaroConfig: Omit<CaroConfigStateType, 'setCaroSize'> = {
  numberOfRows: 10,
  numberOfColumns: 10,
};

export const useCaroConfigStore = create<
  CaroConfigStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        numberOfRows: defaultCaroConfig.numberOfRows,
        numberOfColumns: defaultCaroConfig.numberOfColumns,
        setCaroSize: (rows, columns) => {
          set((state) => {
            state.numberOfRows = rows;
            state.numberOfColumns = columns;
          });
        },
      };
    }),
    {
      name: 'experiment.caroConfig',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return {
            ...(persistedState as CaroConfigStateType),
          };
        }
        return persistedState;
      },
    }
  )
);
