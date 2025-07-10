// store/usePostModalStore.ts
import { create } from "zustand";

type Media = {
  s3_url: string;
  order: number;
};

type Post = {
  id: number;
  title: string;
  description: string;
  status: string;
  medias: Media[];
};

type PlatformData = {
  icon: React.ReactElement;
  platform: string;
  time: string;
  posts: Post[];
};

type PostModalState = {
  isOpen: boolean;
  selectedPlatform: PlatformData | null;
  openModal: (platform: PlatformData) => void;
  closeModal: () => void;
};

export const usePostModalStore = create<PostModalState>((set) => ({
  isOpen: false,
  selectedPlatform: null,
  openModal: (platform) => set({ selectedPlatform: platform, isOpen: true }),
  closeModal: () => set({ isOpen: false, selectedPlatform: null }),
}));
