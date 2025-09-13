import TitleBox from 'src/components/box/TitleBox';
import { ResultType } from 'src/global';

interface Props {
  len: number;
  result: ResultType;
}

export default function ResultSpot({ len, result }: Props) {
  return (
    <div className="mt-2">
      {result.status.length > 0 ? (
        <p className="text-destructive">{result.status}</p>
      ) : (
        <>
          <TitleBox
            title="Number of corrects"
            value={
              <p>
                <span className="text-emerald-500">{result.correct}</span>/{len}
              </p>
            }
          />
        </>
      )}
    </div>
  );
}
