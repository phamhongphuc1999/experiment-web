import { ChangeEvent, ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { Input } from 'src/components/shadcn-ui/input';
import { beVietnamPro } from 'src/configs/font-family';
import { PairTableType, ResultType } from 'src/global';
import { cn } from 'src/lib/utils';
import { randomSubGroup } from 'src/services';
import { useConfigStore } from 'src/states/config.state';
import ResultSpot from './ResultSpot';
import RevealSpot from './RevealSpot';

interface Props extends ComponentProps<'div'> {
  pairs: Array<PairTableType>;
}

export default function PairView({ pairs }: Props) {
  const { revealPerWord } = useConfigStore();
  const [isShowReveal, setIsShowReveal] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [arr, setArr] = useState<Array<number>>([]);
  const [outputs, setOutputs] = useState<{ [id: string]: string }>({});
  const [countdown, setCountdown] = useState(0);
  const _id = useRef<NodeJS.Timeout | null>(null);

  const [time, setTime] = useState(0);
  const [result, setResult] = useState<{ [id: number]: ResultType }>({});

  const onReset = useCallback(() => {
    setArr(randomSubGroup(pairs.length));
    setOutputs({});
    setResult({});
    setIsReveal(false);
    setCountdown(0);
    setIsShowReveal(false);
    setOutputs({});
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

  function _calculatorResult() {
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
    return { status, correct, errors };
  }

  function onCheck() {
    setResult({ [time + 1]: _calculatorResult() });
    setTime((preValue) => preValue + 1);
    setIsShowReveal(true);
  }

  function onReveal() {
    let isAllowReveal = true;
    for (const pair of pairs) {
      if (outputs[pair.id] == undefined) {
        isAllowReveal = false;
        break;
      }
    }
    if (isAllowReveal) {
      let correct = 0;
      for (const pair of pairs) {
        if (pair.en == outputs[pair.id]) correct++;
      }

      setIsReveal(true);
      setCountdown(revealPerWord * (pairs.length - correct));
      setArr(randomSubGroup(pairs.length));
    }
  }

  return (
    <div className="rounded-sm border p-2">
      <div className="flex items-center gap-3">
        <Button onClick={onCheck}>Check</Button>
        {result[time]?.correct == pairs.length ? (
          <Button
            onClick={() => {
              onReset();
              setTime(0);
            }}
          >
            Reset
          </Button>
        ) : (
          <>
            {isShowReveal && <Button onClick={onReveal}>{isReveal ? countdown : 'Reveal'}</Button>}
          </>
        )}
        <TitleBox title="Time" value={time + 1} />
      </div>
      {result[time] && <ResultSpot len={pairs.length} result={result[time]} />}
      {result[time] && isReveal && (
        <RevealSpot arr={arr} pairs={pairs} result={result[time]} outputs={outputs} />
      )}
      {arr.length == pairs.length && (
        <>
          {arr.map((num) => {
            const pair = pairs[num - 1];
            const isError = result[time]?.errors?.[pair.id];

            return (
              <div
                key={pair.id}
                className={cn('mt-2 gap-3 rounded-sm border p-2', isError && 'border-destructive')}
              >
                <p>
                  <span className={beVietnamPro.className}>{pair.vi}</span>{' '}
                  {pair.note && <span>({pair.note})</span>}
                </p>
                <Input
                  spellCheck={false}
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
