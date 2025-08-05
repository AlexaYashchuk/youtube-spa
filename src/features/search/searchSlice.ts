import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVideosByKeyword } from "./searchAPI";
import type { VideoItem } from "../../types/video";

interface SearchState {
  query: string;
  videos: VideoItem[];
  history: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  videos: [],
  history: [],
  loading: false,
  error: null,
};

export const searchVideos = createAsyncThunk(
  "search/fetchVideos",
  async (query: string) => {
    const response = await fetchVideosByKeyword(query);
    return { videos: response, query };
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.history = [];
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
        if (!state.history.includes(action.payload.query)) {
          state.history.push(action.payload.query);
        }
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { clearHistory } = searchSlice.actions;
export default searchSlice.reducer;
