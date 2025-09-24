import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  email: string;
}

interface LoginState {
  user: { email: string } | null;
  isLoading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: { message: string } }
>("login/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      `https://todo-redev.herokuapp.com/api/auth/login`,
      userData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", response.data.token);

    return { email: userData.email, token: response.data.token };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data ?? { message: "Ошибка авторизации" }
    );
  }
});

const initialState: LoginState = {
  isLoading: false,
  error: null,
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { email: action.payload.email };
        //alert(`Вход выполнен`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ??
          action.error.message ??
          "Ошибка авторизации";
        //alert(state.error);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
