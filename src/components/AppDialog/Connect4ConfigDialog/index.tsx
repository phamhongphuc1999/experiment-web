import { Setting2 } from 'iconsax-reactjs';
import { MouseEvent } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { DIALOG_KEY } from 'src/configs/constance';
import { useConnect4Store } from 'src/states/connect4.state';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../../AppTooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../shadcn-ui/dialog';
import GameTypeConfig from '../components/GameTypeConfig';
import PlayModeConfig from '../components/PlayModeConfig';
import SoundtrackConfig from '../components/SoundtrackConfig';
import Connect4ConfigProvider from './connect4Config.context';

function Connect4ConfigDialogLayout() {
  const { dialog, setDialog } = useDialogStore();
  const {
    fn: { reset },
  } = useConnect4Store();

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    // setCaroMetadata({ size, playMode, gameType, isOverride, winMode, isMute });
    // if (size != metadata.size) reset();
    setDialog(DIALOG_KEY.connect4ConfigDialog, false);
  }

  function onNewGame() {
    reset();
    setDialog(DIALOG_KEY.connect4ConfigDialog, false);
  }

  function onOpenChange(open: boolean) {
    setDialog(DIALOG_KEY.connect4ConfigDialog, open);
  }

  function onCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={dialog[DIALOG_KEY.connect4ConfigDialog]} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <AppTooltip tooltipContent="Config" contentProps={{ side: 'bottom' }}>
          <Setting2 size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect4 config</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSaveConfig} className="scroll-hidden max-h-[75vh] overflow-auto">
          <PlayModeConfig game="connect4" />
          <GameTypeConfig />
          <SoundtrackConfig game="connect4" />
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

export default function Connect4ConfigDialog() {
  return (
    <Connect4ConfigProvider>
      <Connect4ConfigDialogLayout />
    </Connect4ConfigProvider>
  );
}
