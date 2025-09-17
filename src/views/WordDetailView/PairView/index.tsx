import { ChangeEvent, ComponentProps, useEffect } from 'react';
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
    events: { changeEn },
    status: gameStatus,
  } = useWordPairsStore();

  useEffect(() => {
    init(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  function onOutputsChange(event: ChangeEvent<HTMLInputElement>, id: string) {
    changeEn(id, event.target.value);
  }

  return gameStatus != 'init' ? (
    <div className="relative">
      <ActionSpot pairs={pairs} className="bg-background sticky top-0 z-10" />
      <div className="mt-3 min-h-0 flex-1 overflow-auto">
        <RevealSpot />
        {result[currentRound].reorderPairs.map((pair) => {
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
                spellCheck={false}
                className="mt-2"
                value={userEn || ''}
                onChange={(event) => onOutputsChange(event, pair.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}
