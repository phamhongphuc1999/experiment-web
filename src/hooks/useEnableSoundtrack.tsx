import { useEffect } from 'react';
import { soundtrack } from 'src/services/soundtrack';
import { useConfigStore } from 'src/states/config.state';
import { SoundType } from 'src/types/global';

export default function useEnableSoundtrack() {
  const { backgroundSound } = useConfigStore();

  useEffect(() => {
    if (!backgroundSound) {
      soundtrack.stop(SoundType.BACKGROUND);
      return;
    }

    const startMusic = () => {
      soundtrack.play({ type: SoundType.BACKGROUND, loop: true, volume: 0.4, isEnabled: true });
    };

    document.addEventListener('click', startMusic, { once: true });

    return () => {
      document.removeEventListener('click', startMusic);
    };
  }, [backgroundSound]);

  useEffect(() => {
    const initSound = () => {
      soundtrack.preload();
    };

    window.addEventListener('click', initSound, { once: true });

    return () => {
      window.removeEventListener('click', initSound);
    };
  }, []);
}
