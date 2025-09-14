import { ThemeType } from 'src/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type WordConfigStateType = {
  revealPerWord: number;
  isFillFromScratch: boolean;
};

interface ConfigStateType extends WordConfigStateType {
  theme: ThemeType;
  setTheme: () => void;
  setRevealPerWord: (revealPerWord: number) => void;
  setIsFillFromScratch: (isFillFromScratch: boolean) => void;
}

export const defaultWordConfig: WordConfigStateType = {
  revealPerWord: 2,
  isFillFromScratch: true,
};

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
        revealPerWord: defaultWordConfig.revealPerWord,
        setRevealPerWord: (revealPerWord) => {
          set((state) => {
            state.revealPerWord = revealPerWord;
          });
        },
        isFillFromScratch: defaultWordConfig.isFillFromScratch,
        setIsFillFromScratch: (isFillFromScratch) => {
          set((state) => {
            state.isFillFromScratch = isFillFromScratch;
          });
        },
      };
    }),
    {
      name: 'experiment.config',
      version: 1.0,
      migrate(persistedState, version) {
        if (version < 1.0) {
          return {
            ...(persistedState as ConfigStateType),
          };
        }
        return persistedState;
      },
    }
  )
);
