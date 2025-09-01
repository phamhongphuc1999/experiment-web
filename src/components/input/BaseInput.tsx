import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';
import { Input } from '../shadcn-ui/input';

interface Props extends ComponentProps<'input'> {
  rootprops?: ComponentProps<'div'>;
  icon?: {
    start?: ReactNode;
    end?: ReactNode;
  };
}

export default function BaseInput(props: Props) {
  const { rootprops, icon } = props;

  return (
    <div {...rootprops} className={cn('input-group inline-block w-full', rootprops?.className)}>
      <div className="absolute top-1/2 left-2.5 -translate-y-1/2">{icon?.start}</div>
      <Input
        {...props}
        className={cn([icon?.start && 'pl-8', icon?.end && 'pr-8', props.className])}
      />
      <div className="absolute top-1/2 right-2.5 -translate-y-1/2">{icon?.end}</div>
      {props.placeholder && <label>{props.placeholder}</label>}
    </div>
  );
}
