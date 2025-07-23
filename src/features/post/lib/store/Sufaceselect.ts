import { create } from "zustand";

type ContentType = string[];

interface ContentTypeState {
  type: ContentType;
  setType: (type: ContentType) => void;
}

export const useContentTypeStore = create<ContentTypeState>((set) => ({
  type: ["POST"], // default
  setType: (type) => set({ type }),
}));
