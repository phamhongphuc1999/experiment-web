import { ComponentProps } from 'react';
import { Input } from '../shadcn-ui/input';
import { cn } from 'src/lib/utils';

export default function BaseInput(
  props: ComponentProps<'input'> & { rootProps?: ComponentProps<'div'> }
) {
  const { rootProps } = props;

  return (
    <div {...rootProps} className={cn('input-group inline-block w-full', rootProps?.className)}>
      <Input {...props} />
      {props.placeholder && <label>{props.placeholder}</label>}
    </div>
  );
}
