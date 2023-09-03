import { create } from "zustand";

interface useSearchModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchModal = create<useSearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
