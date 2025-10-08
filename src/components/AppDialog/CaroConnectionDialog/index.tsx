import { Bluetooth } from 'iconsax-reactjs';
import { useState } from 'react';
import AppTooltip from 'src/components/AppTooltip';
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
  const { peer, connectionType } = useCaroConnectionContext();

  return playMode == 'online' ? (
    <Dialog
      open={dialog[DIALOG_KEY.caroConnectionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroConnectionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <AppTooltip tooltipContent="Connection" contentProps={{ side: 'bottom' }}>
          <Bluetooth size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro peer-to-peer connection</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
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
          {connectionType == 'connected' && (
            <Button
              variant="destructive"
              onClick={() => {
                if (peer) peer.destroy();
              }}
            >
              Disconnect
            </Button>
          )}
        </div>
        {connectionType == 'init' ? (
          <p className="text-sm">
            You are a <span className="text-chart-3">{role}</span>
          </p>
        ) : (
          <p className="text-sm">
            You{' '}
            {connectionType == 'connected' ? (
              <span className="text-sm text-emerald-400">connected</span>
            ) : (
              <span className="text-sm text-shadow-amber-400">are connecting</span>
            )}{' '}
            as a <span className="text-chart-3">{role}</span>
          </p>
        )}
        {role == 'host' ? <HostConnection /> : <GuestConnection />}
      </DialogContent>
    </Dialog>
  ) : null;
}
