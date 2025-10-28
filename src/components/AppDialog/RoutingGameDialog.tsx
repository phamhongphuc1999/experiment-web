import { Routing } from 'iconsax-reactjs';
import Link from 'next/link';
import { DIALOG_KEY } from 'src/configs/constance';
import { MyGameType } from 'src/global';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../AppTooltip';
import { Button } from '../shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';

interface Props {
  game: MyGameType;
}

export default function RoutingGameDialog({ game }: Props) {
  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog[DIALOG_KEY.routingGameDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.routingGameDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Routing">
          <Routing size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${game == 'caro' ? 'Caro' : 'Connect4'} routing`}</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden flex h-[30vh] flex-wrap gap-2 overflow-auto">
          <Link href="/">
            <Button onClick={() => setDialog(DIALOG_KEY.routingGameDialog, false)}>Go home</Button>
          </Link>
          <Link href={game == 'caro' ? '/connect4' : '/caro'}>
            <Button onClick={() => setDialog(DIALOG_KEY.routingGameDialog, false)}>
              {game == 'caro' ? 'Go to Connect4' : 'Go to Caro'}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
