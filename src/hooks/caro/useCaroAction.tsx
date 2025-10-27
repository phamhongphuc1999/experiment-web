import { useCallback } from 'react';
import { useCaroConnectionContext } from 'src/context/caro-connection.context';
import { TurnType } from 'src/global';
import { createCaroMessage } from 'src/services/caro.utils';
import { useCaroStore } from 'src/states/caro.state';

export default function useCaroAction() {
  const {
    events: { move, undo, reset },
  } = useCaroStore();
  const { peer } = useCaroConnectionContext();

  const handleMove = useCallback(
    (location: number) => {
      move(location);
      if (peer) peer.send(createCaroMessage('move', location));
    },
    [move, peer]
  );

  const handleUndo = useCallback(() => {
    undo();
    if (peer) peer.send(createCaroMessage('undo'));
  }, [peer, undo]);

  const handleReset = useCallback(
    (turn?: TurnType) => {
      reset(turn);
      if (peer) peer.send(createCaroMessage('newGame'));
    },
    [peer, reset]
  );

  return { move: handleMove, undo: handleUndo, reset: handleReset };
}
