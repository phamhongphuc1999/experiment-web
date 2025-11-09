'use client';

import { ComponentProps, useCallback } from 'react';
import PikachuConfigDialog from 'src/components/AppDialog/PikachuConfigDialog';
import RoutingGameDialog from 'src/components/AppDialog/RoutingGameDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    metadata: { remainingChanges, round, isChangeBoard, isSound },
    fn: { createBoard, changeBoard, setMetadata },
  } = usePikachuStore();

  const playSuccess = useCallback((isMute = true) => {
    if (isMute) {
      const move = new Audio('/sounds/success.wav');
      move.play();
    }
  }, []);

  function onNewGame() {
    createBoard('newGame');
    playSuccess(isSound);
  }

  function onChangeBoard() {
    changeBoard();
    setMetadata({ isChangeBoard: false });
    playSuccess(isSound);
  }

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <div className="flex items-center gap-2">
        <RoutingGameDialog game="pikachu" />
        <PikachuConfigDialog />
        <p className="font-semibold">{`Round: ${round}`}</p>
        <p className="font-semibold">{`Remaining changes: ${remainingChanges}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onNewGame}>New game</Button>
        {isChangeBoard && (
          <Button variant="outline" onClick={onChangeBoard}>
            Change board
          </Button>
        )}
      </div>
    </div>
  );
}
