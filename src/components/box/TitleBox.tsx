import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';

interface Props extends ComponentProps<'div'> {
  title: string;
  value: ReactNode;
  titleProps?: ComponentProps<'div'>;
  valueProps?: ComponentProps<'div'>;
}

export default function TitleBox({ title, value, titleProps, valueProps, ...props }: Props) {
  return (
    <div {...props} className={cn('flex items-center gap-2', props.className)}>
      <div {...titleProps} className={cn('text-lg font-bold', titleProps?.className)}>
        {title}
      </div>
      <div {...valueProps}>{value}</div>
    </div>
  );
}
