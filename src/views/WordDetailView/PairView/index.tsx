import { ChangeEvent, ComponentProps, KeyboardEvent, useEffect, useRef } from 'react';
import { Input } from 'src/components/shadcn-ui/input';
import { beVietnamPro } from 'src/configs/font-family';
import { PairTableType } from 'src/global';
import { cn } from 'src/lib/utils';
import { useWordPairsStore } from 'src/states/wordPairs.state';
import ActionSpot from './ActionSpot';
import RevealSpot from './RevealSpot';

interface Props extends ComponentProps<'div'> {
  pairs: Array<PairTableType>;
}

export default function PairView({ pairs }: Props) {
  const {
    currentRound,
    result,
    init,
    fn: { changeEn },
    status: gameStatus,
  } = useWordPairsStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    init(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  function onOutputsChange(event: ChangeEvent<HTMLInputElement>, id: string) {
    changeEn(id, event.target.value);
  }

  function _effect(_ref: HTMLInputElement | null) {
    if (_ref) {
      _ref.focus();
      _ref.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const _down = inputRefs.current[index + 1];
      if (_down) _effect(_down);
      else _effect(inputRefs.current[0]);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index == 0) {
        const _up = inputRefs.current[result[currentRound].reorderPairs.length - 1];
        _effect(_up);
      } else _effect(inputRefs.current[index - 1]);
    }
  }

  return gameStatus != 'init' ? (
    <div className="relative">
      <ActionSpot pairs={pairs} className="bg-background sticky top-0 z-10" />
      <div className="mt-3 min-h-0 flex-1 overflow-auto">
        <RevealSpot />
        {result[currentRound].reorderPairs.map((pair, index) => {
          const point = result[currentRound].points[pair.id];
          const status = point.status;
          const userEn = point.userEn;
          const isRed =
            status == 'wrong' && (gameStatus == 'showError' || gameStatus == 'revealing');
          const isReveal = gameStatus == 'revealing' && status == 'wrong';

          return (
            <div
              key={pair.id}
              className={cn('mt-2 gap-3 rounded-sm border p-2', isRed && 'border-destructive')}
            >
              <p>
                <span className={beVietnamPro.className}>{pair.vi}</span>{' '}
                {pair.note && <span>({pair.note})</span>}
                {isReveal && (
                  <span className="text-green-400">
                    {' -> '}
                    {pair.en}
                  </span>
                )}
              </p>
              <Input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                spellCheck={false}
                className="mt-2"
                value={userEn || ''}
                onChange={(event) => onOutputsChange(event, pair.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
