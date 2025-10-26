import { useMemo } from 'react';
import { useCaroConnectionContext } from 'src/context/caro-connection.context';
import { useCaroStore } from 'src/states/caro.state';

export default function useShouldDisableBoard() {
  const {
    turn,
    metadata: { playMode },
  } = useCaroStore();
  const { role, connectionType } = useCaroConnectionContext();

  const { shouldDisableBoard } = useMemo(() => {
    if (connectionType == 'connected' && playMode == 'online') {
      if (role == 'host' && turn == 0) return { shouldDisableBoard: false };
      else if (role == 'guest' && turn == 1) return { shouldDisableBoard: false };
      else return { shouldDisableBoard: true };
    }
    return { shouldDisableBoard: false };
  }, [connectionType, role, turn, playMode]);

  return { shouldDisableBoard };
}
