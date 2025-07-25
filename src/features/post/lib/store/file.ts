// stores/useUploadStore.ts
import { create } from "zustand";
import type { FilesPayload } from "../../types";

interface UploadState {
  files: File[];
  hasVideos: boolean;
  payload: FilesPayload;
  setPayload: (payload: FilesPayload) => void;
  setHasVideos: (hasMultipleVideos: boolean) => void;
  setFiles: (files: File[]) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  files: [],
  videoFileCounts: 0,
  hasVideos: false,
  payload: { files: [] },
  setPayload: (payload) => set({ payload }),
  setHasVideos: (hasVideos) => set({ hasVideos }),
  setFiles: (files) => set({ files }),
  reset: () => set({ payload: { files: [] } }),
}));
