export interface VideoItem {
  id: {
    videoId: string;
  };
  snippet: {
    id: string;
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}
