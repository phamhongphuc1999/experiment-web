import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

export default function MainMessage(props: ComponentProps<'div'>) {
  return <div {...props} className={cn('py-2', props.className)}></div>;
}
