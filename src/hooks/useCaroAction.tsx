import { useCallback } from 'react';
import { useCaroConnectionContext } from 'src/context/caroConnection.context';
import { createCaroMessage } from 'src/services/caro.utils';
import { useCaroStore } from 'src/states/caro.state';

export default function useCaroAction() {
  const {
    events: { move },
  } = useCaroStore();
  const { peer } = useCaroConnectionContext();

  const handleMove = useCallback(
    (location: number) => {
      move(location);
      if (peer) peer.send(createCaroMessage('step', location));
    },
    [move, peer]
  );

  return { move: handleMove };
}
