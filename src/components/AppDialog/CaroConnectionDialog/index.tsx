import { CloudConnection } from 'iconsax-reactjs';
import { useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { DIALOG_KEY } from 'src/configs/constance';
import { useCaroStore } from 'src/states/caro.state';
import { useDialogStore } from 'src/states/dialog.state';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../shadcn-ui/dialog';
import CreateConnection from './CreateConnection';
import ReceiveOffer from './ReceiveOffer';

export default function CaroConnectionDialog() {
  const [mode, setMode] = useState<'host' | 'guard'>('host');
  const { dialog, setDialog } = useDialogStore();
  const {
    metadata: { playMode },
  } = useCaroStore();

  return playMode == 'online' ? (
    <Dialog
      open={dialog[DIALOG_KEY.caroConnectionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroConnectionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <CloudConnection size={14} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro peer-to-peer connection</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setMode('host')}
            variant={mode == 'host' ? 'default' : 'secondary'}
          >
            Create connection
          </Button>
          <Button
            onClick={() => setMode('guard')}
            variant={mode == 'guard' ? 'default' : 'secondary'}
          >
            Receive to friend connection
          </Button>
        </div>
        <div className="rounded-sm border p-2">
          {mode == 'host' ? <CreateConnection /> : <ReceiveOffer />}
        </div>
      </DialogContent>
    </Dialog>
  ) : null;
}
