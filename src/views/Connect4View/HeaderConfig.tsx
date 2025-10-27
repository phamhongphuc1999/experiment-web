/* eslint-disable quotes */
import { ComponentProps } from 'react';
import Connect4ConfigDialog from 'src/components/AppDialog/Connect4ConfigDialog';
import Connect4InstructionDialog from 'src/components/AppDialog/Connect4InstructionDialog';
import { cn } from 'src/lib/utils';
import { useConnect4Store } from 'src/states/connect4.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const { turn } = useConnect4Store();

  return (
    <div {...props} className={cn('flex flex-col items-center gap-1', props.className)}>
      <div className="flex items-center gap-2">
        <Connect4ConfigDialog />
        <Connect4InstructionDialog />
        <p className={cn('text-xs', turn == 0 && 'text-chart-1', turn == 1 && 'text-chart-2')}>
          {turn == 0 ? "Player 1's turn" : "Player 2's turn"}
        </p>
      </div>
    </div>
  );
}
