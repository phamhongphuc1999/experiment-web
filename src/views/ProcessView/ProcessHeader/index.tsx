'use client';

import { Play } from 'lucide-react';
import { useMemo, useState } from 'react';
import UpdateProcessDialog from 'src/components/process-ui/dialogs/UpdateProcessDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { sleep } from 'src/services';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { useProcessStore } from 'src/states/process.state';
import { ProcessMachineEvent } from 'src/types/process.type';
import SettingSpot from './SettingSpot';
import TimeSliceCounter from './TimeSliceCounter';

export default function ProcessHeader() {
  const [updateProcessOpen, setUpdateProcessOpen] = useState(false);
  const { processes, status } = useProcessStore();
  const { send } = useProcessStateMachine();

  const text = useMemo(() => {
    if (status == 'ready' || status == 'initial') return 'Run';
    else if (status == 'ended') return 'Rerun';
    else return 'Pause';
  }, [status]);

  async function onRun() {
    if (status == 'initial' || status == 'ready')
      send({ type: ProcessMachineEvent.INITIALIZE_PROCESS, processes });
    else if (status == 'ended') {
      send({ type: ProcessMachineEvent.RESET });
      await sleep(1400);
      send({
        type: ProcessMachineEvent.INITIALIZE_PROCESS,
        processes: useProcessStore.getState().processes,
      });
    }
  }

  return (
    <div className="bg-background/80 relative z-10 flex items-center justify-between gap-1 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <UpdateProcessDialog open={updateProcessOpen} onOpenChange={setUpdateProcessOpen} />
        <Button
          onClick={onRun}
          variant={status == 'ended' ? 'outline' : 'secondary'}
          size="sm"
          className="rounded-none bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
          contentprops={{ className: 'flex items-center gap-1' }}
        >
          {status == 'initial' || status == 'ready' ? <Play size={5} /> : <></>}
          <span className="text-[11px] font-bold tracking-tight uppercase">{text}</span>
        </Button>
      </div>
      <SettingSpot />
      <TimeSliceCounter className="absolute top-1/2 left-1/2 -translate-1/2" />
    </div>
  );
}
