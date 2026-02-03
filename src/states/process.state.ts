import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import {
  ProcessDataObjectType,
  ProcessStatusType,
  ProcessStoreStatusType,
  ProcessType,
  SchedulerModeType,
} from 'src/types/process.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ProcessMetadataType {
  mode: SchedulerModeType;
  status: ProcessStoreStatusType;
  interval: number;
}

interface ProcessStateType extends ProcessMetadataType {
  processes: ProcessDataObjectType;
  fn: {
    setMetadata: (metadata?: Partial<ProcessMetadataType>) => void;
    setProcesses: (processes: ProcessDataObjectType) => void;
    updateProcess: (pid: string, data: Partial<Omit<ProcessType, 'pid'>>) => void;
    resetProcesses: () => void;
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
        interval: 1000,
        fn: {
          setMetadata: (metadata?: Partial<ProcessMetadataType>) => {
            set((state) => {
              if (metadata?.mode) state.mode = metadata.mode;
              if (metadata?.status) state.status = metadata.status;
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
          resetProcesses: () => {
            set((state) => {
              const newProcesses = cloneDeep(state.processes);
              for (const item of Object.values(newProcesses)) {
                newProcesses[item.pid].remainingTime = item.executionTime;
                newProcesses[item.pid].state = ProcessStatusType.NEW;
              }
              state.processes = newProcesses;
              state.status = 'ready';
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
