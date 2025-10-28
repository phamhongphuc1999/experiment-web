import { ComponentProps, useEffect, useRef, useState } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { PairTableType } from 'src/global';
import { cn } from 'src/lib/utils';
import { useConfigStore } from 'src/states/config.state';
import { useWordPairsStore } from 'src/states/wordPairs.state';
import PairDetailResultDialog from '../dialog/PairDetailResultDialog';

interface Props extends ComponentProps<'div'> {
  pairs: Array<PairTableType>;
}

export default function ActionSpot({ pairs, ...props }: Props) {
  const [countdown, setCountdown] = useState(0);
  const { revealPerWord, isFillFromScratch } = useConfigStore();
  const _id = useRef<NodeJS.Timeout | null>(null);
  const {
    status,
    currentRound,
    result,
    init,
    fn: { onCheck, onReveal, onNextRound },
  } = useWordPairsStore();

  useEffect(() => {
    if (countdown == 0 && status == 'revealing') onNextRound(isFillFromScratch);
  }, [countdown, onNextRound, isFillFromScratch, status]);

  useEffect(() => {
    if (countdown > 0) {
      _id.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (_id.current) clearInterval(_id.current);
    };
  }, [countdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
        return;

      if (e.key === 'Enter') {
        e.preventDefault();
        onCheck();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCheck]);

  function _onReveal() {
    setCountdown(revealPerWord * result[currentRound].numberOfError);
    onReveal();
  }

  return (
    <div {...props} className={cn('rounded-sm border p-3', props.className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={onCheck}>Check</Button>
        {(status == 'showError' || status == 'revealing') && (
          <Button onClick={_onReveal}>{countdown > 0 ? `${countdown}s` : 'Reveal'}</Button>
        )}
        {status == 'showError' && (
          <Button onClick={() => onNextRound(isFillFromScratch)}>Next round without reveal</Button>
        )}
        {status == 'reset' && <Button onClick={() => init(pairs)}>Reset</Button>}
        <TitleBox title="Time" value={currentRound} />
        <TitleBox title="Number of Records" value={result[currentRound].reorderPairs.length} />
        {currentRound > 1 && <PairDetailResultDialog />}
      </div>
      <div className="mt-2">
        {result[currentRound].generalError && (
          <p className="text-destructive font-semibold">{result[currentRound].generalError}</p>
        )}
        {(status == 'showError' || status == 'revealing') && (
          <TitleBox
            title="Correct answers"
            value={
              <p>
                <span className="text-green-400">{result[currentRound].numberOfOk}</span>/
                {result[currentRound].reorderPairs.length}
              </p>
            }
          />
        )}
        {status == 'reset' && <p className="text-green-400">Well done!!</p>}
      </div>
    </div>
  );
}
