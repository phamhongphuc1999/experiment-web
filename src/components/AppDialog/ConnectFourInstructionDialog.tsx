import { InfoCircle } from 'iconsax-reactjs';
import { DIALOG_KEY } from 'src/configs/constance';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../AppTooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';

export default function ConnectFourInstructionDialog() {
  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog[DIALOG_KEY.connect4InstructionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.connect4InstructionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Instructions">
          <InfoCircle size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Connect 4 instruction</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
