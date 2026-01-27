import merge from 'lodash.merge';
import { ProcessType, SchedulerModeType } from 'src/types/process-demo.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ProcessDataObjectType = {
  [id: string]: ProcessType;
};

export type ProcessStoreStatusType = 'initial' | 'ready' | 'running' | 'pause' | 'ended';

interface ProcessStateType {
  mode: SchedulerModeType;
  processes: ProcessDataObjectType;
  status: ProcessStoreStatusType;
  fn: {
    setMode: (mode: SchedulerModeType) => void;
    setProcesses: (processes: ProcessDataObjectType) => void;
    updateProcess: (pid: string, data: Partial<Omit<ProcessType, 'pid'>>) => void;
    setStatus: (status: ProcessStoreStatusType) => void;
    clear: () => void;
  };
}

export const useProcessStore = create<
  ProcessStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        mode: SchedulerModeType.FIFO,
        processes: {},
        status: 'initial',
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
          updateProcess: (pid: string, data: Partial<Omit<ProcessType, 'pid'>>) => {
            set((state) => {
              if (state.processes[pid]) {
                merge(state.processes[pid], data);
              }
            });
          },
          setStatus: (status: ProcessStoreStatusType) => {
            set((state) => {
              state.status = status;
            });
          },
          clear: () => {
            set((state) => {
              state.mode = SchedulerModeType.FIFO;
              state.processes = {};
              state.status = 'initial';
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
        const { fn, ...restState } = state;
        return restState;
      },
    }
  )
);
