import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { VideoItem } from "../../types/video";
import axios from "axios";

interface SearchState {
  history: any;
  query: string;
  videos: VideoItem[];
  historyByUser: Record<string, string[]>;
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

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const searchVideos = createAsyncThunk(
  "search/fetchVideos",
  async ({ query, maxResults }: { query: string; maxResults: number }) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults,
          q: query,
          key: API_KEY,
          type: "video",
        },
      }
    );

    return { videos: response.data.items as VideoItem[], query };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearHistory: (state, action: PayloadAction<{ userId: string }>) => {
      state.historyByUser[action.payload.userId] = [];
    },
    addToHistory: (
      state,
      action: PayloadAction<{ userId: string; query: string }>
    ) => {
      const { userId, query } = action.payload;

      if (!state.historyByUser[userId]) {
        state.historyByUser[userId] = [];
      }

      state.historyByUser[userId] = [
        query,
        ...state.historyByUser[userId].filter((q) => q !== query),
      ];
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
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { clearHistory, addToHistory } = searchSlice.actions;
export default searchSlice.reducer;
