// file: lib/store/scheduleStore.ts
import { create } from "zustand";

type ScheduleState = {
  isScheduled: boolean;
  setIsScheduled: (val: boolean) => void;
  reset: () => void;
};

export const useScheduleStore = create<ScheduleState>((set) => ({
  isScheduled: false,
  setIsScheduled: (val) => set({ isScheduled: val }),
  reset: () => set({ isScheduled: false }),
}));
