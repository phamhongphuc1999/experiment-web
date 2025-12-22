import { useCallback, useRef } from 'react';

/**
 * Custom hook for playing game sound effects.
 * Caches Audio instances for better performance.
 * @returns Object with sound playing functions
 */
export default function useSoundtrack(): {
  playMove: (isEnabled?: boolean) => void;
  playError: (isEnabled?: boolean) => void;
  playSuccess: (isEnabled?: boolean) => void;
} {
  // Cache Audio instances to avoid recreating them on every call
  const moveAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);

  const playMove = useCallback((isEnabled = true) => {
    if (isEnabled) {
      try {
        if (!moveAudioRef.current) {
          moveAudioRef.current = new Audio('/sounds/move.wav');
        }
        moveAudioRef.current.currentTime = 0; // Reset to start
        moveAudioRef.current.play().catch((err) => {
          console.warn('Failed to play move sound:', err);
        });
      } catch (err) {
        console.warn('Error initializing move sound:', err);
      }
    }
  }, []);

  const playError = useCallback((isEnabled = true) => {
    if (isEnabled) {
      try {
        if (!errorAudioRef.current) {
          errorAudioRef.current = new Audio('/sounds/error.wav');
        }
        errorAudioRef.current.currentTime = 0; // Reset to start
        errorAudioRef.current.play().catch((err) => {
          console.warn('Failed to play error sound:', err);
        });
      } catch (err) {
        console.warn('Error initializing error sound:', err);
      }
    }
  }, []);

  const playSuccess = useCallback((isEnabled = true) => {
    if (isEnabled) {
      try {
        if (!successAudioRef.current) {
          successAudioRef.current = new Audio('/sounds/success.wav');
        }
        successAudioRef.current.currentTime = 0; // Reset to start
        successAudioRef.current.play().catch((err) => {
          console.warn('Failed to play success sound:', err);
        });
      } catch (err) {
        console.warn('Error initializing success sound:', err);
      }
    }
  }, []);

  return { playMove, playError, playSuccess };
}
