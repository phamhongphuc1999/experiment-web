import { MouseEvent, useState } from 'react';
import { DIALOG_KEY } from 'src/configs/constance';
import { useConfigStore } from 'src/states/config.state';
import { useDialogStore } from 'src/states/dialog.state';
import BaseInput from '../input/BaseInput';
import { Button } from '../shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../shadcn-ui/dialog';

export default function WordConfigDialog() {
  const { dialog, setDialog } = useDialogStore();
  const { revealPerWord: storageRevealPerWord, setRevealPerWord: setStorageRevealPerWord } =
    useConfigStore();
  const [revealPerWord, setRevealPerWord] = useState(storageRevealPerWord);

  function onSaveConfig(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (revealPerWord != storageRevealPerWord) setStorageRevealPerWord(revealPerWord);
  }

  return (
    <Dialog
      open={dialog[DIALOG_KEY.wordConfigDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.wordConfigDialog, open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Word config</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid grid-cols-3">
            <BaseInput
              type="number"
              placeholder="Reveal per word"
              value={revealPerWord}
              onChange={(event) => setRevealPerWord(parseInt(event.target.value))}
            />
          </div>
          <Button type="submit" onClick={onSaveConfig}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
