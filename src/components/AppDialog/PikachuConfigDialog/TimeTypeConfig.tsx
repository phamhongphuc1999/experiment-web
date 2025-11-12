import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function TimeTypeConfig() {
  const {
    timeConfigType,
    fn: { setTimeConfigType },
  } = usePikachuConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Time type</p>
      <div className="mt-2 flex items-center gap-2">
        <Button
          variant={timeConfigType == 'normal' ? 'default' : 'outline'}
          onClick={() => setTimeConfigType('normal')}
        >
          Normal
        </Button>
        <Button
          variant={timeConfigType == 'cumulative' ? 'default' : 'outline'}
          onClick={() => setTimeConfigType('cumulative')}
        >
          Cumulative
        </Button>
      </div>
    </div>
  );
}
