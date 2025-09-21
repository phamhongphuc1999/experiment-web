import { Messenger } from 'iconsax-reactjs';
import { useEffect, useRef, useState } from 'react';
import { useCaroMessageStore } from 'src/states/caroMessage.state';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';
import { Input } from '../shadcn-ui/input';

export default function CaroMessengerDialog() {
  // const { peer } = useCaroConnectionContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {
    chats,
    events: { addChats },
  } = useCaroMessageStore();
  const [message, setMessage] = useState('');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && message.trim() !== '') {
      addChats('yourChat', message);
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
                  <div key={index} className="mt-2 flex justify-end">
                    <div className="bg-secondary rounded-sm p-1">{chat.message}</div>
                  </div>
                );
              else
                return (
                  <div key={index} className="relative mt-4 flex">
                    <div className="absolute -top-2 text-[8px]">friend</div>
                    <div className="bg-sidebar-ring rounded-sm p-1">{chat.message}</div>
                  </div>
                );
            })}
          </div>
          <Input
            placeholder="Enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
