import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
  favoritesByUser: Record<string, string[]>; // ключ - userId, значение - список избранного
}

// загрузка избранного конкретного пользователя
const loadFromLS = (userId: string): string[] => {
  try {
    const raw = localStorage.getItem(`favorites_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// сохранение избранного конкретного пользователя
const saveToLS = (userId: string, items: string[]) => {
  try {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(items));
  } catch {}
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
      action: PayloadAction<{ userId: string; query?: string }>
    ) => {
      const { userId, query } = action.payload;

      if (!query) return; // если query пустой или undefined, выходим

      const q = query.trim();
      if (!q) return;

      if (!state.favoritesByUser[userId]) {
        state.favoritesByUser[userId] = loadFromLS(userId);
      }

      if (!state.favoritesByUser[userId].includes(q)) {
        state.favoritesByUser[userId].push(q);
        saveToLS(userId, state.favoritesByUser[userId]);
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<{ userId: string; query: string }>
    ) => {
      const { userId, query } = action.payload;

      if (!state.favoritesByUser[userId]) {
        state.favoritesByUser[userId] = loadFromLS(userId);
      }

      state.favoritesByUser[userId] = state.favoritesByUser[userId].filter(
        (x) => x !== query
      );
      saveToLS(userId, state.favoritesByUser[userId]);
    },

    editFavorite: (
      state,
      action: PayloadAction<{
        userId: string;
        oldQuery: string;
        newQuery?: string;
      }>
    ) => {
      const { userId, oldQuery, newQuery } = action.payload;

      if (!newQuery) return;
      const val = newQuery.trim();
      if (!val) return;

      if (!state.favoritesByUser[userId]) {
        state.favoritesByUser[userId] = loadFromLS(userId);
      }

      const idx = state.favoritesByUser[userId].findIndex(
        (x) => x === oldQuery
      );
      if (idx !== -1) {
        if (!state.favoritesByUser[userId].includes(val)) {
          state.favoritesByUser[userId][idx] = val;
        } else {
          state.favoritesByUser[userId].splice(idx, 1);
        }
        saveToLS(userId, state.favoritesByUser[userId]);
      }
    },

    clearFavorites: (state, action: PayloadAction<{ userId: string }>) => {
      state.favoritesByUser[action.payload.userId] = [];
      saveToLS(action.payload.userId, []);
    },

    // загрузка избранного при входе в аккаунт
    loadFavoritesForUser: (
      state,
      action: PayloadAction<{ userId: string }>
    ) => {
      state.favoritesByUser[action.payload.userId] = loadFromLS(
        action.payload.userId
      );
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
