import { ComponentProps } from 'react';
import { cn } from 'src/lib/utils';

export type TSocketMessage = {
  conversationId: number;
  senderId: number;
  message: string;
};

type TProps = ComponentProps<'div'> & {
  messages?: TSocketMessage[];
};

export default function MainMessage(props: TProps) {
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
