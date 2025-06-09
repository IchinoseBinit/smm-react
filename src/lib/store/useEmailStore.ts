import { create } from "zustand";

type EmailState = {
  email: string;
  setEmail: (email: string) => void;
};

const useEmailStore = create<EmailState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));

export default useEmailStore;
