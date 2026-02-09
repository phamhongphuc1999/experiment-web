import { ComponentProps, PropsWithChildren } from 'react';
import { cn } from 'src/lib/utils';

function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
      {title} <span className="text-sm font-normal text-gray-500">({count})</span>
    </h3>
  );
}

export default function BaseQueue(
  params: PropsWithChildren<{ title: string; count: number; contentprops?: ComponentProps<'div'> }>
) {
  const { title, count, children, contentprops } = params;

  return (
    <div className="flex h-fit max-h-full min-h-0 flex-1 flex-col overflow-hidden border-[0.5px] bg-gray-50/50 py-1.5 dark:bg-gray-900/20">
      <div className="px-1">
        <SectionTitle title={title} count={count} />
      </div>
      <div
        {...contentprops}
        className={cn(
          'scroll-hidden mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto',
          contentprops?.className
        )}
      >
        {children}
      </div>
    </div>
  );
}
