import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
}

interface SidebarActions {
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

const useSidebarStore = create<SidebarState & SidebarActions>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

export { useSidebarStore };
