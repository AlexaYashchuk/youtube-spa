import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Типы
interface UserData {
  username: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  username: string;
  email: string;
  // добавь другие поля, если есть
}

interface RegistrationState {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}

// AsyncThunk
export const registerUser = createAsyncThunk<
  UserResponse, // возвращаемые данные
  UserData, // входные данные
  { rejectValue: { message: string } } // тип ошибки
>("registration/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<UserResponse>(
      "https://todo-redev.herokuapp.com/api/users/register",
      userData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const initialState: RegistrationState = {
  user: null,
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        alert("Вы успешно зарегистрированы! Ваш id = " + action.payload.id);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ??
          action.error.message ??
          "Неизвестная ошибка";
        alert(state.error);
      });
  },
});

export default registrationSlice.reducer;
