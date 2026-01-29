'use client';

import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { ProcessSchedulerConfigs } from 'src/configs/constance';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { ProcessMachineEvent } from 'src/state-machine/process.utils';
import { useProcessStore } from 'src/states/process.state';
import ProcessSettingForm from './ProcessSettingForm';

export default function ProcessHeader() {
  const [open, setOpen] = useState(false);
  const { processes, status, mode } = useProcessStore();
  const [state, send] = useProcessStateMachine();

  function onRun() {
    send({ type: ProcessMachineEvent.LOAD_PROCESS, processes });
  }

  function onReset() {
    send({ type: ProcessMachineEvent.RESET });
  }

  function onClear() {
    send({ type: ProcessMachineEvent.CLEAR });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button onClick={() => setOpen(true)} disabled={status != 'initial' && status != 'ready'}>
          {status == 'ready' ? 'Update' : 'Create'}
        </Button>
        {status == 'ready' && (
          <Button onClick={onRun} variant="outline">
            Run
          </Button>
        )}
        <Button variant="outline" disabled={status == 'running'} onClick={onReset}>
          Reset
        </Button>
        {status == 'ended' && <Button onClick={onClear}>Clear</Button>}
      </div>
      <div>
        <p>Runtime: {state.context.counter}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-semibold">
          {ProcessSchedulerConfigs[mode].name}
        </span>
        <div className="bg-primary h-3 w-px" />
        <span className="text-muted-foreground text-sm uppercase">{status}</span>
        <div className="bg-primary h-3 w-px" />
        <span className="text-muted-foreground text-sm uppercase">{state.value.toString()}</span>
      </div>
      <ProcessSettingForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
