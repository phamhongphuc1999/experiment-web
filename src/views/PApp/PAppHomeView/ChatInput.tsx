import { SendHorizonal } from 'lucide-react';
import { ChangeEvent, ComponentProps, KeyboardEvent, useState } from 'react';
import { Input } from 'src/components/shadcn-ui/input';
import { cn } from 'src/lib/utils';

type Props = ComponentProps<'div'> & {
  onSend?: (message: string) => void;
};

export default function ChatInput(props: Props) {
  const [value, setValue] = useState('');

  function onChangeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function trySendMessage() {
    const _value = value.trim();
    if (!_value) return;
    props.onSend?.(_value);
    setValue('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      trySendMessage();
    }
  }

  return (
    <div {...props} className={cn('relative', props.className)}>
      <Input type="text" value={value} onKeyDown={handleKeyDown} onChange={onChangeValue} />
      <SendHorizonal
        size={16}
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        onClick={trySendMessage}
      />
    </div>
  );
}
