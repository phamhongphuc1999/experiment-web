import { ChangeEvent, ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { Input } from 'src/components/shadcn-ui/input';
import { PairTableType } from 'src/global';
import { cn } from 'src/lib/utils';
import { randomSubGroup } from 'src/services';

type ResultType = {
  status: string;
  correct: number;
  errors: { [id: string]: boolean };
};

interface Props extends ComponentProps<'div'> {
  pairs: Array<PairTableType>;
}

export default function PairView({ pairs }: Props) {
  const [isReveal, setIsReveal] = useState(false);
  const [arr, setArr] = useState<Array<number>>([]);
  const [outputs, setOutputs] = useState<{ [id: string]: string }>({});
  const [result, setResult] = useState<ResultType | undefined>(undefined);
  const [countdown, setCountdown] = useState(0);
  const _id = useRef<NodeJS.Timeout | null>(null);

  const onReset = useCallback(() => {
    setArr(randomSubGroup(pairs.length));
    setOutputs({});
    setResult(undefined);
    setIsReveal(false);
    setCountdown(0);
  }, [pairs.length]);

  useEffect(() => {
    setArr(randomSubGroup(pairs.length));
    onReset();
  }, [pairs, onReset]);

  useEffect(() => {
    if (countdown == 0) onReset();
  }, [countdown, onReset]);

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

  function onOutputsChange(event: ChangeEvent<HTMLInputElement>, id: string) {
    setOutputs((preValue) => {
      return { ...preValue, [id]: event.target.value };
    });
  }

  function onCheck() {
    let status = '';
    let correct = 0;
    const errors: { [id: string]: boolean } = {};
    for (const pair of pairs) {
      if (outputs[pair.id] == undefined) {
        status = 'please fill entires';
        break;
      }
      if (pair.en != outputs[pair.id]) errors[pair.id] = true;
      else correct++;
    }
    setResult({ status, correct, errors });
  }

  function onReveal() {
    let isAllowReveal = true;
    for (const pair of pairs) {
      if (outputs[pair.id] == undefined) {
        isAllowReveal = false;
        break;
      }
    }
    setOutputs({});
    if (isAllowReveal) {
      setIsReveal(true);
      setCountdown(5);
      setArr(randomSubGroup(pairs.length));
      setResult(undefined);
    }
  }

  return (
    <div className="rounded-sm border p-2">
      <div className="flex items-center gap-3">
        <Button onClick={onCheck}>Check</Button>
        <Button onClick={onReveal}>{isReveal ? countdown : 'Reveal'}</Button>
        {result?.correct == pairs.length && <Button onClick={onReset}>Reset</Button>}
      </div>
      {result && (
        <div className="mt-2">
          {result.status.length > 0 ? (
            <p className="text-destructive">{result.status}</p>
          ) : (
            <>
              <TitleBox title="Number of corrects" value={`${result.correct}/${pairs.length}`} />
            </>
          )}
        </div>
      )}
      {arr.length == pairs.length && (
        <>
          {arr.map((num) => {
            const pair = pairs[num - 1];
            const isError = result?.errors?.[pair.id];

            return (
              <div
                key={pair.id}
                className={cn('mt-2 gap-3 rounded-sm border p-2', isError && 'border-destructive')}
              >
                <p>
                  {pair.vi} {isReveal && <span className="text-chart-4">{` -> ${pair.en}`}</span>}
                </p>
                <Input
                  className="mt-2"
                  value={outputs[pair.id] || ''}
                  onChange={(event) => onOutputsChange(event, pair.id)}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
