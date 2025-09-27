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
    learnMode: storageLearnMode,
    setLearnMode: setStorageLearnMode,
    learnPerWord: storageLearnPerWord,
    setLearnPerWord: setStorageLearnPerWord,
  } = useConfigStore();
  const [revealPerWord, setRevealPerWord] = useState(storageRevealPerWord);
  const [isFillFromScratch, setIsFillFromScratch] = useState(storageIsFillFromScratch);
  const [learnMode, setLearnMode] = useState<'normal' | 'countdown'>('normal');
  const [learnPerWord, setLearnPerWord] = useState(storageLearnPerWord);

  useEffect(() => {
    setRevealPerWord(storageRevealPerWord);
  }, [storageRevealPerWord]);

  useEffect(() => {
    setIsFillFromScratch(storageIsFillFromScratch);
  }, [storageIsFillFromScratch]);

  useEffect(() => {
    setLearnMode(storageLearnMode);
  }, [storageLearnMode]);

  useEffect(() => {
    setLearnPerWord(storageLearnPerWord);
  }, [storageLearnPerWord]);

  function onSaveConfig(event: MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    if (revealPerWord != storageRevealPerWord) setStorageRevealPerWord(revealPerWord);
    if (isFillFromScratch != storageIsFillFromScratch)
      setStorageIsFillFromScratch(isFillFromScratch);
    if (learnMode != storageLearnMode) setStorageLearnMode(learnMode);
    if (learnPerWord != storageLearnPerWord) setStorageLearnPerWord(learnPerWord);
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
        <form onSubmit={onSaveConfig}>
          <div className="grid grid-cols-3">
            <div className="col-span-3 border-t pt-2">
              <BaseInput
                className="col-span-3"
                name="reveal-word"
                type="number"
                placeholder="Reveal per word"
                value={revealPerWord}
                onChange={(event) => setRevealPerWord(parseInt(event.target.value))}
              />
            </div>
            <TitleBox
              className="col-span-3 border-t pt-2"
              title="Is fill from scratch"
              value={
                <Button onClick={() => setIsFillFromScratch((preValue) => !preValue)}>
                  {isFillFromScratch ? 'True' : 'False'}
                </Button>
              }
            />
            <div className="col-span-3 mt-2 border-t pt-2">
              <p>Learn mode</p>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  variant={learnMode == 'normal' ? 'default' : 'outline'}
                  onClick={() => setLearnMode('normal')}
                >
                  Normal
                </Button>
                <Button
                  variant={learnMode == 'countdown' ? 'default' : 'outline'}
                  onClick={() => setLearnMode('countdown')}
                >
                  Countdown
                </Button>
                {learnMode == 'countdown' && (
                  <BaseInput
                    type="number"
                    name="learn-word"
                    placeholder="Learn per word"
                    value={learnPerWord}
                    onChange={(event) => setLearnPerWord(parseInt(event.target.value))}
                  />
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-3">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
