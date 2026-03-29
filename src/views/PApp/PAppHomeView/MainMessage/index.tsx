import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

export type SocketMessage = {
  conversationId: number;
  senderId: number;
  message: string;
};

type Props = ComponentProps<'div'> & {
  messages?: SocketMessage[];
};

export default function MainMessage(props: Props) {
  const { messages = [], ...rest } = props;

  return (
    <div {...rest} className={cn('flex flex-col gap-2 overflow-y-auto py-2', props.className)}>
      {messages.length === 0 ? (
        <p className="text-muted-foreground text-sm">No messages yet.</p>
      ) : (
        messages.map((item, index) => {
          return (
            <div key={`${item.conversationId}-${item.senderId}-${index}`} className="text-sm">
              <span className="font-semibold">#{item.senderId}:</span> {item.message}
            </div>
          );
        })
      )}
    </div>
  );
}
