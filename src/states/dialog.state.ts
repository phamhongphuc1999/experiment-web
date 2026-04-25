import { DIALOG_KEY } from 'src/configs/constance';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type TDialogStateType = {
  dialog: Partial<Record<DIALOG_KEY, boolean>>;
  setDialog: (id: DIALOG_KEY, isOpen: boolean) => void;
};

export const useDialogStore = create<TDialogStateType, [['zustand/immer', unknown]]>(
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
