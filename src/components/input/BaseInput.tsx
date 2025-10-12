import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';
import { Input } from '../shadcn-ui/input';

interface Props extends ComponentProps<'input'> {
  name: string;
  rootprops?: ComponentProps<'div'>;
  icon?: {
    start?: ReactNode;
    end?: ReactNode;
  };
}

export default function BaseInput({ name, rootprops, icon, ...props }: Props) {
  return (
    <div {...rootprops} className={cn('input-group inline-block w-full', rootprops?.className)}>
      {icon?.start && (
        <div className="absolute top-1/2 left-2.5 -translate-y-1/2">{icon.start}</div>
      )}
      <Input
        {...props}
        name={name}
        id={name}
        className={cn([icon?.start && 'pl-8', icon?.end && 'pr-8', props.className])}
      />
      {props.placeholder && <label htmlFor={name}>{props.placeholder}</label>}
      {icon?.end && <div className="absolute top-1/2 right-2.5 -translate-y-1/2">{icon.end}</div>}
    </div>
  );
}
