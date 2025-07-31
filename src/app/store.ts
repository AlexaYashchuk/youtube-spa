import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import { registerUser } from "../features/registration/registrationSlice";
import { loginUser } from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    registration: registerUser,
    login: loginUser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
