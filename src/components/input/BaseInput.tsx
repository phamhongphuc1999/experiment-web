import { ComponentProps } from 'react';
import { Input } from '../shadcn-ui/input';
import { cn } from 'src/lib/utils';

interface Props extends ComponentProps<'input'> {
  rootprops?: ComponentProps<'div'>;
}

export default function BaseInput(props: Props) {
  const { rootprops } = props;

  return (
    <div {...rootprops} className={cn('input-group inline-block w-full', rootprops?.className)}>
      <Input {...props} />
      {props.placeholder && <label>{props.placeholder}</label>}
    </div>
  );
}
