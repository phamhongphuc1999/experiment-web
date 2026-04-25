import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TConversationStateType {
  currentConversationId: number | undefined;
  fn: {
    setCurrentConversationId: (currentConversationId: number) => void;
  };
}

export const useConversationStore = create<
  TConversationStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        currentConversationId: undefined,
        fn: {
          setCurrentConversationId: (currentConversationId: number) => {
            set((state) => {
              state.currentConversationId = currentConversationId;
            });
          },
        },
      };
    }),
    {
      name: 'experiment.conversation',
      version: 1.0,
      partialize: (state) => {
        const { fn, ...rest } = state;
        return rest;
      },
    }
  )
);
