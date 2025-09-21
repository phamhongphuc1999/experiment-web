import { CloudConnection } from 'iconsax-reactjs';
import { useState } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { DIALOG_KEY } from 'src/configs/constance';
import { RoleType, useCaroConnectionContext } from 'src/context/caroConnection.context';
import { useCaroStore } from 'src/states/caro.state';
import { useDialogStore } from 'src/states/dialog.state';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../shadcn-ui/dialog';
import GuestConnection from './GuestConnection';
import HostConnection from './HostConnection';

export default function CaroConnectionDialog() {
  const { dialog, setDialog } = useDialogStore();
  const {
    metadata: { playMode },
  } = useCaroStore();
  const [role, setRole] = useState<RoleType>('host');
  const { peer } = useCaroConnectionContext();

  return playMode == 'online' ? (
    <Dialog
      open={dialog[DIALOG_KEY.caroConnectionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroConnectionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <CloudConnection size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro peer-to-peer connection</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setRole('host')}
            variant={role == 'host' ? 'default' : 'secondary'}
            disabled={Boolean(peer)}
          >
            Host
          </Button>
          <Button
            onClick={() => setRole('guest')}
            variant={role == 'guest' ? 'default' : 'secondary'}
            disabled={Boolean(peer)}
          >
            Guest
          </Button>
        </div>
        <p className="text-sm">{`You are connecting as a ${role}`}</p>
        <TitleBox
          title="Connection status"
          value={
            peer?.connected ? (
              <p className="text-sm text-emerald-400">Connected</p>
            ) : (
              <p className="text-sm text-shadow-amber-400">Connecting</p>
            )
          }
        />
        {role == 'host' ? <HostConnection /> : <GuestConnection />}
      </DialogContent>
    </Dialog>
  ) : null;
}
