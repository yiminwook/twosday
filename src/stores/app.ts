import { create } from "zustand";

type State = {
  showMobileSidebar: boolean;
};

type Action = {
  setShowMobileSidebar: (show: boolean) => void;
};

type AppStore = State & { actions: Action };

export const useAppStore = create<AppStore>((set) => ({
  showMobileSidebar: false,
  actions: {
    setShowMobileSidebar: (show) => set({ showMobileSidebar: show }),
  },
}));
