'use client';

import { Play, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from 'src/components/shadcn-ui/badge';
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
    <div className="bg-background/80 sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <UpdateProcessDialog open={updateProcessOpen} onOpenChange={setUpdateProcessOpen} />

        <div className="bg-muted/50 flex items-center gap-1 rounded-lg border p-1 shadow-inner">
          {status === 'ready' && (
            <Button
              onClick={onRun}
              variant="secondary"
              size="sm"
              className="h-7 rounded-md bg-green-500/10 text-green-600 hover:bg-green-500/20 hover:text-green-700 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
            >
              <Play className="mr-1.5 h-3 w-3 fill-current" />
              <span className="text-[11px] font-bold tracking-tight uppercase">Run System</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            disabled={status === 'running'}
            className="h-7 rounded-md px-2"
            onClick={onReset}
          >
            <RotateCcw className="mr-1.5 h-3 w-3" />
            <span className="text-[11px] font-medium tracking-tight uppercase">Reset</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={status === 'running'}
            className="text-destructive hover:bg-destructive/10 h-7 rounded-md px-2"
            onClick={onClear}
          >
            <Trash2 className="mr-1.5 h-3 w-3" />
            <span className="text-[11px] font-medium tracking-tight uppercase">Clear</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-muted-foreground mb-0.5 text-[9px] font-black tracking-[0.3em] uppercase opacity-60">
            System Clock Pulse
          </span>
          <div className="bg-primary/5 border-primary/10 flex items-baseline gap-1.5 rounded-full border px-4 py-0.5 shadow-xs transition-all hover:scale-105">
            <span className="font-mono text-xl font-black tracking-tighter text-blue-600 tabular-nums dark:text-blue-400">
              {state.context.counter.toString().padStart(4, '0')}
            </span>
            <span className="text-muted-foreground font-mono text-[9px] font-black tracking-widest uppercase opacity-70">
              ms
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <Badge
            variant="outline"
            className="h-5 rounded-full border-blue-500/20 bg-blue-500/5 px-2 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400"
          >
            STORE: {status}
          </Badge>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 ring-primary/20 h-5 rounded-full px-2 text-[9px] font-black tracking-widest uppercase shadow-none ring-1">
            FSM: {state.value.toString()}
          </Badge>
        </div>
        <div className="bg-border h-6 w-px" />
        <SettingDialog />
      </div>
    </div>
  );
}
