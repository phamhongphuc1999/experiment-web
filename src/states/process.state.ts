import {
  ProcessDataObjectType,
  ProcessHistoryType,
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
  maxBlockTaskPerSlice: number;
}

interface ProcessStateType extends ProcessMetadataType {
  processes: ProcessDataObjectType;
  history: Array<ProcessHistoryType>;
  fn: {
    setMetadata: (metadata?: Partial<ProcessMetadataType>) => void;
    updateHistory: (history: ProcessHistoryType) => void;
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
        history: [],
        status: 'initial',
        interval: 1000,
        maxBlockTaskPerSlice: 5,
        fn: {
          setMetadata: (metadata?: Partial<ProcessMetadataType>) => {
            set((state) => {
              if (metadata?.mode) state.mode = metadata.mode;
              if (metadata?.status) state.status = metadata.status;
              if (metadata?.interval) state.interval = metadata.interval;
              if (metadata?.maxBlockTaskPerSlice)
                state.maxBlockTaskPerSlice = metadata.maxBlockTaskPerSlice;
            });
          },
          updateHistory: (history: ProcessHistoryType) => {
            set((state) => {
              state.history = [...state.history, history];
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
                if (data.beginAt == -1) data.beginAt = state.processes[pid].beginAt;
                Object.assign(state.processes[pid], data);
              }
            });
          },
          resetProcesses: () => {
            set((state) => {
              const newProcesses = structuredClone(state.processes);
              for (const item of Object.values(newProcesses)) {
                newProcesses[item.pid].runtime = 0;
                newProcesses[item.pid].state = ProcessStatusType.NEW;
                newProcesses[item.pid].currentBlockTaskIndex = 0;
                newProcesses[item.pid].readyPriority = -1;
                newProcesses[item.pid].waitingPriority = -1;
                newProcesses[item.pid].beginAt = -1;
                newProcesses[item.pid].endAt = -1;
                if (newProcesses[item.pid].blockTasks) {
                  newProcesses[item.pid].blockTasks = newProcesses[item.pid].blockTasks?.map(
                    (task) => ({ ...task, runtime: 0 })
                  );
                }
              }
              state.processes = newProcesses;
              state.status = 'ready';
              state.history = [];
            });
          },
          clear: () => {
            set((state) => {
              state.processes = {};
              state.status = 'initial';
              state.history = [];
            });
          },
        },
      };
    }),
    {
      name: 'experiment.process.v2',
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
