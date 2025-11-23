'use client';

import { ComponentProps, Dispatch, SetStateAction } from 'react';
import PikachuConfigDialog from 'src/components/AppDialog/PikachuConfigDialog';
import PikachuInstructionDialog from 'src/components/AppDialog/PikachuInstructionDialog';
import RoutingGameDialog from 'src/components/AppDialog/RoutingGameDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { pikachuTransformConfig } from 'src/configs/constance';
import { usePikachuStateContext } from 'src/context/pikachu-state.context';
import useSoundtrack from 'src/hooks/useSoundtrack';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';

interface Props extends ComponentProps<'div'> {
  hintCountdown: number;
  setHintCountdown: Dispatch<SetStateAction<number>>;
  setShowHint: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderConfig({
  hintCountdown,
  setHintCountdown,
  setShowHint,
  ...props
}: Props) {
  const {
    metadata: {
      remainingChanges,
      round,
      isSound,
      status,
      maxRemainingTime,
      roundList,
      timeConfigType,
      randomRoundListIndex,
      gameType,
    },
    fn: { createBoard, changeBoard, setMetadata },
  } = usePikachuStore();
  const {
    remainingTime,
    fn: { setRemainingTime },
  } = usePikachuStateContext();
  const { playSuccess } = useSoundtrack();

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
        {gameType != 'randomBoard' ? (
          <span>
            Round: {round} ({pikachuTransformConfig[roundList[round - 1]].title})
          </span>
        ) : (
          <span>
            Type: {pikachuTransformConfig[roundList[randomRoundListIndex]]?.title || '--'}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <RoutingGameDialog game="pikachu" />
        <PikachuConfigDialog />
        <PikachuInstructionDialog />
        <p className="font-semibold">{`Changes: ${remainingChanges}`}</p>
        {timeConfigType != 'off' && <p className="font-semibold">{`Time: ${remainingTime}s`}</p>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={onNewGame}>New game</Button>
        <Button variant="outline" onClick={onChangeBoard}>
          Change board
        </Button>
        <Button
          className="w-16.5"
          disabled={hintCountdown > 0}
          onClick={() => {
            setShowHint(true);
            setHintCountdown(20);
          }}
        >
          {hintCountdown > 0 ? hintCountdown : 'Hint'}
        </Button>
        {timeConfigType != 'off' && (
          <Button variant="secondary" onClick={onPauseGame}>
            {status == 'paused' ? 'Resume' : 'Pause'}
          </Button>
        )}
      </div>
    </div>
  );
}
