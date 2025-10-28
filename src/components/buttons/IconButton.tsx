import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

export default function IconButton(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'inline-flex aspect-square cursor-pointer items-center justify-center rounded-[50%] p-1.5 hover:bg-[#0000000f] dark:hover:bg-[#ffffff0f]',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
