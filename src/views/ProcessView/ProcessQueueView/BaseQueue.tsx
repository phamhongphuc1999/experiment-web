import { ComponentProps, PropsWithChildren } from 'react';
import { cn } from 'src/lib/utils';
import SectionTitle from './SectionTitle';

export default function BaseQueue(
  params: PropsWithChildren<{ title: string; count: number; contentprops?: ComponentProps<'div'> }>
) {
  const { title, count, children, contentprops } = params;

  return (
    <div className="flex h-fit max-h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-gray-50/50 p-2 dark:bg-gray-900/20">
      <SectionTitle title={title} count={count} />
      <div
        {...contentprops}
        className={cn(
          'scroll-hidden flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto',
          contentprops?.className
        )}
      >
        {children}
      </div>
    </div>
  );
}
