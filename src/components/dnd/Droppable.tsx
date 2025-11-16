'use client';

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

interface Props extends Omit<ComponentProps<'div'>, 'id'> {
  id: UniqueIdentifier;
}

export default function Droppable({ id, children, ...props }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div {...props} className={cn(isOver && 'opacity-50', props.className)} ref={setNodeRef}>
      {children}
    </div>
  );
}
