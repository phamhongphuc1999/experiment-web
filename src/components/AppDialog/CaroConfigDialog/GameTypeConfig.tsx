import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConfigContext } from './caroConfig.context';

export default function GameTypeConfig() {
  const {
    gameType,
    isOverride,
    events: { setGameType, setIsOverride },
  } = useCaroConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Game type</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button
          variant={gameType == 'normal' ? 'default' : 'outline'}
          onClick={() => setGameType('normal')}
        >
          Normal
        </Button>
        <Button
          variant={isOverride ? 'default' : 'outline'}
          onClick={() => setIsOverride((preValue) => !preValue)}
        >
          Override
        </Button>
        <Button
          variant={gameType == 'blind' ? 'default' : 'outline'}
          onClick={() => setGameType('blind')}
        >
          Blind
        </Button>
      </div>
    </div>
  );
}
