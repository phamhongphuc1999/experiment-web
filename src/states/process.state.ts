import { ProcessType, SchedulerModeType } from 'src/types/process-demo.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ProcessDataObjectType = {
  [id: string]: ProcessType;
};

interface ProcessStateType {
  mode: SchedulerModeType;
  processes: ProcessDataObjectType;
  fn: {
    setMode: (mode: SchedulerModeType) => void;
    setProcesses: (processes: ProcessDataObjectType) => void;
  };
}

export const useProcessStore = create<
  ProcessStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        mode: 'fifo',
        processes: {},
        fn: {
          setMode: (mode: SchedulerModeType) => {
            set((state) => {
              state.mode = mode;
            });
          },
          setProcesses: (processes: ProcessDataObjectType) => {
            set((state) => {
              state.processes = processes;
            });
          },
        },
      };
    }),
    {
      name: 'experiment.process',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return { ...(persistedState as ProcessStateType) };
        }
        return persistedState;
      },
      partialize: (state) => {
        return {
          mode: state.mode,
        };
      },
    }
  )
);
