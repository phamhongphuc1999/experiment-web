import { ComponentProps } from 'react';
import Connect4ConfigDialog from 'src/components/AppDialog/Connect4ConfigDialog';
import Connect4InstructionDialog from 'src/components/AppDialog/Connect4InstructionDialog';
import RoutingGameDialog from 'src/components/AppDialog/RoutingGameDialog';
import { Button } from 'src/components/shadcn-ui/button';
import { useConnect4StateContext } from 'src/context/connect4-state.context';
import { cn } from 'src/lib/utils';
import { useConnect4Store } from 'src/states/connect4.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const { turn, stepsOrder } = useConnect4Store();
  const {
    playerText,
    isWin,
    fn: { undo, reset },
  } = useConnect4StateContext();

  return (
    <div {...props} className={cn('flex flex-col items-center gap-1', props.className)}>
      <div className="flex items-center gap-2">
        <RoutingGameDialog game="connect4" />
        <Connect4ConfigDialog />
        <Connect4InstructionDialog />
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
            disabled={stepsOrder.length <= 1}
          >
            Undo
          </Button>
        ) : (
          <Button disabled={!isWin} size="sm" onClick={() => reset()}>
            New game
          </Button>
        )}
      </div>
    </div>
  );
}
