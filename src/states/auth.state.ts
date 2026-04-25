import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TAuthStateType {
  accessToken: string;
  isReady: boolean;
  fn: {
    setAccessToken: (accessToken: string) => void;
    clearAccessToken: () => void;
  };
}

let setStateRef: ((fn: (state: TAuthStateType) => void) => void) | null = null;

export const useAuthStore = create<
  TAuthStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      setStateRef = set;
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
              state.isReady = true;
            });
          },
        },
      };
    }),
    {
      name: 'experiment.auth',
      version: 1.0,
      onRehydrateStorage: () => () => {
        setStateRef?.((state) => {
          state.isReady = true;
        });
      },
      partialize: (state) => {
        const { fn, ...rest } = state;
        return rest;
      },
    }
  )
);
