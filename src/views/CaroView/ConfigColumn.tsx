import { ComponentProps } from 'react';
import CaroConfigDialog from 'src/components/AppDialog/CaroConfigDialog';
import TitleBox from 'src/components/box/TitleBox';
import { cn } from 'src/lib/utils';
import { useCaroBoardStore } from 'src/states/caroBoard.state';

export default function ConfigColumn(props: ComponentProps<'div'>) {
  const { turn } = useCaroBoardStore();

  return (
    <div
      {...props}
      className={cn('flex w-[var(--caro-left-config)] flex-col items-end pr-1', props.className)}
    >
      <CaroConfigDialog />
      <TitleBox
        title="Turn"
        value={`Player ${turn + 1}`}
        titleProps={{ className: 'text-xs' }}
        valueProps={{ className: 'text-sm' }}
      />
    </div>
  );
}
