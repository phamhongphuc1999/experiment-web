import { useConfigStore } from 'src/states/config.state';
import { SoundConfigType, SoundType } from 'src/types/global';

const sources: Record<SoundType, string> = {
  [SoundType.CLICK]: '/sounds/click.mp3',
  [SoundType.MOVE]: '/sounds/move.mp3',
  [SoundType.SUCCESS]: '/sounds/success.mp3',
  [SoundType.ERROR]: '/sounds/error.mp3',
  [SoundType.BACKGROUND]: '/sounds/background.mp3',
};

class Soundtrack {
  private cache: Record<SoundType, HTMLAudioElement | null> = {
    [SoundType.CLICK]: null,
    [SoundType.MOVE]: null,
    [SoundType.SUCCESS]: null,
    [SoundType.ERROR]: null,
    [SoundType.BACKGROUND]: null,
  };

  private createAudio(config: SoundConfigType) {
    const { type, loop = false, volume } = config;
    const audio = this.cache[type] ?? new Audio(sources[type]);

    audio.loop = loop;
    if (volume != undefined) audio.volume = volume;
    return audio;
  }

  preload() {
    Object.values(SoundType).forEach((type) => {
      const audio = new Audio(sources[type]);
      audio.preload = 'auto';
      audio.load();
      this.cache[type] = audio;
    });
  }

  private _play(ref: HTMLAudioElement | null, config: SoundConfigType): HTMLAudioElement | null {
    try {
      if (!ref) ref = this.createAudio(config);
      ref.currentTime = 0;
      ref.play().catch((err) => {
        console.warn('Failed to play sound:', err);
      });
      return ref;
    } catch (err) {
      console.warn('Error initializing sound:', err);
      return ref;
    }
  }

  play(option: SoundConfigType) {
    const { isEnabled = useConfigStore.getState().isSound, ...rest } = option;
    if (!isEnabled) return;
    this.cache[rest.type] = this._play(this.cache[rest.type], rest);
  }

  stop(type: SoundType) {
    const audio = this.cache[type];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

export const soundtrack = new Soundtrack();
