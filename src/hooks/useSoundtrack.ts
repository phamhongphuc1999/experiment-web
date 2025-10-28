import { useCallback } from 'react';

export default function useSoundtrack() {
  const playMove = useCallback((isMute = true) => {
    if (isMute) {
      const move = new Audio('/sounds/move.wav');
      move.play();
    }
  }, []);

  const playError = useCallback((isMute = true) => {
    if (isMute) {
      const error = new Audio('/sounds/error.wav');
      error.play();
    }
  }, []);

  return { playMove, playError };
}
