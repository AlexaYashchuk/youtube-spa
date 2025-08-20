import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
  items: string[];
}

const loadFromLS = (): string[] => {
  try {
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToLS = (items: string[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
  } catch {}
};

const initialState: FavoriteState = {
  items: loadFromLS(),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const q = action.payload.trim();
      if (!q) return;
      if (!state.items.includes(q)) {
        state.items.push(q);
        saveToLS(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((x) => x !== action.payload);
      saveToLS(state.items);
    },
    editFavorite: (
      state,
      action: PayloadAction<{ oldQuery: string; newQuery: string }>
    ) => {
      const { oldQuery, newQuery } = action.payload;
      const idx = state.items.findIndex((x) => x === oldQuery);
      if (idx !== -1) {
        const val = newQuery.trim();
        if (!val) return;
        // не дублируем
        if (!state.items.includes(val)) {
          state.items[idx] = val;
        } else {
          // если уже есть новый — просто удалим старый
          state.items.splice(idx, 1);
        }
        saveToLS(state.items);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      saveToLS(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, editFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
