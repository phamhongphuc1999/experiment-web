'use client';

import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineEvent } from 'src/types/process.type';
import SettingDialog from './dialogs/SettingDialog';
import UpdateProcessDialog from './dialogs/UpdateProcessDialog';

export default function ProcessHeader() {
  const [updateProcessOpen, setUpdateProcessOpen] = useState(false);
  const { processes, status } = useProcessStore();
  const [state, send] = useProcessStateMachine();

  function onRun() {
    send({ type: ProcessMachineEvent.INITIALIZE_PROCESS, processes });
  }

  function onReset() {
    send({ type: ProcessMachineEvent.RESET });
  }

  function onClear() {
    send({ type: ProcessMachineEvent.CLEAR });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <UpdateProcessDialog open={updateProcessOpen} onOpenChange={setUpdateProcessOpen} />
        {status == 'ready' && (
          <Button onClick={onRun} variant="outline" className="rounded-none">
            Run
          </Button>
        )}
        <Button
          variant="outline"
          disabled={status == 'running'}
          className="rounded-none"
          onClick={onReset}
        >
          Reset
        </Button>
        {status == 'ended' && (
          <Button className="rounded-none" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>
      <div>
        <p>Runtime: {state.context.counter}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm uppercase">{status}</span>
        <div className="bg-primary h-3 w-px" />
        <span className="text-muted-foreground text-sm uppercase">{state.value.toString()}</span>
        <SettingDialog />
      </div>
    </div>
  );
}
