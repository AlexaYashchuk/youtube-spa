import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import loginReducer from "../features/login/loginSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
