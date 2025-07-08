// stores/useUploadStore.ts
import { create } from "zustand";
import type { FilesPayload } from "../../types";

interface UploadState {
  payload: FilesPayload;
  setPayload: (payload: FilesPayload) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  payload: { files: [] },
  setPayload: (payload) => set({ payload }),
  reset: () => set({ payload: { files: [] } }),
}));
