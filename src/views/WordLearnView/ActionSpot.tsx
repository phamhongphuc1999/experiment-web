import Link from 'next/link';
import { ComponentProps, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { useConfigStore } from 'src/states/config.state';

interface Props extends ComponentProps<'div'> {
  pairLen: number;
  categoryId: string;
  countdown: number;
  setCountdown: Dispatch<SetStateAction<number>>;
}

export default function ActionSpot({
  pairLen,
  categoryId,
  countdown,
  setCountdown,
  ...props
}: Props) {
  const { learnMode, learnPerWord } = useConfigStore();
  const _id = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      _id.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (_id.current) clearInterval(_id.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  function onStart() {
    setCountdown(learnPerWord * pairLen);
  }

  return (
    <div {...props} className={cn('rounded-sm border p-3', props.className)}>
      <div className="flex items-center gap-2">
        <TitleBox title="Mode" value={learnMode} />
        <TitleBox title="Number of words" value={pairLen} />
        {countdown == 0 && (
          <Link href={`/word/${categoryId}`}>
            <Button>Ready to Play</Button>
          </Link>
        )}
      </div>
      {learnMode == 'countdown' && (
        <div className="mt-2">
          <Button onClick={onStart} disabled={countdown > 0}>
            {countdown > 0 ? countdown : 'Start'}
          </Button>
        </div>
      )}
    </div>
  );
}
