import { create } from "zustand";

type ContentType = string[];

interface ContentTypeState {
  type: ContentType;
  setType: (type: ContentType) => void;
  resetType: () => void;
}

export const useContentTypeStore = create<ContentTypeState>((set) => ({
  type: ["POST"],
  setType: (type) => set({ type }),
  resetType: () => set({ type: ["POST"] }),
}));
