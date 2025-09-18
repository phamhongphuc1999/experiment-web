import { DialogTriggerProps } from '@radix-ui/react-dialog';
import { Setting } from 'iconsax-reactjs';
import { DIALOG_KEY } from 'src/configs/constance';
import { cn } from 'src/lib/utils';
import { useDialogStore } from 'src/states/dialog.state';
import { Dialog, DialogContent, DialogTrigger } from '../shadcn-ui/dialog';

interface Props {
  triggerProps?: DialogTriggerProps;
}

export default function CaroConfigDialog({ triggerProps }: Props) {
  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog[DIALOG_KEY.caroConfigDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroConfigDialog, open)}
    >
      <DialogTrigger {...triggerProps} className={cn('cursor-pointer', triggerProps?.className)}>
        <Setting />
      </DialogTrigger>
      <DialogContent>123</DialogContent>
    </Dialog>
  );
}
