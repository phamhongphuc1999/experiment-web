import { DialogTriggerProps } from '@radix-ui/react-dialog';
import { CloudConnection, Setting } from 'iconsax-reactjs';
import { MouseEvent, useEffect, useState } from 'react';
import { DIALOG_KEY } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { PlayModeType, useCaroStore } from 'src/states/caro.state';
import { useDialogStore } from 'src/states/dialog.state';
import BaseInput from '../input/BaseInput';
import { Button } from '../shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';

interface Props {
  triggerProps?: DialogTriggerProps;
}

export default function CaroConfigDialog({ triggerProps }: Props) {
  const { dialog, setDialog } = useDialogStore();
  const {
    metadata: { numberOfColumns, numberOfRows, playMode },
    events: { reset, setCaroMetadata },
  } = useCaroStore();
  const [rows, setRows] = useState(numberOfRows);
  const [columns, setColumns] = useState(numberOfColumns);
  const [tempPlayMode, setTemPlayMode] = useState(playMode);

  useEffect(() => {
    setColumns(numberOfColumns);
  }, [numberOfColumns]);

  useEffect(() => {
    setRows(numberOfRows);
  }, [numberOfRows]);

  useEffect(() => {
    setTemPlayMode(playMode);
  }, [playMode]);

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaroMetadata({ numberOfRows: rows, numberOfColumns: columns, playMode: tempPlayMode });
    reset();
    setDialog(DIALOG_KEY.caroConfigDialog, false);
  }

  function onNewGame() {
    reset();
    setDialog(DIALOG_KEY.caroConfigDialog, false);
  }

  function onChangePlayMode(playMode: PlayModeType) {
    setTemPlayMode(playMode);
  }

  function onOpenChange(open: boolean) {
    setRows(numberOfRows);
    setColumns(numberOfColumns);
    setTemPlayMode(playMode);
    setDialog(DIALOG_KEY.caroConfigDialog, open);
  }

  function onCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={dialog[DIALOG_KEY.caroConfigDialog]} onOpenChange={onOpenChange}>
      <DialogTrigger {...triggerProps} className={cn('cursor-pointer', triggerProps?.className)}>
        <Setting size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro config</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSaveConfig}>
          <div className="mt-2 rounded-sm border p-2">
            <p>Play mode</p>
            <div>
              <Button
                className="mr-2"
                variant={tempPlayMode == 'offline' ? 'default' : 'outline'}
                onClick={() => onChangePlayMode('offline')}
              >
                Offline
              </Button>
              <Button
                variant={tempPlayMode == 'online' ? 'default' : 'outline'}
                onClick={() => onChangePlayMode('online')}
              >
                Online
              </Button>
            </div>
            {tempPlayMode == 'online' && (
              <div className="mt-1 text-xs">
                When online mode is on, the connection icon{' '}
                <CloudConnection className="inline" size={14} /> (right next to setting icon{' '}
                <Setting className="inline" size={14} />) is showed, you should follow its
                instruction to connect with your friends. Please press save button to confirm
                changes.
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <BaseInput
              type="number"
              placeholder="Number of rows"
              value={rows}
              onChange={(event) => setRows(parseInt(event.target.value))}
            />
            <BaseInput
              type="number"
              placeholder="Number of columns"
              value={columns}
              onChange={(event) => setColumns(parseInt(event.target.value))}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Button onClick={onNewGame}>New game</Button>
            <div>
              <Button onClick={onCancel} variant="destructive" className="mr-2">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
