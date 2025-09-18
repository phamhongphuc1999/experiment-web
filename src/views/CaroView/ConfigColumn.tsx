import { ComponentProps } from 'react';
import CaroConfigDialog from 'src/components/AppDialog/CaroConfigDialog';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { useCaroBoardStore } from 'src/states/caroBoard.state';

export default function ConfigColumn(props: ComponentProps<'div'>) {
  const {
    turn,
    stepsOrder,
    winState,
    events: { undo, reset },
  } = useCaroBoardStore();

  return (
    <div
      {...props}
      className={cn('flex w-[var(--caro-left-config)] flex-col items-end pr-1', props.className)}
    >
      <CaroConfigDialog />
      <TitleBox
        title={winState ? 'Winner' : 'Turn'}
        value={`Player ${turn + 1}`}
        titleProps={{ className: 'text-xs' }}
        valueProps={{
          className: cn('text-sm', turn == 0 && 'text-chart-5', turn == 1 && 'text-chart-2'),
        }}
      />
      {!winState && (
        <Button
          className={cn(
            turn == 0 && 'bg-chart-5 hover:bg-chart-5/50',
            turn == 1 && 'bg-chart-2 hover:bg-chart-2/50'
          )}
          onClick={undo}
          disabled={stepsOrder.length == 0}
        >
          Undo
        </Button>
      )}
      {winState && <Button onClick={reset}>New game</Button>}
    </div>
  );
}
