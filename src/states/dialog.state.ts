import { DIALOG_KEY } from 'src/configs/constance';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type DialogStateType = {
  dialog: Partial<{ [id in DIALOG_KEY]: boolean }>;
  setDialog: (id: DIALOG_KEY, isOpen: boolean) => void;
};

export const useDialogStore = create<DialogStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      dialog: {},
      setDialog: (id: DIALOG_KEY, isOpen: boolean) => {
        set((state) => {
          state.dialog = { ...state.dialog, [id]: isOpen };
        });
      },
    };
  })
);
