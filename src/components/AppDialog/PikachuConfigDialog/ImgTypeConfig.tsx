import { TitleContainer } from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function ImgTypeConfig() {
  const {
    imgType,
    fn: { setImgType },
  } = usePikachuConfigContext();

  return (
    <TitleContainer className="mt-2" title="Image type">
      <Button
        variant={imgType == 'internal' ? 'default' : 'outline'}
        onClick={() => setImgType('internal')}
      >
        Internal
      </Button>
      <Button
        variant={imgType == 'external' ? 'default' : 'outline'}
        onClick={() => setImgType('external')}
      >
        External
      </Button>
    </TitleContainer>
  );
}
