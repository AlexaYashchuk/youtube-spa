import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  queries: string[];
}

// Функция для загрузки из localStorage
const loadFromLocalStorage = (): string[] => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Функция для сохранения в localStorage
const saveToLocalStorage = (queries: string[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(queries));
  } catch {
    // Игнорируем ошибки
  }
};

const initialState: FavoriteState = {
  queries: loadFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.queries.includes(action.payload)) {
        state.queries.push(action.payload);
        saveToLocalStorage(state.queries);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.queries = state.queries.filter((q) => q !== action.payload);
      saveToLocalStorage(state.queries);
    },
    clearFavorites: (state) => {
      state.queries = [];
      saveToLocalStorage(state.queries);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
