import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConfigContext } from './caroConfig.context';

export default function BoardSizeConfig() {
  const {
    size,
    events: { setSize },
  } = useCaroConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Caro board</p>
      <div className="mt-2 flex items-center gap-2">
        <Button variant={size == 3 ? 'default' : 'outline'} onClick={() => setSize(3)}>
          3x3
        </Button>
        <Button variant={size == 10 ? 'default' : 'outline'} onClick={() => setSize(10)}>
          10x10
        </Button>
        <Button variant={size == 15 ? 'default' : 'outline'} onClick={() => setSize(15)}>
          15x15
        </Button>
      </div>
    </div>
  );
}
