'use client';

import { ComponentProps } from 'react';
import PikachuConfigDialog from 'src/components/AppDialog/PikachuConfigDialog';
import PikachuInstructionDialog from 'src/components/AppDialog/PikachuInstructionDialog';
import RoutingGameDialog from 'src/components/AppDialog/RoutingGameDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { pikachuTransformConfig } from 'src/configs/pikachu.constance';
import { cn } from 'src/lib/utils';
import { soundtrack } from 'src/services/soundtrack';
import { usePikachuStateMachine } from 'src/state-machine/pikachu.state-machine';
import { usePikachuStore } from 'src/states/pikachu.state';
import { PikachuMachineEvent } from 'src/types/pikachu.type';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    metadata: { round, isSound, roundList, randomRoundListIndex, gameType },
  } = usePikachuStore();
  const { send, state } = usePikachuStateMachine();
  const { hintRunning } = state.context;

  function onNewGame() {
    send({ type: PikachuMachineEvent.CREATE, mode: 'newGame' });
    soundtrack.playSuccess(isSound);
  }

  function onChangeBoard() {
    send({ type: PikachuMachineEvent.CHANGE });
    soundtrack.playSuccess(isSound);
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
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={onNewGame}>New game</Button>
        <Button variant="outline" onClick={onChangeBoard}>
          Change board
        </Button>
        <Button
          disabled={hintRunning}
          onClick={() => {
            send({ type: PikachuMachineEvent.SHOW_HINT });
          }}
        >
          Hint
        </Button>
      </div>
    </div>
  );
}
