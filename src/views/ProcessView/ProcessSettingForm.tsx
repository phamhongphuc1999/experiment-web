import { DialogProps } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/shadcn-ui/dialog';
import { ProcessSchedulerConfigs } from 'src/configs/constance';
import { ProcessDataObjectType, useProcessStore } from 'src/states/process.state';
import { ProcessStatusType, ProcessType } from 'src/types/process-demo.type';
import { v4 as uuidv4 } from 'uuid';
import ProcessItem from './ProcessItem';

export default function ProcessSettingForm(props: DialogProps) {
  const {
    mode,
    processes,
    fn: { setMode, setProcesses, setStatus },
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
        state: ProcessStatusType.NEW,
      };
      return { ...state, [pid]: newProcess };
    });
  }

  function onSave() {
    setProcesses(data);
    if (Object.keys(data).length > 0) setStatus('ready');
    else setStatus('initial');
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
                    onClick={() => setMode(item.id)}
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
                <div className="text-muted-foreground flex h-20 items-center justify-center rounded-lg border border-dashed">
                  No processes created yet.
                </div>
              ) : (
                Object.values(data).map((item) => {
                  return (
                    <ProcessItem
                      key={item.pid}
                      data={item}
                      events={{
                        onExecutionTimeChange: (executionTime) => {
                          setData((state) => {
                            const newState = { ...state };
                            newState[item.pid] = {
                              ...newState[item.pid],
                              executionTime,
                              remainingTime: executionTime,
                            };
                            return newState;
                          });
                        },
                        onArrivalTimeChange: (arrivalTime) => {
                          setData((state) => {
                            const newState = { ...state };
                            newState[item.pid] = {
                              ...newState[item.pid],
                              arrivalTime,
                            };
                            return newState;
                          });
                        },
                        onDelete: (pid) => {
                          setData((state) => {
                            const newState = { ...state };
                            delete newState[pid];
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
