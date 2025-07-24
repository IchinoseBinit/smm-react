// stores/useUploadStore.ts
import { create } from "zustand";
import type { FilesPayload } from "../../types";

interface UploadState {
  files: File[];
  payload: FilesPayload;
  setPayload: (payload: FilesPayload) => void;
  setFiles: (files: File[]) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  files: [],
  payload: { files: [] },
  setPayload: (payload) => set({ payload }),
  setFiles: (files) => set({ files }),
  reset: () => set({ payload: { files: [] } }),
}));
