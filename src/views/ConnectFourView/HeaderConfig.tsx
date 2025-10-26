import { ComponentProps } from 'react';
import ConnectFourInstructionDialog from 'src/components/AppDialog/ConnectFourInstructionDialog';
import { cn } from 'src/lib/utils';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('flex flex-col items-center gap-1', props.className)}>
      <ConnectFourInstructionDialog />
    </div>
  );
}
