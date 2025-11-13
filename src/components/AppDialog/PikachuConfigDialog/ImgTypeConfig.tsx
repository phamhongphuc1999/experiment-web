import { Button } from 'src/components/shadcn-ui/button';
import { usePikachuConfigContext } from './pikachuConfig.context';

export default function ImgTypeConfig() {
  const {
    imgType,
    fn: { setImgType },
  } = usePikachuConfigContext();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Number of lines</p>
      <div className="mt-2 flex items-center gap-2">
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
      </div>
    </div>
  );
}
