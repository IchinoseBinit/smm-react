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
  forceReset: () => void;
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
  clear: () => {
    // Immediate clearing with multiple approaches for production reliability
    set({ selectedIds: [] });
    
    // Force a second clear after a microtask to ensure persistence
    setTimeout(() => {
      set({ selectedIds: [] });
    }, 0);
  },
  forceReset: () => {
    // Nuclear option for production environments
    set({ selectedIds: [] });
    
    // Force multiple clears with different timing
    setTimeout(() => set({ selectedIds: [] }), 0);
    setTimeout(() => set({ selectedIds: [] }), 10);
    setTimeout(() => set({ selectedIds: [] }), 50);
  },
}));
