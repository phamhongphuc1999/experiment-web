/* eslint-disable quotes */
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

  const { playerText, isWin } = useMemo(() => {
    let playerTitle = "'s turn";
    if (winState) playerTitle = ' win';
    let playerName = '';
    let isWin = false;
    if (playMode == 'online' && connectionType == 'connected') {
      if (role == 'host') {
        if (turn == 0) {
          playerName = 'You';
          isWin = true;
        } else playerName = 'Opponent';
      } else {
        if (turn == 0) playerName = 'Opponent';
        else {
          playerName = 'You';
          isWin = true;
        }
      }
    } else {
      playerName = `Player ${turn + 1}`;
      isWin = true;
    }

    return { playerText: `${playerName}${playerTitle}`, isWin: isWin && Boolean(winState) };
  }, [connectionType, playMode, role, turn, winState]);

  return { playerText, isWin };
}
