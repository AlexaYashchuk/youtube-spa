import axios from "axios";
import type { VideoItem } from "../../types/video";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// if (!API_KEY) {
//   throw new Error("YouTube API key is not defined in .env");
// }
console.log("API KEY:", import.meta.env.VITE_YOUTUBE_API_KEY);

export async function fetchVideosByKeyword(
  query: string,
  maxResults = 12
): Promise<VideoItem[]> {
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

  return response.data.items;
}
