import { VolumeHigh, VolumeSlash } from 'iconsax-reactjs';
import IconButton from 'src/components/buttons/IconButton';
import { Button } from 'src/components/shadcn-ui/button';
import { gameConfigs } from 'src/configs/constance';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { MyAllGameType } from 'src/types/caro.type';
import { useAllGameConfigContext } from './useBoardGameConfigContext';

interface Props {
  game: MyAllGameType;
}

export default function SoundtrackConfig({ game }: Props) {
  const {
    isSound,
    fn: { setIsSound },
  } = useAllGameConfigContext(game);
  const { playMove, playError, playSuccess } = useSoundtrack();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">{gameConfigs[game].title} soundtrack</p>
      <div
        className="mt-2 flex cursor-pointer items-center gap-1"
        onClick={() => setIsSound((preValue) => !preValue)}
      >
        <IconButton>{isSound ? <VolumeHigh size={16} /> : <VolumeSlash size={16} />}</IconButton>
        <p>{isSound ? 'Mute' : 'Unmute'}</p>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button onClick={() => playSuccess()}>Success</Button>
        <Button onClick={() => playMove()} variant="destructive">
          Move
        </Button>
        <Button onClick={() => playError()}>Error</Button>
      </div>
    </div>
  );
}
