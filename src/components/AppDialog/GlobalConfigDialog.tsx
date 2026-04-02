import { Settings2 } from 'lucide-react';
import { DIALOG_KEY } from 'src/configs/constance';
import { useDialogStore } from 'src/states/dialog.state';
import ThemeButton from '../buttons/ThemeButton';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../shadcn/dialog';
import SoundtrackConfig from './components/SoundtrackConfig';

export default function GlobalConfigDialog() {
  const { dialog, setDialog } = useDialogStore();

  return (
    <Dialog
      open={dialog[DIALOG_KEY.globalConfigDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.globalConfigDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <Settings2 size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Config</DialogHeader>
        <div>
          <ThemeButton />
          <SoundtrackConfig />
        </div>
      </DialogContent>
    </Dialog>
  );
}
