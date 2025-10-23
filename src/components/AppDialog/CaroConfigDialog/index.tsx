import { Setting2 } from 'iconsax-reactjs';
import { MouseEvent } from 'react';
import { DIALOG_KEY } from 'src/configs/constance';
import { useCaroStore } from 'src/states/caro.state';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../../AppTooltip';
import { Button } from '../../shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../shadcn-ui/dialog';
import BoardSizeConfig from './BoardSizeConfig';
import CaroConfigProvider, { useCaroConfigContext } from './caroConfig.context';
import GameTypeConfig from './GameTypeConfig';
import PlayModeConfig from './PlayModeConfig';
import WinTypeConfig from './WinTypeConfig';

function CaroConfigDialogLayout() {
  const { dialog, setDialog } = useDialogStore();
  const {
    metadata,
    events: { reset, setCaroMetadata },
  } = useCaroStore();
  const {
    size,
    playMode,
    gameType,
    isOverride,
    winMode,
    events: { setSize, setPlayMode, setGameType, setIsOverride, setWinMode },
  } = useCaroConfigContext();

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    setCaroMetadata({ size, playMode, gameType, isOverride, winMode });
    reset();
    setDialog(DIALOG_KEY.caroConfigDialog, false);
  }

  function onNewGame() {
    reset();
    setDialog(DIALOG_KEY.caroConfigDialog, false);
  }

  function onOpenChange(open: boolean) {
    setSize(metadata.size);
    setPlayMode(metadata.playMode);
    setGameType(metadata.gameType);
    setIsOverride(metadata.isOverride);
    setWinMode(metadata.winMode);
    setDialog(DIALOG_KEY.caroConfigDialog, open);
  }

  function onCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={dialog[DIALOG_KEY.caroConfigDialog]} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <AppTooltip tooltipContent="Config" contentProps={{ side: 'bottom' }}>
          <Setting2 size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro config</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSaveConfig}>
          <PlayModeConfig />
          <GameTypeConfig />
          <WinTypeConfig />
          <BoardSizeConfig />
          <div className="mt-4 flex items-center justify-between">
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

export default function CaroConfigDialog() {
  return (
    <CaroConfigProvider>
      <CaroConfigDialogLayout />
    </CaroConfigProvider>
  );
}
