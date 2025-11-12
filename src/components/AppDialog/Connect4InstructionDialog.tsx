/* eslint-disable quotes */
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

export default function Connect4InstructionDialog() {
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
          <DialogTitle>Connect4 instruction</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden h-fit max-h-[75vh] overflow-auto">
          <p className="text-lg">1. How to play?</p>
          <p className="text-justify text-sm">
            {
              'The Connect 4 board has seven columns and six rows. It stands upright so that the discs can fall straight down when dropped into a column.'
            }
          </p>
          <p className="text-justify text-sm">
            {
              "One player uses red discs, and the other uses yellow discs (or any two distinct colors). Decide who goes first — usually, the red player starts. On your turn, choose any of the seven columns and drop one of your discs into it. The disc will slide down and rest in the lowest empty space in that column. The goal is to connect four of your own discs in a straight line — horizontally, vertically, or diagonally. As you play, watch your opponent's moves carefully and try to block their attempts while setting up your own winning position. The first player to connect four of their discs in a row wins the game."
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
