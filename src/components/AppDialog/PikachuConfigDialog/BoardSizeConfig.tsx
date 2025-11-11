import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function BoardSizeConfig() {
  const {
    size,
    fn: { setSize },
  } = usePikachuConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Pikachu board</p>
      <div className="mt-2 flex items-center gap-2">
        <Button
          variant={size.numberOfColumns == 6 ? 'default' : 'outline'}
          onClick={() => setSize({ numberOfRows: 4, numberOfColumns: 6 })}
        >
          6x4
        </Button>
        <Button
          variant={size.numberOfColumns == 9 ? 'default' : 'outline'}
          onClick={() => setSize({ numberOfRows: 6, numberOfColumns: 9 })}
        >
          9x6
        </Button>
        <Button
          variant={size.numberOfColumns == 16 ? 'default' : 'outline'}
          onClick={() => setSize({ numberOfRows: 9, numberOfColumns: 16 })}
        >
          16x9
        </Button>
      </div>
    </div>
  );
}
