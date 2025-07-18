import { create } from "zustand";

type ClearSelectedAccStore = {
  clearSelectedAcc: boolean;
  setClearSelectedAcc: (val: boolean) => void;
};

export const useClearSelectedAccStore = create<ClearSelectedAccStore>(
  (set) => ({
    clearSelectedAcc: false,
    setClearSelectedAcc: (val) => set({ clearSelectedAcc: val }),
  }),
);
