import { VolumeHigh, VolumeSlash } from 'iconsax-reactjs';
import IconButton from 'src/components/buttons/IconButton';
import { Button } from 'src/components/shadcn-ui/button';
import { gameConfigs } from 'src/configs/constance';
import { MyAllGameType } from 'src/global';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { useAllGameConfigContext } from './useBoardGameConfigContext';

interface Props {
  game: MyAllGameType;
}

export default function SoundtrackConfig({ game }: Props) {
  const {
    isSound,
    fn: { setIsSound },
  } = useAllGameConfigContext(game);
  const { playMove, playError } = useSoundtrack();

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
      <div className="mt-2 flex items-center gap-2">
        <Button onClick={() => playMove()} variant="outline">
          Move soundtrack
        </Button>
        <Button onClick={() => playError()}>Error soundtrack</Button>
      </div>
    </div>
  );
}
