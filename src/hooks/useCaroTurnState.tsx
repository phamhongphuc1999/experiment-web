/* eslint-disable quotes */
import { useMemo } from 'react';
import { useCaroConnectionContext } from 'src/context/caroConnection.context';
import { useCaroStore } from 'src/states/caro.state';

export default function useOnlineCaroState() {
  const {
    turn,
    winState,
    isBlindForceOver,
    metadata: { playMode },
  } = useCaroStore();
  const { role, connectionType } = useCaroConnectionContext();

  const isOverWin = Boolean(winState) || isBlindForceOver;

  const { playerText, isWin } = useMemo(() => {
    let playerTitle = "'s turn";
    if (isOverWin) playerTitle = ' win';
    let playerName = '';
    let _isWin = false;
    if (playMode == 'online' && connectionType == 'connected') {
      if (role == 'host') {
        if (turn == 0) {
          playerName = 'You';
          _isWin = true;
        } else playerName = 'Opponent';
      } else {
        if (turn == 0) playerName = 'Opponent';
        else {
          playerName = 'You';
          _isWin = true;
        }
      }
    } else {
      playerName = `Player ${turn + 1}`;
      _isWin = true;
    }

    return { playerText: `${playerName}${playerTitle}`, isWin: _isWin && isOverWin };
  }, [connectionType, playMode, role, turn, isOverWin]);

  return { playerText, isWin };
}
