import { EmptyWalletRemove, IconProps } from 'iconsax-reactjs';
import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

interface Props extends ComponentProps<'div'> {
  title?: string;
  iconProps?: IconProps;
}

export default function EmptyBox({ title = 'No data', iconProps, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto flex w-full flex-col items-center justify-center gap-4',
        props.className
      )}
    >
      <EmptyWalletRemove {...iconProps} className={cn('size-16', iconProps?.className)} />
      <p className="text-center">{title}</p>
    </div>
  );
}
