import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

interface Props {
  title?: string;
  rootprops?: ComponentProps<'div'>;
}

export function ListEmpty({ title, rootprops }: Props) {
  return (
    <div
      {...rootprops}
      className={cn(
        'text-muted-foreground flex h-20 items-center justify-center rounded-lg border border-dashed',
        rootprops?.className
      )}
    >
      {title}
    </div>
  );
}
