import { ThemeType } from 'src/types/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ConfigStateType {
  theme: ThemeType;
  setTheme: () => void;
}

export const useConfigStore = create<
  ConfigStateType,
  [['zustand/persist', unknown], ['zustand/immer', unknown]]
>(
  persist(
    immer((set) => {
      return {
        theme: 'dark',
        setTheme: () => {
          set((state) => {
            state.theme = state.theme == 'dark' ? 'light' : 'dark';
          });
        },
      };
    }),
    {
      name: 'experiment.config',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return { ...(persistedState as ConfigStateType) };
        }
        return persistedState;
      },
      partialize: (state) => {
        return {
          theme: state.theme,
        };
      },
    }
  )
);
