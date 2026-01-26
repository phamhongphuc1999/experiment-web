import { DialogProps } from '@radix-ui/react-dialog';
import cloneDeep from 'lodash.clonedeep';
import deepMerge from 'lodash.merge';
import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/shadcn-ui/dialog';
import { ProcessDataObjectType, useProcessStore } from 'src/states/process.state';
import { ProcessType } from 'src/types/process-demo.type';
import { v4 as uuidv4 } from 'uuid';
import ProcessItem from './ProcessItem';

export default function ProcessSettingForm(props: DialogProps) {
  const {
    mode,
    fn: { setMode },
  } = useProcessStore();
  const [data, setData] = useState<ProcessDataObjectType>({});

  function onCreateProcess() {
    setData((state) => {
      const pid = uuidv4();
      const newProcess: ProcessType = { pid, executionTime: 10, remainingTime: 10, state: 'new' };
      return deepMerge(cloneDeep(state), newProcess);
    });
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Process Setting</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-2xl font-semibold">Mode</p>
          <div className="flex items-center gap-2">
            <Button
              variant={mode == 'fifo' ? 'outline' : 'secondary'}
              onClick={() => setMode('fifo')}
            >
              FIFO
            </Button>
            <Button
              variant={mode == 'str' ? 'outline' : 'secondary'}
              onClick={() => setMode('str')}
            >
              STR
            </Button>
            <Button
              variant={mode == 'round-robin' ? 'outline' : 'secondary'}
              onClick={() => setMode('round-robin')}
            >
              Round robin
            </Button>
          </div>
        </div>
        <form className="border-ring mt-2 border-t pt-2">
          {Object.values(data).map((item) => {
            return (
              <ProcessItem
                key={item.pid}
                data={item}
                events={{
                  onDataChange: (executionTime) => {
                    setData((state) => {
                      const newState = cloneDeep(state);
                      return deepMerge(newState, { [item.pid]: { executionTime } });
                    });
                  },
                }}
              />
            );
          })}
          <div className="mt-2 flex items-center justify-center">
            <Button onClick={onCreateProcess}>Create a process</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
