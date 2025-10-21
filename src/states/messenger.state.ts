import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ChatType = 'yourChat' | 'friendChat';
export type GameChatType = 'caro' | 'connect-four';

type MessegerStateType = {
  caroChats: Array<{ type: ChatType; message: string }>;
  connectFourChats: Array<{ type: ChatType; message: string }>;
  events: {
    addChats: (type: ChatType, gameType: GameChatType, message: string) => void;
  };
};

export const useMessengerStore = create<MessegerStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      caroChats: [],
      connectFourChats: [],
      events: {
        addChats: (type: ChatType, gameType: GameChatType, message: string) => {
          set((state) => {
            if (gameType == 'caro') state.caroChats = [...state.caroChats, { type, message }];
            else if (gameType == 'connect-four')
              state.connectFourChats = [...state.connectFourChats, { type, message }];
          });
        },
      },
    };
  })
);

export function useGameMessengerChat(game: GameChatType) {
  const { caroChats, connectFourChats, events } = useMessengerStore();

  if (game == 'caro')
    return {
      chats: caroChats,
      events: {
        addChats: (type: ChatType, message: string) => {
          events.addChats(type, 'caro', message);
        },
      },
    };
  else
    return {
      chats: connectFourChats,
      events: {
        addChats: (type: ChatType, message: string) => {
          events.addChats(type, 'connect-four', message);
        },
      },
    };
}
