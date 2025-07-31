import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import registrationReducer from "../features/registration/registrationSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    registration: registrationReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
