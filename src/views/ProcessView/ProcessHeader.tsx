'use client';

import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { useProcessStateMachine } from 'src/state-machine/process.state-machine';
import { ProcessMachineStateType } from 'src/types/process-demo.type';
import ProcessSettingForm from './ProcessSettingForm';

export default function ProcessHeader() {
  const [open, setOpen] = useState(false);
  const [state] = useProcessStateMachine();

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setOpen(true)}
        disabled={state.value != ProcessMachineStateType.INITIAL}
      >
        Create
      </Button>
      <ProcessSettingForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
