import { ComponentProps, useMemo, useState } from 'react';
import { Input } from 'src/components/shadcn-ui/input';
import { beVietnamPro } from 'src/configs/font-family';
import { PairTableType } from 'src/global';
import { useConfigStore } from 'src/states/config.state';
import ActionSpot from './ActionSpot';
import { cn } from 'src/lib/utils';

interface Props extends ComponentProps<'div'> {
  categoryId: string;
  pairs: Array<PairTableType>;
}

export default function PairView({ categoryId, pairs }: Props) {
  const { learnMode } = useConfigStore();
  const [countdown, setCountdown] = useState(0);

  const isShow = useMemo(() => {
    if (learnMode == 'normal') return true;
    else return countdown > 0;
  }, [countdown, learnMode]);

  return (
    <div className="relative">
      <ActionSpot
        categoryId={categoryId}
        pairLen={pairs.length}
        countdown={countdown}
        setCountdown={setCountdown}
        className="bg-background sticky top-0 z-10"
      />
      {pairs.map((pair, index) => {
        return (
          <div key={pair.id} className="mt-2 gap-3 rounded-sm border p-2">
            <p>
              <span className={beVietnamPro.className}>
                {index + 1}. {pair.vi}
              </span>{' '}
              {pair.note && <span>({pair.note})</span>}
            </p>
            <Input className={cn('mt-2', !isShow && 'blur-xs')} value={pair.en} readOnly />
          </div>
        );
      })}
    </div>
  );
}
