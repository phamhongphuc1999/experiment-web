import { TitleContainer } from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function GameTypeConfig() {
  const {
    gameType,
    fn: { setGameType },
  } = usePikachuConfigContext();

  return (
    <TitleContainer className="mt-2" title="Game type">
      <Button
        variant={gameType == 'normal' ? 'default' : 'outline'}
        onClick={() => setGameType('normal')}
      >
        Normal
      </Button>
      <Button
        variant={gameType == 'customBoard' ? 'default' : 'outline'}
        onClick={() => setGameType('customBoard')}
      >
        Custom board
      </Button>
      <Button
        variant={gameType == 'randomBoard' ? 'default' : 'outline'}
        onClick={() => setGameType('randomBoard')}
      >
        Random board
      </Button>
      <Button
        variant={gameType == 'blind' ? 'default' : 'outline'}
        onClick={() => setGameType('blind')}
      >
        Blind
      </Button>
    </TitleContainer>
  );
}
