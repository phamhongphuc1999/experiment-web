import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';

interface Props {
  title: ReactNode;
  value: ReactNode;
  titleProps?: ComponentProps<'div'>;
  valueProps?: ComponentProps<'div'>;
  className?: string;
}

export default function TitleBox({ title, value, titleProps, className, valueProps }: Props) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div {...titleProps} className={cn('flex-shrink-0 text-sm font-bold', titleProps?.className)}>
        {title}
      </div>
      <div {...valueProps} className={cn('min-w-0 flex-1', valueProps?.className)}>
        {value}
      </div>
    </div>
  );
}
