import { ThemeType } from 'src/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type WordConfigStateType = {
  revealPerWord: number;
  isFillFromScratch: boolean;
  learnMode: 'normal' | 'countdown';
  learnPerWord: number;
};

interface ConfigStateType extends WordConfigStateType {
  theme: ThemeType;
  setTheme: () => void;
  setRevealPerWord: (revealPerWord: number) => void;
  setIsFillFromScratch: (isFillFromScratch: boolean) => void;
  setLearnMode: (learnMode: 'normal' | 'countdown') => void;
  setLearnPerWord: (learnPerWord: number) => void;
}

export const defaultWordConfig: WordConfigStateType = {
  revealPerWord: 2,
  isFillFromScratch: true,
  learnMode: 'normal',
  learnPerWord: 5,
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
        learnMode: defaultWordConfig.learnMode,
        setLearnMode: (learnMode) => {
          set((state) => {
            state.learnMode = learnMode;
          });
        },
        learnPerWord: defaultWordConfig.learnPerWord,
        setLearnPerWord: (learnPerWord) => {
          set((state) => {
            state.learnPerWord = learnPerWord;
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
      partialize: (state) => {
        return {
          theme: state.theme,
          revealPerWord: state.revealPerWord,
          isFillFromScratch: state.isFillFromScratch,
          learnMode: state.learnMode,
          learnPerWord: state.learnPerWord,
        };
      },
    }
  )
);
