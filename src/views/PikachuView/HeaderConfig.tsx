'use client';

import { ComponentProps } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    metadata: { remainingChanges, round },
    fn: { createBoard },
  } = usePikachuStore();

  return (
    <div {...props} className={cn('flex items-center gap-2', props.className)}>
      <p className="font-semibold">{`Round: ${round}`}</p>
      <p className="font-semibold">{`Remaining changes: ${remainingChanges}`}</p>
      <Button onClick={createBoard}>New game</Button>
    </div>
  );
}
