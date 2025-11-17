import { TitleContainer } from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { useCaroConfigContext } from './caroConfig.context';

export default function WinTypeConfig() {
  const {
    winMode,
    fn: { setWinMode },
  } = useCaroConfigContext();

  return (
    <TitleContainer className="mt-2" title="Win type">
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
    </TitleContainer>
  );
}
