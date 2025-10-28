import { VolumeHigh, VolumeSlash } from 'iconsax-reactjs';
import IconButton from 'src/components/buttons/IconButton';
import { Button } from 'src/components/shadcn-ui/button';
import useSoundtrack from 'src/hooks/useSoundtrack';
import useBoardGameConfigContext from './useBoardGameConfigContext';
import { MyGameType } from 'src/global';

interface Props {
  game: MyGameType;
}

export default function SoundtrackConfig({ game }: Props) {
  const {
    isMute,
    fn: { setIsMute },
  } = useBoardGameConfigContext(game);
  const { playMove, playError } = useSoundtrack();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Caro soundtrack</p>
      <div
        className="mt-2 flex cursor-pointer items-center gap-1"
        onClick={() => setIsMute((preValue) => !preValue)}
      >
        <IconButton>{isMute ? <VolumeHigh size={16} /> : <VolumeSlash size={16} />}</IconButton>
        <p>{isMute ? 'Mute' : 'Unmute'}</p>
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
