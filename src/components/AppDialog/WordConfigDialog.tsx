import { MouseEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DIALOG_KEY } from 'src/configs/constance';
import { useConfigStore } from 'src/states/config.state';
import { useDialogStore } from 'src/states/dialog.state';
import TitleBox from '../box/TitleBox';
import BaseInput from '../input/BaseInput';
import { Button } from '../shadcn-ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../shadcn-ui/dialog';

export default function WordConfigDialog() {
  const { dialog, setDialog } = useDialogStore();
  const {
    revealPerWord: storageRevealPerWord,
    setRevealPerWord: setStorageRevealPerWord,
    isFillFromScratch: storageIsFillFromScratch,
    setIsFillFromScratch: setStorageIsFillFromScratch,
  } = useConfigStore();
  const [revealPerWord, setRevealPerWord] = useState(storageRevealPerWord);
  const [isFillFromScratch, setIsFillFromScratch] = useState(storageIsFillFromScratch);

  useEffect(() => {
    setRevealPerWord(storageRevealPerWord);
  }, [storageRevealPerWord]);

  useEffect(() => {
    setIsFillFromScratch(storageIsFillFromScratch);
  }, [storageIsFillFromScratch]);

  function onSaveConfig(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (revealPerWord != storageRevealPerWord) setStorageRevealPerWord(revealPerWord);
    if (isFillFromScratch != storageIsFillFromScratch)
      setStorageIsFillFromScratch(isFillFromScratch);
    toast.success('Save successfully!');
    setDialog(DIALOG_KEY.wordConfigDialog, false);
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
              className="col-span-3"
              type="number"
              placeholder="Reveal per word"
              value={revealPerWord}
              onChange={(event) => setRevealPerWord(parseInt(event.target.value))}
            />
            <TitleBox
              className="col-span-3"
              title="Is fill from scratch"
              value={
                <Button onClick={() => setIsFillFromScratch((preValue) => !preValue)}>
                  {isFillFromScratch ? 'True' : 'False'}
                </Button>
              }
            />
          </div>
          <Button type="submit" onClick={onSaveConfig} className="mt-3">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
