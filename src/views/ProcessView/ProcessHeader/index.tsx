'use client';

import { RotateLeft, Trash } from 'iconsax-reactjs';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineEvent } from 'src/types/process.type';
import UpdateProcessDialog from '../dialogs/UpdateProcessDialog';
import SettingSpot from './SettingSpot';
import TimeSliceCounter from './TimeSliceCounter';

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
    <div className="bg-background/80 z-10 flex items-center justify-between gap-1 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <UpdateProcessDialog open={updateProcessOpen} onOpenChange={setUpdateProcessOpen} />
        {status === 'ready' && (
          <Button
            onClick={onRun}
            variant="secondary"
            size="sm"
            className="rounded-none bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
            contentprops={{ className: 'flex items-center gap-1' }}
          >
            <Play size={10} className="fill-current" />
            <span className="text-[11px] font-bold tracking-tight uppercase">Run System</span>
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          disabled={status === 'running'}
          onClick={onReset}
          className="rounded-none"
          contentprops={{ className: 'flex items-center gap-1' }}
        >
          <RotateLeft size={10} />
          <span className="text-[11px] font-medium tracking-tight uppercase">Reset</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={status === 'running'}
          className="text-destructive hover:bg-destructive/10 rounded-none"
          onClick={onClear}
          contentprops={{ className: 'flex items-center gap-1' }}
        >
          <Trash size={10} />
          <span className="text-[11px] font-medium tracking-tight uppercase">Clear</span>
        </Button>
      </div>
      <TimeSliceCounter counter={state.context.counter} />
      <SettingSpot />
    </div>
  );
}
