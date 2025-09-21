import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ChatType = 'yourChat' | 'friendChat';

type CaroMessageStateType = {
  chats: Array<{ type: ChatType; message: string }>;
  events: {
    addChats: (type: ChatType, message: string) => void;
  };
};

export const useCaroMessageStore = create<CaroMessageStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      chats: [],
      events: {
        addChats: (type: ChatType, message: string) => {
          set((state) => {
            state.chats = [...state.chats, { type, message }];
          });
        },
      },
    };
  })
);
