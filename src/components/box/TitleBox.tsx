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
      <div {...titleProps} className={cn('shrink-0 text-sm font-bold', titleProps?.className)}>
        {title}
      </div>
      <div {...valueProps} className={cn('min-w-0 flex-1', valueProps?.className)}>
        {value}
      </div>
    </div>
  );
}

interface TitleContainerProps extends ComponentProps<'div'> {
  title: string;
  contentProps?: Omit<ComponentProps<'div'>, 'children'>;
}

export function TitleContainer({ title, contentProps, ...props }: TitleContainerProps) {
  return (
    <div {...props} className={cn('rounded-sm border p-2', props.className)}>
      <p className="text-sm font-bold">{title}</p>
      <div
        {...contentProps}
        className={cn('mt-2 flex flex-wrap items-center gap-2', contentProps?.className)}
      >
        {props.children}
      </div>
    </div>
  );
}
