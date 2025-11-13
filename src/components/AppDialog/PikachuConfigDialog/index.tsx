import { Setting2 } from 'iconsax-reactjs';
import { MouseEvent } from 'react';
import AppTooltip from 'src/components/AppTooltip';
import { Button } from 'src/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/shadcn-ui/dialog';
import { DIALOG_KEY } from 'src/configs/constance';
import { useDialogStore } from 'src/states/dialog.state';
import { usePikachuStore } from 'src/states/pikachu.state';
import SoundtrackConfig from '../components/SoundtrackConfig';
import BoardSizeConfig from './BoardSizeConfig';
import ImgTypeConfig from './ImgTypeConfig';
import LineConfig from './LineConfig';
import PikachuConfigProvider, { usePikachuConfigContext } from './pikachuConfig.context';
import TimeTypeConfig from './TimeTypeConfig';

function PikachuConfigDialogLayout() {
  const { dialog, setDialog } = useDialogStore();
  const {
    metadata,
    fn: { setMetadata },
  } = usePikachuStore();
  const {
    isSound,
    size,
    numberOfLines,
    timeConfigType,
    imgType,
    fn: { setIsSound, setSize, setNumberOfLines, setTimeConfigType, setImgType },
  } = usePikachuConfigContext();

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    const _figure = size.numberOfRows == 9 ? 5 : size.numberOfRows == 6 ? 2 : 1;
    const maxRemainingTime = Math.floor(
      timeConfigType == 'normal'
        ? size.numberOfRows * size.numberOfColumns * _figure
        : (size.numberOfRows * size.numberOfColumns * _figure) / 2
    );
    setMetadata({
      isSound,
      numberOfRows: size.numberOfRows,
      numberOfColumns: size.numberOfColumns,
      numberOfLines,
      remainingChanges: numberOfLines == 2 ? 20 : 10,
      status: 'init',
      timeConfigType,
      maxRemainingTime,
      imgType,
    });
    setDialog(DIALOG_KEY.pikachuConfigDialog, false);
  }

  function onOpenChange(open: boolean) {
    setDialog(DIALOG_KEY.pikachuConfigDialog, open);
  }

  function onCancel() {
    setIsSound(metadata.isSound);
    setSize({ numberOfRows: metadata.numberOfRows, numberOfColumns: metadata.numberOfColumns });
    setNumberOfLines(metadata.numberOfLines);
    setTimeConfigType(metadata.timeConfigType);
    setImgType(metadata.imgType);
    onOpenChange(false);
  }

  return (
    <Dialog open={dialog[DIALOG_KEY.pikachuConfigDialog]} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <AppTooltip tooltipContent="Config" contentProps={{ side: 'bottom' }}>
          <Setting2 size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pikachu config</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSaveConfig} className="scroll-hidden max-h-[75vh] overflow-auto">
          <BoardSizeConfig />
          <SoundtrackConfig game="pikachu" />
          <ImgTypeConfig />
          <LineConfig />
          <TimeTypeConfig />
          <div className="mt-4 flex items-center justify-between">
            <Button onClick={onCancel} variant="destructive" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PikachuConfigDialog() {
  return (
    <PikachuConfigProvider>
      <PikachuConfigDialogLayout />
    </PikachuConfigProvider>
  );
}
