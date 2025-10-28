import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ChatType = 'yourChat' | 'friendChat';
export type GameChatType = 'caro' | 'connect4';

type MessegerStateType = {
  caroChats: Array<{ type: ChatType; message: string }>;
  connect4Chats: Array<{ type: ChatType; message: string }>;
  fn: {
    addChats: (type: ChatType, gameType: GameChatType, message: string) => void;
  };
};

export const useMessengerStore = create<MessegerStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      caroChats: [],
      connect4Chats: [],
      fn: {
        addChats: (type: ChatType, gameType: GameChatType, message: string) => {
          set((state) => {
            if (gameType == 'caro') state.caroChats = [...state.caroChats, { type, message }];
            else if (gameType == 'connect4')
              state.connect4Chats = [...state.connect4Chats, { type, message }];
          });
        },
      },
    };
  })
);

export function useGameMessengerChat(game: GameChatType) {
  const { caroChats, connect4Chats, fn } = useMessengerStore();

  if (game == 'caro')
    return {
      chats: caroChats,
      fn: {
        addChats: (type: ChatType, message: string) => {
          fn.addChats(type, 'caro', message);
        },
      },
    };
  else
    return {
      chats: connect4Chats,
      fn: {
        addChats: (type: ChatType, message: string) => {
          fn.addChats(type, 'connect4', message);
        },
      },
    };
}
