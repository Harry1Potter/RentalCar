import { create } from "zustand";

interface CarsState {
  favorites: string[];

  toggleFavorite: (id: string) => void;
  loadFavorites: () => void;
}

export const useCarsStore = create<CarsState>((set) => ({
  favorites: [],

  toggleFavorite: (id) =>
    set((state) => {
      const exists = state.favorites.includes(id);

      const updated = exists
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));

      return { favorites: updated };
    }),

  loadFavorites: () => {
    const saved = localStorage.getItem("favorites");

    if (saved) {
      set({ favorites: JSON.parse(saved) });
    }
  },
}));