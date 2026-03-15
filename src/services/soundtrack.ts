import { SoundType } from 'src/types/global';

const sources: Record<SoundType, string> = {
  [SoundType.CLICK]: '/sounds/click.mp3',
  [SoundType.MOVE]: '/sounds/move.mp3',
  [SoundType.SUCCESS]: '/sounds/success.mp3',
  [SoundType.ERROR]: '/sounds/error.mp3',
};

class Soundtrack {
  private cache: Record<SoundType, HTMLAudioElement | null> = {
    [SoundType.CLICK]: null,
    [SoundType.MOVE]: null,
    [SoundType.SUCCESS]: null,
    [SoundType.ERROR]: null,
  };

  private _play(ref: HTMLAudioElement | null, src: string): HTMLAudioElement | null {
    try {
      if (!ref) {
        ref = new Audio(src);
      }
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

  play(type: SoundType, isEnabled = true) {
    if (!isEnabled) return;
    this.cache[type] = this._play(this.cache[type], sources[type]);
  }
}

export const soundtrack = new Soundtrack();
