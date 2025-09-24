import { useMemo } from 'react';
import { useCaroConnectionContext } from 'src/context/caroConnection.context';
import { useCaroStore } from 'src/states/caro.state';

export default function useOnlineCaroState() {
  const {
    turn,
    winState,
    metadata: { playMode },
  } = useCaroStore();
  const { role, connectionType } = useCaroConnectionContext();

  const { playerTitle, playerName } = useMemo(() => {
    let playerTitle = 'Turn';
    if (winState) playerTitle = 'Winner';
    let playerName = '';
    if (playMode == 'online' && connectionType == 'connected') {
      if (role == 'host') {
        if (turn == 0) playerName = 'You';
        else playerName = 'Opponent';
      } else {
        if (turn == 0) playerName = 'Opponent';
        else playerName = 'You';
      }
    } else playerName = `Player ${turn + 1}`;

    return { playerTitle, playerName };
  }, [connectionType, playMode, role, turn, winState]);

  return { playerTitle, playerName };
}
