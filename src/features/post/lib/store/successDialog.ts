// lib/store/successDialog.store.ts
import { create } from "zustand";

interface SuccessDialogState {
  isOpen: boolean;
  status: "posted" | "scheduled";
  platform?: string;
  time?: string;
  openDialog: (args: {
    status: "posted" | "scheduled";
    platform?: string;
    time?: string;
  }) => void;
  closeDialog: () => void;
}

export const useSuccessDialogStore = create<SuccessDialogState>((set) => ({
  isOpen: false,
  status: "posted",
  platform: undefined,
  time: undefined,

  openDialog: ({ status, platform, time }) =>
    set({ isOpen: true, status, platform, time }),

  closeDialog: () =>
    set({ isOpen: false, platform: undefined, time: undefined }),
}));
