import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthStateType {
  accessToken: string;
  isReady: boolean;
  fn: {
    setAccessToken: (accessToken: string) => void;
    clearAccessToken: () => void;
  };
}

export const useAuthStore = create<
  AuthStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        accessToken: '',
        isReady: false,
        fn: {
          setAccessToken: (accessToken) => {
            set((state) => {
              state.accessToken = accessToken;
              state.isReady = true;
            });
          },
          clearAccessToken: () => {
            set((state) => {
              state.accessToken = '';
              state.isReady = false;
            });
          },
        },
      };
    }),
    {
      name: 'experiment.auth',
      version: 1.0,
      partialize: (state) => {
        const { fn, ...rest } = state;
        return rest;
      },
    }
  )
);
