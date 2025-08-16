import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

export default function CommonContainer(params: ComponentProps<'div'>) {
  return (
    <div
      {...params}
      className={cn('container mx-auto p-[1rem] md:max-w-[80rem] md:p-5', params.className)}
    >
      {params?.children}
    </div>
  );
}
