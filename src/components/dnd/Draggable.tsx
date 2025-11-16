'use client';

import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ComponentProps, CSSProperties } from 'react';
import { cn } from 'src/lib/utils';

interface Props extends Omit<ComponentProps<'div'>, 'id'> {
  id: UniqueIdentifier;
}

export default function Draggable({ id, children, ...props }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style: CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      {...props}
      ref={setNodeRef}
      className={cn('cursor-grab', isDragging && 'opacity-50', props.className)}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
