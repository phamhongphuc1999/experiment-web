import { ComponentProps } from 'react';
import CaroConfigDialog from 'src/components/AppDialog/CaroConfigDialog';
import CaroConnectionDialog from 'src/components/AppDialog/CaroConnectionDialog';
import CaroInstructionDialog from 'src/components/AppDialog/CaroInstructionDialog';
import CaroMessengerDialog from 'src/components/AppDialog/CaroMessengerDialog';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import useCaroAction from 'src/hooks/caro/useCaroAction';
import useOnlineCaroState from 'src/hooks/caro/useCaroTurnState';
import useShouldDisableBoard from 'src/hooks/caro/useShouldDisableBoard';
import { cn } from 'src/lib/utils';
import { useCaroStore } from 'src/states/caro.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    turn,
    stepsOrder,
    numberOfBlindError,
    metadata: { gameType },
  } = useCaroStore();
  const { playerText, isWin } = useOnlineCaroState();
  const { undo, reset } = useCaroAction();
  const { shouldDisableBoard } = useShouldDisableBoard();

  return (
    <div {...props} className={cn('flex flex-col items-center gap-1', props.className)}>
      <div className="flex items-center gap-2">
        <CaroConfigDialog />
        <CaroInstructionDialog />
        <CaroConnectionDialog />
        <CaroMessengerDialog gameType="caro" />
        <p className={cn('text-xs', turn == 0 && 'text-chart-1', turn == 1 && 'text-chart-2')}>
          {playerText}
        </p>
        {!isWin ? (
          <Button
            size="sm"
            variant="outline"
            className={cn(
              turn == 0 && 'text-chart-1 hover:text-chart-1/50',
              turn == 1 && 'text-chart-2 hover:text-chart-2/50'
            )}
            onClick={undo}
            disabled={stepsOrder.length <= 1 || shouldDisableBoard}
          >
            Undo
          </Button>
        ) : (
          <Button disabled={!isWin} size="sm" onClick={() => reset()}>
            New game
          </Button>
        )}
      </div>
      {gameType == 'blind' && (
        <div className="flex items-center gap-2">
          <TitleBox
            title="Player1"
            value={numberOfBlindError[0]}
            titleProps={{ className: 'text-chart-1' }}
            valueProps={{ className: 'text-destructive' }}
          />
          <TitleBox
            title="Player2"
            value={numberOfBlindError[1]}
            titleProps={{ className: 'text-chart-2' }}
            valueProps={{ className: 'text-destructive' }}
          />
        </div>
      )}
    </div>
  );
}
