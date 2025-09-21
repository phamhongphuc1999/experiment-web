import { ComponentProps } from 'react';
import CaroConfigDialog from 'src/components/AppDialog/CaroConfigDialog';
import CaroConnectionDialog from 'src/components/AppDialog/CaroConnectionDialog';
import CaroMessengerDialog from 'src/components/AppDialog/CaroMessengerDialog';
import TitleBox from 'src/components/box/TitleBox';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { useCaroStore } from 'src/states/caro.state';

export default function ConfigColumn(props: ComponentProps<'div'>) {
  const {
    turn,
    stepsOrder,
    winState,
    events: { undo, reset },
  } = useCaroStore();

  return (
    <div
      {...props}
      className={cn('flex w-[var(--caro-left-config)] flex-col items-end pr-1', props.className)}
    >
      <div className="flex items-center gap-2">
        <CaroConfigDialog />
        <CaroConnectionDialog />
        <CaroMessengerDialog />
      </div>
      <TitleBox
        title={winState ? 'Winner' : 'Turn'}
        value={`Player ${turn + 1}`}
        titleProps={{ className: 'text-xs' }}
        valueProps={{
          className: cn('text-sm', turn == 0 && 'text-chart-5', turn == 1 && 'text-chart-2'),
        }}
        className="mt-2"
      />
      {!winState && (
        <Button
          className={cn(
            'mt-2',
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
