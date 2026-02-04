import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { ListEmpty } from 'src/components/Empty';
import ChangeProcessItem from 'src/components/ProcessItem/ChangeProcessItem';
import { Button } from 'src/components/shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/shadcn-ui/dialog';
import { ProcessSchedulerConfigs } from 'src/configs/constance';
import { useProcessStore } from 'src/states/process.state';
import {
  ProcessDataObjectType,
  ProcessStatusType,
  ProcessTimeType,
  ProcessType,
} from 'src/types/process.type';
import { v4 as uuidv4 } from 'uuid';

export default function ProcessSettingForm(props: DialogProps) {
  const {
    mode,
    processes,
    fn: { setProcesses, setMetadata },
  } = useProcessStore();
  const [data, setData] = useState<ProcessDataObjectType>({});

  useEffect(() => {
    if (props.open) setData(processes);
  }, [props.open, processes]);

  function onCreateProcess() {
    setData((state) => {
      const pid = uuidv4();
      const newProcess: ProcessType = {
        pid,
        arrivalTime: 0,
        executionTime: 10,
        remainingTime: 10,
        currentBlockTaskIndex: 0,
        state: ProcessStatusType.NEW,
      };
      return { [pid]: newProcess, ...state };
    });
  }

  function onSave() {
    const cleanData: ProcessDataObjectType = {};
    Object.values(data).forEach((process) => {
      const cleanBlockTasks: Array<ProcessTimeType> = [];
      (process.blockTasks || []).forEach((task) => {
        const isIntersects = cleanBlockTasks.some((t) => {
          const start1 = task.arrivalTime;
          const end1 = task.arrivalTime + task.executionTime;
          const start2 = t.arrivalTime;
          const end2 = t.arrivalTime + t.executionTime;
          return start1 < end2 && start2 < end1;
        });
        if (!isIntersects) cleanBlockTasks.push(task);
      });

      let executionTime = process.executionTime;
      const maxBlockTaskEnd = cleanBlockTasks.reduce((max, task) => {
        return Math.max(max, task.arrivalTime + task.executionTime);
      }, 0);

      if (maxBlockTaskEnd > executionTime) {
        executionTime = maxBlockTaskEnd;
      }

      cleanData[process.pid] = {
        ...process,
        blockTasks: cleanBlockTasks.sort((item1, item2) => {
          return item1.arrivalTime - item2.arrivalTime;
        }),
        executionTime,
        remainingTime: executionTime,
      };
    });

    setProcesses(cleanData);
    if (Object.keys(cleanData).length > 0) setMetadata({ status: 'ready' });
    else setMetadata({ status: 'initial' });
    if (props.onOpenChange) props.onOpenChange(false);
  }

  return (
    <Dialog {...props}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Process Setting</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="px-4">
            <p className="text-lg font-semibold">Scheduler Mode</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {Object.values(ProcessSchedulerConfigs).map((item) => {
                return (
                  <Button
                    key={item.id}
                    variant={mode == item.id ? 'default' : 'outline'}
                    onClick={() => setMetadata({ mode: item.id })}
                  >
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="border-t px-4 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Processes</p>
              <Button variant="outline" size="sm" onClick={onCreateProcess} type="button">
                + Add Process
              </Button>
            </div>
            <div className="mt-4 max-h-100 overflow-y-auto pr-2">
              {Object.values(data).length === 0 ? (
                <ListEmpty title="No processes created yet." />
              ) : (
                Object.values(data).map((item) => {
                  return (
                    <ChangeProcessItem
                      key={item.pid}
                      data={item}
                      events={{
                        onAddBlockTask: () => {
                          setData((state) => {
                            const currentTasks = state[item.pid].blockTasks || [];
                            return {
                              ...state,
                              [item.pid]: {
                                ...state[item.pid],
                                blockTasks: [
                                  {
                                    arrivalTime: 0,
                                    executionTime: 1,
                                    remainingTime: 1,
                                  },
                                  ...currentTasks,
                                ],
                              },
                            };
                          });
                        },
                        onBlockTaskArrivalTimeChange: (index, arrivalTime) => {
                          setData((state) => {
                            const currentProcess = state[item.pid];
                            const currentTasks = [...(currentProcess.blockTasks || [])];
                            if (!currentTasks[index]) return state;

                            currentTasks[index] = { ...currentTasks[index], arrivalTime };
                            return {
                              ...state,
                              [item.pid]: {
                                ...currentProcess,
                                blockTasks: currentTasks,
                              },
                            };
                          });
                        },
                        onBlockTaskExecutionTimeChange: (index, executionTime) => {
                          setData((state) => {
                            const currentProcess = state[item.pid];
                            const currentTasks = [...(currentProcess.blockTasks || [])];
                            if (!currentTasks[index]) return state;

                            currentTasks[index] = {
                              ...currentTasks[index],
                              executionTime,
                              remainingTime: executionTime,
                            };
                            return {
                              ...state,
                              [item.pid]: {
                                ...currentProcess,
                                blockTasks: currentTasks,
                              },
                            };
                          });
                        },
                        onBlockTaskDelete: (index) => {
                          setData((state) => {
                            const currentProcess = state[item.pid];
                            const currentTasks = (currentProcess.blockTasks || []).filter(
                              (_, i) => i !== index
                            );
                            return {
                              ...state,
                              [item.pid]: {
                                ...currentProcess,
                                blockTasks: currentTasks,
                              },
                            };
                          });
                        },
                        onExecutionTimeChange: (executionTime) => {
                          setData((state) => ({
                            ...state,
                            [item.pid]: {
                              ...state[item.pid],
                              executionTime,
                              remainingTime: executionTime,
                            },
                          }));
                        },
                        onArrivalTimeChange: (arrivalTime) => {
                          setData((state) => ({
                            ...state,
                            [item.pid]: {
                              ...state[item.pid],
                              arrivalTime,
                            },
                          }));
                        },
                        onDelete: () => {
                          setData((state) => {
                            const { [item.pid]: _, ...newState } = state;
                            return newState;
                          });
                        },
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 border-t p-4">
            <Button variant="outline" onClick={() => props.onOpenChange?.(false)} type="button">
              Cancel
            </Button>
            <Button onClick={onSave} type="button">
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
