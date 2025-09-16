import { create } from "zustand";

type ContentType = string[];

interface ContentTypeState {
  surfaceType: ContentType;
  setSurfaceType: (type: ContentType) => void;
  resetSurfaceType: () => void;
  forceReset: () => void;
}

export const useContentTypeStore = create<ContentTypeState>((set) => ({
  surfaceType: ["POST"],
  setSurfaceType: (surfaceType) => set({ surfaceType }),
  resetSurfaceType: () => {
    // Multi-layered reset for production reliability
    set({ surfaceType: ["POST"] });
    
    setTimeout(() => {
      set({ surfaceType: ["POST"] });
    }, 0);
  },
  forceReset: () => {
    // Nuclear option for production environments
    set({ surfaceType: ["POST"] });
    
    // Multiple resets with different timing
    setTimeout(() => set({ surfaceType: ["POST"] }), 0);
    setTimeout(() => set({ surfaceType: ["POST"] }), 10);
    setTimeout(() => set({ surfaceType: ["POST"] }), 50);
  },
}));
