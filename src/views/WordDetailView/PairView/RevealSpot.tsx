import { PairTableType, ResultType } from 'src/global';

interface Props {
  arr: number[];
  pairs: Array<PairTableType>;
  result: ResultType;
  outputs: { [id: string]: string };
}

export default function RevealSpot({ arr, pairs, result, outputs }: Props) {
  return (
    <div className="mt-3">
      {arr.map((item) => {
        const pair = pairs[item - 1];
        const isError = result?.errors?.[pair.id];
        const _output = outputs[pair.id];

        return (
          <div key={pair.id}>
            {isError ? (
              <p>
                <span>{pair.vi}</span>
                <span>{' -> '}</span>
                <span className="text-destructive">{_output}</span>
                <span>{' -> '}</span>
                <span className="text-chart-3">{pair.en}</span>
              </p>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}
