class Soundtrack {
  private moveAudio: HTMLAudioElement | null = null;
  private errorAudio: HTMLAudioElement | null = null;
  private successAudio: HTMLAudioElement | null = null;

  private play(ref: HTMLAudioElement | null, src: string): HTMLAudioElement | null {
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

  playMove(isEnabled = true) {
    if (!isEnabled) return;
    this.moveAudio = this.play(this.moveAudio, '/sounds/move.wav');
  }

  playError(isEnabled = true) {
    if (!isEnabled) return;
    this.errorAudio = this.play(this.errorAudio, '/sounds/error.wav');
  }

  playSuccess(isEnabled = true) {
    if (!isEnabled) return;
    this.successAudio = this.play(this.successAudio, '/sounds/success.wav');
  }
}

export const soundtrack = new Soundtrack();
