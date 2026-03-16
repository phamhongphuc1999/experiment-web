import { Volume2, VolumeOff } from 'lucide-react';
import IconButton from 'src/components/buttons/IconButton';
import { Button } from 'src/components/shadcn-ui/button';
import { useConfigStore } from 'src/states/config.state';
import { SoundType } from 'src/types/global';

export default function SoundtrackConfig() {
  const { isSound, backgroundSound, setIsSound, setBackgroundSound } = useConfigStore();

  return (
    <div className="mt-2 rounded-sm border p-2">
      <p className="text-sm font-bold">Sound effect and Background</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex cursor-pointer items-center gap-1" onClick={() => setIsSound()}>
          <IconButton>{isSound ? <Volume2 size={16} /> : <VolumeOff size={16} />}</IconButton>
          <p>{isSound ? 'Mute' : 'Unmute'}</p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-1"
          onClick={() => setBackgroundSound()}
        >
          <IconButton>
            {backgroundSound ? <Volume2 size={16} /> : <VolumeOff size={16} />}
          </IconButton>
          <p>{backgroundSound ? 'Background Mute' : 'Background Unmute'}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button variant="outline" sound={SoundType.CLICK} isSound={true}>
          Click
        </Button>
        <Button sound={SoundType.SUCCESS} isSound={true}>
          Success
        </Button>
        <Button sound={SoundType.MOVE} isSound={true} variant="destructive">
          Move
        </Button>
        <Button sound={SoundType.ERROR} isSound={true}>
          Error
        </Button>
      </div>
    </div>
  );
}
