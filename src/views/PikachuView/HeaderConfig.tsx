'use client';

import { ComponentProps } from 'react';
import { Button } from 'src/components/shadcn-ui/button';
import { cn } from 'src/lib/utils';
import { usePikachuStore } from 'src/states/pikachu.state';

export default function HeaderConfig(props: ComponentProps<'div'>) {
  const {
    metadata: { remainingChanges, round },
    fn: { createBoard, changeBoard },
  } = usePikachuStore();

  return (
    <div {...props} className={cn('flex flex-col items-center gap-2', props.className)}>
      <div className="flex items-center gap-2">
        <p className="font-semibold">{`Round: ${round}`}</p>
        <p className="font-semibold">{`Remaining changes: ${remainingChanges}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={createBoard}>New game</Button>
        <Button variant="outline" onClick={() => changeBoard()}>
          Change board
        </Button>
      </div>
    </div>
  );
}
