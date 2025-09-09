import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchVideosByKeyword } from "./searchAPI";
import type { VideoItem } from "../../types/video";

interface SearchState {
  history: any;
  query: string;
  videos: VideoItem[];
  historyByUser: Record<string, string[]>; // ключ - userId (например email)
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  videos: [],
  historyByUser: {},
  loading: false,
  error: null,
  history: undefined,
};

export const searchVideos = createAsyncThunk(
  "search/fetchVideos",
  async ({ query, maxResults }: { query: string; maxResults: number }) => {
    const response = await fetchVideosByKeyword(query, maxResults);
    return { videos: response, query };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // очистка истории конкретного пользователя
    clearHistory: (state, action: PayloadAction<{ userId: string }>) => {
      state.historyByUser[action.payload.userId] = [];
    },

    // добавляем поисковый запрос в историю конкретного пользователя
    addToHistory: (
      state,
      action: PayloadAction<{ userId: string; query: string }>
    ) => {
      const { userId, query } = action.payload;

      if (!state.historyByUser[userId]) {
        state.historyByUser[userId] = [];
      }

      // исключаем дубликаты и добавляем новый запрос в начало
      state.historyByUser[userId] = [
        query,
        ...state.historyByUser[userId].filter((q) => q !== query),
      ];

      // ограничим историю, например, до 10 записей
      if (state.historyByUser[userId].length > 10) {
        state.historyByUser[userId] = state.historyByUser[userId].slice(0, 10);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.query = action.payload.query;
        // ⚠️ здесь историю НЕ добавляем, потому что теперь делаем это через addToHistory
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { clearHistory, addToHistory } = searchSlice.actions;
export default searchSlice.reducer;
