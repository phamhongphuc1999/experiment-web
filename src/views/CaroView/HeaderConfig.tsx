import { ComponentProps } from 'react';
import CaroConfigDialog from 'src/components/AppDialog/CaroConfigDialog';
import CaroConnectionDialog from 'src/components/AppDialog/CaroConnectionDialog';
import CaroInstructionDialog from 'src/components/AppDialog/CaroInstructionDialog';
import CaroMessengerDialog from 'src/components/AppDialog/CaroMessengerDialog';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import useCaroAction from 'src/hooks/useCaroAction';
import useOnlineCaroState from 'src/hooks/useCaroTurnState';
import { cn } from 'src/lib/utils';
import { useCaroStore } from 'src/states/caro.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    turn,
    stepsOrder,
    winState,
    metadata: { playMode, gameType },
    numberOfBlindError,
    events: { undo },
  } = useCaroStore();
  const { playerText, isWin } = useOnlineCaroState();
  const { reset } = useCaroAction();

  return (
    <div {...props} className={cn('flex items-center gap-2', props.className)}>
      <CaroConfigDialog />
      <CaroInstructionDialog />
      <CaroConnectionDialog />
      <CaroMessengerDialog />
      <p className={cn('text-xs', turn == 0 && 'text-chart-1', turn == 1 && 'text-chart-2')}>
        {playerText}
      </p>
      {gameType == 'blind' && (
        <TitleBox
          title="error"
          value={numberOfBlindError[turn]}
          titleProps={{ className: 'text-destructive/50' }}
          valueProps={{ className: 'text-destructive' }}
        />
      )}
      {!winState ? (
        <Button
          size="sm"
          variant="outline"
          className={cn(
            turn == 0 && 'text-chart-1 hover:text-chart-1/50',
            turn == 1 && 'text-chart-2 hover:text-chart-2/50',
            playMode == 'online' && 'hidden'
          )}
          onClick={undo}
          disabled={stepsOrder.length == 0}
        >
          Undo
        </Button>
      ) : (
        <Button disabled={!isWin} size="sm" onClick={() => reset()}>
          New game
        </Button>
      )}
    </div>
  );
}
