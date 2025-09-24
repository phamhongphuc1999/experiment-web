import { useCallback } from 'react';
import { useCaroConnectionContext } from 'src/context/caroConnection.context';
import { createCaroMessage } from 'src/services/caro.utils';
import { useCaroStore } from 'src/states/caro.state';

export default function useCaroAction() {
  const {
    events: { move, reset },
  } = useCaroStore();
  const { peer } = useCaroConnectionContext();

  const handleMove = useCallback(
    (location: number) => {
      move(location);
      if (peer) peer.send(createCaroMessage('move', location));
    },
    [move, peer]
  );

  const handleReset = useCallback(
    (turn?: 0 | 1) => {
      reset(turn);
      if (peer) peer.send(createCaroMessage('newGame'));
    },
    [peer, reset]
  );

  return { move: handleMove, reset: handleReset };
}
