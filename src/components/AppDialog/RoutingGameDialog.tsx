import { Routing } from 'iconsax-reactjs';
import Link from 'next/link';
import { DIALOG_KEY } from 'src/configs/constance';
import { MyAllGameType } from 'src/global';
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
import { useMemo } from 'react';

const configs: { [key in MyAllGameType]: { title: string; link: string } } = {
  caro: { title: 'Caro', link: '/caro' },
  connect4: { title: 'Connect4', link: '/connect4' },
  pikachu: { title: 'Pikachu', link: '/pikachu' },
};

const _arr: Array<MyAllGameType> = ['caro', 'connect4', 'pikachu'];

interface Props {
  game: MyAllGameType;
}

export default function RoutingGameDialog({ game }: Props) {
  const config = configs[game];
  const { dialog, setDialog } = useDialogStore();

  const games = useMemo(() => {
    return _arr.filter((item) => item != game);
  }, [game]);

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
          <DialogTitle>{`${config.title} routing`}</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden flex h-[30vh] flex-wrap gap-2 overflow-auto">
          <Link href="/">
            <Button onClick={() => setDialog(DIALOG_KEY.routingGameDialog, false)}>Go home</Button>
          </Link>
          {games.map((g) => {
            const _game = configs[g];

            return (
              <Link href={_game.link}>
                <Button
                  variant="outline"
                  onClick={() => setDialog(DIALOG_KEY.routingGameDialog, false)}
                >
                  {_game.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
