import merge from 'lodash.merge';
import { ProcessType, SchedulerModeType } from 'src/types/process-demo.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ProcessDataObjectType = {
  [id: string]: ProcessType;
};

export type ProcessStoreStatusType = 'initial' | 'ready' | 'running' | 'pause' | 'end';

interface ProcessStateType {
  mode: SchedulerModeType;
  processes: ProcessDataObjectType;
  status: ProcessStoreStatusType;
  fn: {
    setMode: (mode: SchedulerModeType) => void;
    setProcesses: (processes: ProcessDataObjectType) => void;
    updateProcess: (pid: string, data: Omit<ProcessType, 'pid' | 'state'>) => void;
    setStatus: (status: ProcessStoreStatusType) => void;
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
          updateProcess: (pid: string, data: Omit<ProcessType, 'pid' | 'state'>) => {
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
