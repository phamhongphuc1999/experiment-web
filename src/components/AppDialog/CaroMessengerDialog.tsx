import { Messenger, Send } from 'iconsax-reactjs';
import { useEffect, useRef, useState } from 'react';
import { beVietnamPro } from 'src/configs/font-family';
import { useCaroConnectionContext } from 'src/context/caroConnection.context';
import { cn } from 'src/lib/utils';
import { createCaroMessage } from 'src/services/caro.utils';
import { useCaroMessageStore } from 'src/states/caroMessage.state';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';
import { Textarea } from '../shadcn-ui/textarea';

export default function CaroMessengerDialog() {
  const { peer } = useCaroConnectionContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {
    chats,
    events: { addChats },
  } = useCaroMessageStore();
  const [message, setMessage] = useState('');

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && message.trim() !== '' && !e.shiftKey) {
      e.preventDefault();
      addChats('yourChat', message);
      if (peer) {
        peer.send(createCaroMessage('chat', message));
      }
      setMessage('');
    }
  }

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [chats]);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Messenger size={16} />
      </DialogTrigger>
      <DialogContent className="flex h-3/4 flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>Messenger</DialogTitle>
        </DialogHeader>
        <div className="flex h-[calc(100%-20px)] flex-col gap-4">
          <div ref={messagesEndRef} className="scroll-hidden flex-1 overflow-y-scroll">
            {chats.map((chat, index) => {
              if (chat.type == 'yourChat')
                return (
                  <div key={index} className="relative mt-4 ml-4 flex justify-end">
                    <div className="absolute -top-2 right-0 text-[8px]">you</div>
                    <div className={cn('bg-secondary rounded-sm p-1', beVietnamPro.className)}>
                      {chat.message}
                    </div>
                  </div>
                );
              else
                return (
                  <div key={index} className="relative mt-4 mr-4 flex">
                    <div className="absolute -top-2 text-[8px]">friend</div>
                    <div className={cn('bg-sidebar-ring rounded-sm p-1', beVietnamPro.className)}>
                      {chat.message}
                    </div>
                  </div>
                );
            })}
          </div>
          <div className="relative">
            <Textarea
              placeholder="Enter your message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(beVietnamPro.className, 'font-sans')}
              rows={1}
            />
            <Send className="absolute top-2 right-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
