'use client';

import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { useProcessStore } from 'src/states/process.state';
import ProcessSettingForm from './ProcessSettingForm';

export default function ProcessHeader() {
  const [open, setOpen] = useState(false);
  const { status } = useProcessStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm uppercase">{status}</span>
      <Button onClick={() => setOpen(true)} disabled={status != 'initial' && status != 'ready'}>
        {status == 'ready' ? 'Update' : 'Create'}
      </Button>
      <ProcessSettingForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
