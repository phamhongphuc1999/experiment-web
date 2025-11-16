'use client';

import { ComponentProps, useCallback } from 'react';
import PikachuConfigDialog from 'src/components/AppDialog/PikachuConfigDialog';
import PikachuInstructionDialog from 'src/components/AppDialog/PikachuInstructionDialog';
import RoutingGameDialog from 'src/components/AppDialog/RoutingGameDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { pikachuTransformConfig } from 'src/configs/constance';
import { usePikachuStateContext } from 'src/context/pikachu-state.context';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    metadata: { remainingChanges, round, isSound, status, maxRemainingTime, roundList },
    fn: { createBoard, changeBoard, setMetadata },
  } = usePikachuStore();
  const {
    remainingTime,
    fn: { setRemainingTime },
  } = usePikachuStateContext();

  const playSuccess = useCallback((isMute = true) => {
    if (isMute) {
      const move = new Audio('/sounds/success.wav');
      move.play();
    }
  }, []);

  function onNewGame() {
    createBoard('newGame');
    playSuccess(isSound);
    setRemainingTime(() => maxRemainingTime);
  }

  function onChangeBoard() {
    changeBoard();
    setMetadata({ isChangeBoard: false });
    playSuccess(isSound);
  }

  function onPauseGame() {
    if (status == 'playing') setMetadata({ status: 'paused' });
    else setMetadata({ status: 'playing' });
  }

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <div className="flex items-center gap-2">
        <span>
          Round: {round} ({pikachuTransformConfig[roundList[round - 1]].title})
        </span>
      </div>
      <div className="flex items-center gap-2">
        <RoutingGameDialog game="pikachu" />
        <PikachuConfigDialog />
        <PikachuInstructionDialog />
        <p className="font-semibold">{`Changes: ${remainingChanges}`}</p>
        <p className="font-semibold">{`Time: ${remainingTime}s`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onNewGame}>New game</Button>
        <Button variant="outline" onClick={onChangeBoard}>
          Change board
        </Button>
        <Button variant="secondary" onClick={onPauseGame}>
          {status == 'paused' ? 'Resume' : 'Pause'}
        </Button>
      </div>
    </div>
  );
}
