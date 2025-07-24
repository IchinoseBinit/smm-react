import { create } from "zustand";

type ContentType = string[];

interface ContentTypeState {
  surfaceType: ContentType;
  setSurfaceType: (type: ContentType) => void;
  resetSurfaceType: () => void;
}

export const useContentTypeStore = create<ContentTypeState>((set) => ({
  surfaceType: ["POST"],
  setSurfaceType: (surfaceType) => set({ surfaceType }),
  resetSurfaceType: () => set({ surfaceType: ["POST"] }),
}));
