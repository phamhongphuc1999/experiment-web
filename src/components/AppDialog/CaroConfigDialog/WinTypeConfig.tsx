import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConfigContext } from './caroConfig.context';

export default function WinTypeConfig() {
  const {
    winMode,
    events: { setWinMode },
  } = useCaroConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Win type</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button
          variant={winMode == 'blockOpponent' ? 'default' : 'outline'}
          onClick={() => setWinMode('blockOpponent')}
        >
          Block by Opponent
        </Button>
        <Button
          variant={winMode == 'non-blockOpponent' ? 'default' : 'outline'}
          onClick={() => setWinMode('non-blockOpponent')}
        >
          Non-block by Opponent
        </Button>
      </div>
    </div>
  );
}
