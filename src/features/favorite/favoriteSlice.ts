import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
  favoritesByUser: Record<string, string[]>;
}

const loadFromLS = (userId: string): string[] => {
  const raw = localStorage.getItem(`favorites_${userId}`);
  return raw ? JSON.parse(raw) : [];
};

const saveToLS = (userId: string, items: string[]) => {
  localStorage.setItem(`favorites_${userId}`, JSON.stringify(items));
};

const normalizeQuery = (query: string): string | null => {
  const trimmed = query.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const ensureUserFavorites = (state: FavoriteState, userId: string) => {
  if (!state.favoritesByUser[userId]) {
    state.favoritesByUser[userId] = loadFromLS(userId);
  }
};

const initialState: FavoriteState = {
  favoritesByUser: {},
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<{ userId: string; query: string }>
    ) => {
      const { userId, query } = action.payload;

      const normalized = normalizeQuery(query);
      if (!normalized) return;

      ensureUserFavorites(state, userId);

      const favorites = state.favoritesByUser[userId];
      if (!favorites.includes(normalized)) {
        favorites.push(normalized);
        saveToLS(userId, favorites);
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<{ userId: string; query: string }>
    ) => {
      const { userId, query } = action.payload;

      ensureUserFavorites(state, userId);

      const favorites = state.favoritesByUser[userId].filter(
        (x) => x !== query
      );
      state.favoritesByUser[userId] = favorites;

      saveToLS(userId, favorites);
    },

    editFavorite: (
      state,
      action: PayloadAction<{
        userId: string;
        oldQuery: string;
        newQuery: string;
      }>
    ) => {
      const { userId, oldQuery, newQuery } = action.payload;

      const normalized = normalizeQuery(newQuery);
      if (!normalized) return;

      ensureUserFavorites(state, userId);

      const favorites = state.favoritesByUser[userId];
      const idx = favorites.findIndex((x) => x === oldQuery);

      if (idx !== -1) {
        if (oldQuery === normalized) {
          return;
        }

        if (!favorites.includes(normalized)) {
          favorites[idx] = normalized;
        } else {
          favorites.splice(idx, 1);
        }
        saveToLS(userId, favorites);
      }
    },

    clearFavorites: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.favoritesByUser[userId] = [];
      saveToLS(userId, []);
    },

    loadFavoritesForUser: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      const { userId } = action.payload;
      state.favoritesByUser[userId] = loadFromLS(userId);
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  editFavorite,
  clearFavorites,
  loadFavoritesForUser,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
