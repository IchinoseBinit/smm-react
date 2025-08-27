import { create } from "zustand";
import type { Post } from "../../types";

interface EditPostStore {
  isCreatePostEdit: boolean;
  setIsCreatePostEdit: (value: boolean) => void;
  postData: Post | null;
  setPostData: (data: Post) => void;
  clearPostData: () => void;
}

export const useEditPostStore = create<EditPostStore>((set) => ({
  isCreatePostEdit: false,
  postData: null,
  setIsCreatePostEdit: (value) => set({ isCreatePostEdit: value }),
  setPostData: (data) => set({ postData: data }),
  clearPostData: () => set({ postData: null }),
}));
