import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function LineConfig() {
  const {
    numberOfLines,
    fn: { setNumberOfLines },
  } = usePikachuConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Number of lines</p>
      <div className="mt-2 flex items-center gap-2">
        <Button
          variant={numberOfLines == 2 ? 'default' : 'outline'}
          onClick={() => setNumberOfLines(2)}
        >
          2
        </Button>
        <Button
          variant={numberOfLines == 3 ? 'default' : 'outline'}
          onClick={() => setNumberOfLines(3)}
        >
          3
        </Button>
      </div>
    </div>
  );
}
