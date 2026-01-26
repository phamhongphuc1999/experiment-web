import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';
import { Input } from '../shadcn-ui/input';

interface Props extends ComponentProps<'input'> {
  name: string;
  error?: string;
  rootprops?: ComponentProps<'div'>;
  icon?: {
    start?: ReactNode;
    end?: ReactNode;
  };
}

export default function BaseInput({ name, error, rootprops, icon, ...props }: Props) {
  return (
    <div>
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
      {error && <p className="text-xs font-semibold text-red-400">{error}</p>}
    </div>
  );
}

export function TitleBaseInput({
  titleInput,
  name,
  rootprops,
  inputprops,
  titleProps,
  icon,
  ...props
}: Props & {
  titleInput: string;
  inputprops?: ComponentProps<'div'>;
  titleProps?: ComponentProps<'p'>;
}) {
  return (
    <div {...rootprops} className={cn('flex items-center gap-2', rootprops)}>
      <p {...titleProps}>{titleInput}</p>
      <BaseInput {...props} name={name} rootprops={inputprops} icon={icon} />
    </div>
  );
}
