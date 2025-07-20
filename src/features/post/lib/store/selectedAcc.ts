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

type SelectedState = {
  selectedIds: number[];
  toggleId: (id: number) => void;
  setIds: (ids: number[]) => void;
  clear: () => void;
};

export const useSelectedStore = create<SelectedState>((set) => ({
  selectedIds: [],
  toggleId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  setIds: (ids) => set({ selectedIds: ids }),
  clear: () => set({ selectedIds: [] }),
}));
