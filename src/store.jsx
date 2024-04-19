import { create } from "zustand";

export const useStore = create((set) => ({
  gravity: 90,
  setGravity: (gravity) => set({ gravity }),
}));