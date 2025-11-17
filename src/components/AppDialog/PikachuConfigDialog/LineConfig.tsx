import { TitleContainer } from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function LineConfig() {
  const {
    numberOfLines,
    fn: { setNumberOfLines },
  } = usePikachuConfigContext();

  return (
    <TitleContainer className="mt-2" title="Number of lines">
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
    </TitleContainer>
  );
}
