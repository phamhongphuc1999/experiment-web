import { InfoCircle } from 'iconsax-reactjs';
import { DIALOG_KEY, PIKACHU_PIECE_HEIGHT, PIKACHU_PIECE_WIDTH } from 'src/configs/constance';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../AppTooltip';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../shadcn-ui/dialog';

export default function PikachuInstructionDialog() {
  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog[DIALOG_KEY.pikachuInstructionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.pikachuInstructionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Instructions">
          <InfoCircle size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl!">
        <DialogHeader>Pikachu instruction</DialogHeader>
        <div className="scroll-hidden h-fit max-h-[75vh] overflow-auto">
          <p className="text-lg">1. Images</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {Array.from({ length: 72 }).map((_, index) => {
              const _index = index + 1;

              return (
                <div key={_index}>
                  <AppTooltip
                    tooltipContent={
                      <img
                        src={`/pikachu/piece${_index}.png`}
                        alt={_index.toString()}
                        style={{
                          width: PIKACHU_PIECE_WIDTH + 20,
                          height: PIKACHU_PIECE_HEIGHT + 20,
                        }}
                      />
                    }
                  >
                    <img
                      src={`/pikachu/piece${_index}.png`}
                      alt={_index.toString()}
                      style={{ width: PIKACHU_PIECE_WIDTH, height: PIKACHU_PIECE_HEIGHT }}
                    />
                  </AppTooltip>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
