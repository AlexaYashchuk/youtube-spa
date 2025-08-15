import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
