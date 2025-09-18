import { DialogTriggerProps } from '@radix-ui/react-dialog';
import { Setting } from 'iconsax-reactjs';
import { MouseEvent, useEffect, useState } from 'react';
import { DIALOG_KEY } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { useCaroBoardStore } from 'src/states/caroBoard.state';
import { useCaroConfigStore } from 'src/states/caroConfig.state';
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
  const { numberOfColumns, numberOfRows, setCaroSize } = useCaroConfigStore();
  const {
    events: { reset },
  } = useCaroBoardStore();
  const [rows, setRows] = useState(numberOfRows);
  const [columns, setColumns] = useState(numberOfColumns);

  useEffect(() => {
    setColumns(numberOfColumns);
  }, [numberOfColumns]);

  useEffect(() => {
    setRows(numberOfRows);
  }, [numberOfRows]);

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaroSize(rows, columns);
    reset();
    setDialog(DIALOG_KEY.caroConfigDialog, false);
  }

  return (
    <Dialog
      open={dialog[DIALOG_KEY.caroConfigDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroConfigDialog, open)}
    >
      <DialogTrigger {...triggerProps} className={cn('cursor-pointer', triggerProps?.className)}>
        <Setting />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro config</DialogTitle>
        </DialogHeader>
        <Button
          onClick={() => {
            reset();
            setDialog(DIALOG_KEY.caroConfigDialog, false);
          }}
        >
          New game
        </Button>
        <form onSubmit={onSaveConfig}>
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
          <Button type="submit" className="mt-3">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
