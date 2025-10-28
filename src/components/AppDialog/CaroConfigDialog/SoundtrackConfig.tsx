import { VolumeHigh, VolumeSlash } from 'iconsax-reactjs';
import IconButton from 'src/components/buttons/IconButton';
import { useCaroConfigContext } from './caroConfig.context';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { Button } from 'src/components/shadcn-ui/button';

export default function SoundtrackConfig() {
  const {
    isMute,
    fn: { setIsMute },
  } = useCaroConfigContext();
  const { playMove, playError } = useSoundtrack();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Caro soundtrack</p>
      <div className="mt-2 flex items-center gap-2">
        <IconButton onClick={() => setIsMute((preValue) => !preValue)}>
          {isMute ? <VolumeHigh size={16} /> : <VolumeSlash size={16} />}
        </IconButton>
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
